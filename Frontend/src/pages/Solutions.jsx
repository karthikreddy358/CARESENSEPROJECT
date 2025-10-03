// src/pages/Solutions.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // ✅ Works after installing react-icons

const solutions = {
  Pneumonia: {
    solution: "Rest, drink plenty of fluids, take prescribed antibiotics, seek medical help if severe.",
    category: "🫁 Respiratory",
    color: "bg-blue-100 text-blue-700",
  },
  Asthma: {
    solution: "Use inhalers as prescribed, avoid triggers like dust/smoke, practice breathing exercises.",
    category: "🫁 Respiratory",
    color: "bg-blue-100 text-blue-700",
  },
  Allergy: {
    solution: "Identify and avoid allergens, use antihistamines, keep surroundings clean.",
    category: "🌱 Immune",
    color: "bg-green-100 text-green-700",
  },
  Migraine: {
    solution: "Rest in a quiet dark room, stay hydrated, use prescribed medications if frequent.",
    category: "🧠 Neurological",
    color: "bg-purple-100 text-purple-700",
  },
  Flu: {
    solution: "Stay hydrated, get plenty of rest, use over-the-counter meds for fever and aches.",
    category: "🫁 Respiratory",
    color: "bg-blue-100 text-blue-700",
  },
  "Heart Issue": {
    solution: "Maintain a balanced diet, avoid stress, regular checkups, follow doctor’s advice.",
    category: "❤️ Cardiac",
    color: "bg-red-100 text-red-700",
  },
  Diabetes: {
    solution: "Maintain a low-sugar diet, exercise regularly, monitor blood glucose, take insulin if prescribed.",
    category: "🩸 Metabolic",
    color: "bg-yellow-100 text-yellow-700",
  },
  Hypertension: {
    solution: "Reduce salt intake, exercise, avoid stress, take prescribed medicines.",
    category: "❤️ Cardiac",
    color: "bg-red-100 text-red-700",
  },
  Osteoporosis: {
    solution: "Ensure calcium & vitamin D intake, weight-bearing exercise, avoid smoking/alcohol.",
    category: "🦴 Bone",
    color: "bg-orange-100 text-orange-700",
  },
  Arthritis: {
    solution: "Exercise regularly, use anti-inflammatory medicines, maintain healthy weight.",
    category: "🦴 Bone",
    color: "bg-orange-100 text-orange-700",
  },
  "Kidney Disease": {
    solution: "Stay hydrated, reduce salt, follow a kidney-friendly diet, consult nephrologist.",
    category: "💧 Renal",
    color: "bg-teal-100 text-teal-700",
  },
  "Liver Disease": {
    solution: "Avoid alcohol, eat a balanced diet, take prescribed medicines, regular monitoring.",
    category: "🟤 Digestive",
    color: "bg-brown-100 text-brown-700",
  },
  "Thyroid Disorders": {
    solution: "Take thyroid medications as prescribed, balanced diet, regular checkups.",
    category: "🦋 Hormonal",
    color: "bg-pink-100 text-pink-700",
  },
  Cancer: {
    solution: "Follow treatment plan, eat nutritious food, stay active as advised, emotional support.",
    category: "🧬 Oncology",
    color: "bg-gray-100 text-gray-700",
  },
};

const Solutions = () => {
  const [search, setSearch] = useState("");

  const filteredSolutions = Object.entries(solutions).filter(([disease]) =>
    disease.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-6">
        🩺 Precautions & Solutions
      </h1>

      {/* 🔍 Search bar */}
      <div className="relative mb-6">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search by disease..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Solutions List */}
      <div className="grid gap-4">
        {filteredSolutions.map(([disease, { solution, category, color }]) => (
          <div
            key={disease}
            className="bg-gradient-to-r from-green-50 to-green-100 shadow-md rounded-lg p-5 border border-green-200 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-green-700">{disease}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
                {category}
              </span>
            </div>
            <p className="text-gray-700 mt-2">{solution}</p>
          </div>
        ))}

        {filteredSolutions.length === 0 && (
          <p className="text-gray-500 text-center">No matching results</p>
        )}
      </div>
    </div>
  );
};

export default Solutions;
