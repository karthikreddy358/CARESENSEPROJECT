// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Bell, LogOut, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const diseaseDescriptions = {
  Pneumonia: "Lung infection causing cough, fever, and breathing difficulty.",
  Asthma: "Condition where airways narrow and swell, causing shortness of breath.",
  Allergy: "Immune reaction to substances like pollen, food, or dust.",
  Migraine: "Severe headache often with nausea, dizziness, and sensitivity to light.",
  Flu: "Common cold or flu, characterized by fever, cough, and body aches.",
  "Heart Issue": "Problems related to the heart that may cause chest pain or fatigue.",
  "Diabetes": "A chronic condition where the body does not produce enough insulin or use it properly.",
  "Hypertension": "A condition where the blood pressure is consistently high, putting strain on the heart and blood vessels.",
  "Osteoporosis": "A condition where the bones become weak and more susceptible to fractures.",
  "Arthritis": "A condition where the joints become inflamed and painful, often causing stiffness and limited movement.",
  "Kidney Disease": "A condition where the kidneys are unable to filter waste products from the blood, leading to buildups that can be harmful.",
  "Liver Disease": "A condition where the liver is unable to function properly, leading to buildups that can be harmful.",
  "Thyroid Disorders": "A condition where the thyroid gland is unable to produce enough hormones, leading to a variety of symptoms.",
  "Cancer": "A condition where abnormal cells grow uncontrollably, potentially spreading to other parts of the body.",
};

const Dashboard = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Updated: "weight_loss" removed
  const symptomOptions = [
    "fever",
    "cough",
    "headache",
    "fatigue",
    "chest_pain",
    "nausea",
    "shortness_of_breath",
    "dizziness",
    "sore_throat"
  ];

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || "User";

  const fetchHistory = async () => {
    if (!userId) return;
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/predict?userId=${userId}`
      );
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const toggleSymptom = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!age || !gender || symptoms.length === 0) {
      setError("Please fill all fields and select at least one symptom.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: parseInt(age),
          gender: gender,
          symptoms: symptoms.map((s) => s.toLowerCase()),
          userId: userId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Prediction failed");
        return;
      }

      setPrediction(data.disease || "No prediction available");
      fetchHistory();

      setAge("");
      setGender("");
      setSymptoms([]);
    } catch (err) {
      console.error("Error submitting symptoms:", err);
      setError("Failed to connect to server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
  {/* Sidebar */}
  <aside className="w-64 bg-white shadow-md flex flex-col">
    <div className="p-6 text-2xl font-bold text-green-600">CareSense</div>
    <nav className="flex-1 px-4 space-y-2">
      {[
        { name: "Dashboard"},
        { name: "Symptom Checker"},
        { name: "Prediction Results" },
        { name: "Health Records"},
        { name: "Solutions", path: "/solutions" }, // ✅ new
      ].map((item) => (
        <a
          key={item.name}
          href={item.path}
          className="block p-2 rounded hover:bg-green-100"
        >
          {item.name}
        </a>
      ))}
    </nav>
  </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h1 className="text-xl font-semibold">
            Hello, <span className="text-green-600">{userName}</span> 👋
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Symptom Input */}
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">🩺 Symptom Input</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your age"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-1 w-full border rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Symptoms</label>
                <div className="grid grid-cols-2 gap-2">
                  {symptomOptions.map((symptom) => (
                    <label key={symptom} className="flex items-center space-x-2 capitalize">
                      <input
                        type="checkbox"
                        checked={symptoms.includes(symptom)}
                        onChange={() => toggleSymptom(symptom)}
                        className="rounded text-green-600 focus:ring-green-500"
                      />
                      <span>{symptom.replace("_", " ")}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                {loading ? "Predicting..." : "Submit Symptoms"}
              </button>
            </form>
          </section>

          {/* Prediction */}
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-2">🤖 Prediction Results</h2>
            {error && <p className="text-red-600 font-medium mb-2">{error}</p>}
            {prediction ? (
              <div>
                <p className="text-gray-800 font-medium">
                  Predicted Disease:{" "}
                  <span className="text-green-600">{prediction}</span>
                </p>
                {diseaseDescriptions[prediction] && (
                  <p className="text-gray-600 mt-1">{diseaseDescriptions[prediction]}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-600">
                Results will appear here after submitting symptoms.
              </p>
            )}
          </section>

          {/* History */}
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">📜 History / Records</h2>
            {history.length === 0 ? (
              <p className="text-gray-500">No records yet.</p>
            ) : (
              <ul className="space-y-3">
                {history.map((record) => (
                  <li key={record._id} className="border rounded-lg p-3 bg-gray-50">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(record.date).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Age:</span> {record.age},{" "}
                      <span className="font-semibold">Gender:</span> {record.gender}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Symptoms:</span>{" "}
                      {record.symptoms.map((s) => s.replace("_", " ")).join(", ")}
                    </p>
                    {record.disease && (
                      <p className="text-sm text-green-600 font-medium">
                        Predicted Disease: {record.disease}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
