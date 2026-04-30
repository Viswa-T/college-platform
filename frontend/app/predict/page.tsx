"use client";

import { useState } from "react";

export default function Predictor() {
  const [rank, setRank] = useState("");
  const [exam, setExam] = useState("JEE");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const predict = async () => {
    setLoading(true);

    const res = await fetch(
  `https://college-platform-j7qn.onrender.com/predict?rank=${rank}&exam=${exam}`
);

    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-10">

      <h1 className="text-4xl font-bold mb-6">🧠 College Predictor</h1>

      <p className="text-gray-400 mb-6">
        Select exam and enter your rank to get suitable colleges.
      </p>

      {/* INPUTS */}
      <div className="flex flex-wrap gap-4 mb-8">

        {/* EXAM SELECT */}
        <select
          value={exam}
          onChange={(e) => setExam(e.target.value)}
          className="p-3 bg-gray-800 border border-gray-600 rounded"
        >
          <option value="JEE">JEE</option>
          <option value="GENERAL">General</option>
        </select>

        {/* RANK INPUT */}
        <input
          type="number"
          placeholder="Enter rank"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="p-3 bg-gray-800 border border-gray-600 rounded"
        />

        {/* BUTTON */}
        <button
          onClick={predict}
          className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700"
        >
          Predict
        </button>
      </div>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* NO RESULT */}
      {!loading && results.length === 0 && (
        <p className="text-gray-400">No colleges found for this rank.</p>
      )}

      {/* RESULTS */}
      <div className="grid md:grid-cols-3 gap-6">
        {results.map((c) => (
          <div
            key={c.id}
            className="bg-gray-900 p-5 rounded-xl border border-gray-700 shadow"
          >
            <h2 className="text-xl font-semibold">{c.name}</h2>
            <p className="text-gray-400">📍 {c.location}</p>
            <p className="text-yellow-400">💰 ₹{c.fees}</p>
            <p className="text-green-400">⭐ {c.rating}</p>
            <p className="text-blue-400">📊 {c.placement}% placement</p>
          </div>
        ))}
      </div>

    </div>
  );
}
