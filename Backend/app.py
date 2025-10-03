from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import os
import joblib

app = Flask(__name__)
CORS(app)

# -------------------
# Database connection
# -------------------
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client.caresense
collection = db.predictions
users_collection = db.users

# -------------------
# Load ML Model + Encoders
# -------------------
MODEL_DIR = os.path.join(os.path.dirname(__file__), "..", "ML_service", "models")
model_path = os.path.join(MODEL_DIR, "disease_model.pkl")
gender_path = os.path.join(MODEL_DIR, "le_gender.pkl")
disease_path = os.path.join(MODEL_DIR, "le_disease.pkl")

model, le_gender, le_disease = None, None, None
try:
    model = joblib.load(model_path)
    le_gender = joblib.load(gender_path)
    le_disease = joblib.load(disease_path)
    print("✅ ML Model and encoders loaded successfully")
except Exception as e:
    print(f"⚠️ ML Model not found. Prediction will fallback. Error: {e}")
    model = None

# -------------------
# Symptom List (❌ removed "weight_loss")
# -------------------
ALL_SYMPTOMS = [
    "fever",
    "cough",
    "headache",
    "fatigue",
    "chest_pain",
    "nausea",
    "shortness_of_breath",
    "dizziness",
    "sore_throat"
]

# -------------------
# Signup Route
# -------------------
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"success": False, "message": "All fields are required"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"success": False, "message": "User already exists"}), 409

    hashed_pw = generate_password_hash(password)
    new_user = {"name": name, "email": email, "password": hashed_pw}
    result = users_collection.insert_one(new_user)

    return jsonify({
        "success": True,
        "message": "Signup successful",
        "user": {
            "_id": str(result.inserted_id),
            "name": name,
            "email": email
        },
        "token": "dummy-token"
    }), 201

# -------------------
# Login Route
# -------------------
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password required"}), 400

    user = users_collection.find_one({"email": email})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

    return jsonify({
        "success": True,
        "message": "Login successful",
        "user": {
            "_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        },
        "token": "dummy-token"
    }), 200

# -------------------
# Prediction Route (POST)
# -------------------
@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        age = data.get("age")
        gender = data.get("gender")
        symptoms = data.get("symptoms", [])
        user_id = data.get("userId")

        if age is None or not gender or not isinstance(symptoms, list):
            return jsonify({"success": False, "message": "Missing or invalid input fields"}), 400

        if model is None:
            disease = "Prediction unavailable (model missing)"
        else:
            try:
                # ✅ Normalize gender safely
                gender_input = gender.strip().capitalize()
                if gender_input.startswith("M"):
                    gender_input = "Male"
                elif gender_input.startswith("F"):
                    gender_input = "Female"

                gender_encoded = le_gender.transform([gender_input])[0]

                # ✅ Normalize symptoms (case-insensitive)
                input_symptoms = [s.lower().strip() for s in symptoms]
                symptom_vector = [1 if sym.lower() in input_symptoms else 0 for sym in ALL_SYMPTOMS]

                # Final input features
                input_features = [[age, gender_encoded] + symptom_vector]

                # Predict disease
                pred_encoded = model.predict(input_features)[0]
                disease = le_disease.inverse_transform([pred_encoded])[0]

            except Exception as e:
                disease = f"Prediction failed: {str(e)}"

        # Save to MongoDB
        record = {
            "age": age,
            "gender": gender,
            "symptoms": symptoms,
            "disease": disease,
            "userId": user_id,
            "date": datetime.utcnow()
        }
        collection.insert_one(record)

        return jsonify({"success": True, "disease": disease})
    except Exception as e:
        print(f"❌ Prediction error: {e}")
        return jsonify({"success": False, "message": f"Server error: {str(e)}"}), 500

# -------------------
# Get Predictions (GET user-specific)
# -------------------
@app.route("/api/predict", methods=["GET"])
def get_predictions():
    user_id = request.args.get("userId")
    records = list(collection.find({"userId": user_id}))
    for r in records:
        r["_id"] = str(r["_id"])
    return jsonify(records)

if __name__ == "__main__":
    import logging
    # Suppress Flask/werkzeug socket warnings
    log = logging.getLogger('werkzeug')
    log.setLevel(logging.ERROR)

    app.run(port=5000, debug=True, threaded=True)
