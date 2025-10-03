import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import signupImage from "../assets/loginphoto.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/signup", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);

        alert("Signup successful!");
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please check your backend.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.left}>
          <img src={signupImage} alt="CareSense Signup" style={styles.image} />
        </div>
        <div style={styles.right}>
          <h3 style={styles.rightTitle}>Create Your Account</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSignup} style={styles.loginButton}>
            Sign Up
          </button>
          <p style={styles.footerText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.registerLink}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    background: "linear-gradient(135deg, rgb(1,1,1), rgb(19,20,19))",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    display: "flex",
    width: "850px",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    backgroundColor: "#fff",
  },
  left: { flex: 1, background: "#f0fdf4", display: "flex", justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  right: { flex: 1, padding: "3rem", background: "#121212", display: "flex", flexDirection: "column", justifyContent: "center", color: "#fff" },
  rightTitle: { fontSize: "20px", marginBottom: "1.5rem", color: "#22c55e" },
  input: { width: "100%", padding: "12px", marginBottom: "1rem", borderRadius: "8px", border: "1px solid #444", backgroundColor: "#1e1e1e", color: "#fff" },
  loginButton: { width: "100%", padding: "12px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "16px", marginBottom: "1rem" },
  footerText: { fontSize: "14px", color: "#bbb" },
  registerLink: { color: "#22c55e", fontWeight: "bold", textDecoration: "none" },
};

export default Signup;
