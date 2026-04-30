"use client";

import { useEffect, useState } from "react";

export default function ComparePage() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [selectedColleges, setSelectedColleges] = useState<any[]>([]);
  const [features, setFeatures] = useState({
    fees: true,
    rating: true,
    location: true,
    placement: true,
  });

  useEffect(() => {
  fetch("https://college-platform-j7qn.onrender.com/colleges")
    .then((res) => res.json())
    .then(setColleges);
}, []);

  const toggleCollege = (college: any) => {
    setSelectedColleges((prev) =>
      prev.find((c) => c.id === college.id)
        ? prev.filter((c) => c.id !== college.id)
        : [...prev, college].slice(0, 3)
    );
  };

  const toggleFeature = (key: string) => {
    setFeatures((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 🧠 Find best values (for highlight)
  const bestRating = Math.max(...selectedColleges.map(c => c.rating || 0), 0);
  const bestPlacement = Math.max(...selectedColleges.map(c => c.placement || 0), 0);
  const lowestFees = Math.min(...selectedColleges.map(c => c.fees || Infinity), Infinity);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-10">

      <h1 className="text-4xl font-bold mb-8">⚖️ Compare Colleges</h1>

      {/* SELECT COLLEGES */}
      <div className="mb-10">
        <h2 className="text-xl mb-4">Select up to 3 Colleges</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {colleges.map((c) => {
            const selected = selectedColleges.find(sc => sc.id === c.id);

            return (
              <div
                key={c.id}
                onClick={() => toggleCollege(c)}
                className={`p-4 rounded-xl cursor-pointer border transition
                ${selected ? "bg-blue-600 border-blue-400" : "bg-gray-900 border-gray-700 hover:bg-gray-800"}`}
              >
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm text-gray-400">{c.location}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FEATURES */}
      <div className="mb-10">
        <h2 className="text-xl mb-4">Select Features</h2>

        <div className="flex flex-wrap gap-6">
          {["fees", "rating", "location", "placement"].map((f) => (
            <label key={f} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={(features as any)[f]}
                onChange={() => toggleFeature(f)}
              />
              <span className="capitalize">{f}</span>
            </label>
          ))}
        </div>
      </div>

      {/* EMPTY STATE */}
      {selectedColleges.length === 0 && (
        <p className="text-gray-400">Select colleges to compare</p>
      )}

      {/* TABLE */}
      {selectedColleges.length > 0 && (
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr>
                <th className="p-3 border-b border-gray-700">Feature</th>
                {selectedColleges.map((c) => (
                  <th key={c.id} className="p-3 border-b border-gray-700">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>

              {features.fees && (
                <tr>
                  <td className="p-3 border-b border-gray-700">Fees</td>
                  {selectedColleges.map((c) => (
                    <td
                      key={c.id}
                      className={`p-3 border-b border-gray-700 ${
                        c.fees === lowestFees ? "text-green-400 font-bold" : ""
                      }`}
                    >
                      ₹{c.fees}
                    </td>
                  ))}
                </tr>
              )}

              {features.rating && (
                <tr>
                  <td className="p-3 border-b border-gray-700">Rating</td>
                  {selectedColleges.map((c) => (
                    <td
                      key={c.id}
                      className={`p-3 border-b border-gray-700 ${
                        c.rating === bestRating ? "text-yellow-400 font-bold" : ""
                      }`}
                    >
                      ⭐ {c.rating}
                    </td>
                  ))}
                </tr>
              )}

              {features.placement && (
                <tr>
                  <td className="p-3 border-b border-gray-700">Placement %</td>
                  {selectedColleges.map((c) => (
                    <td
                      key={c.id}
                      className={`p-3 border-b border-gray-700 ${
                        c.placement === bestPlacement ? "text-blue-400 font-bold" : ""
                      }`}
                    >
                      {c.placement || "N/A"}%
                    </td>
                  ))}
                </tr>
              )}

              {features.location && (
                <tr>
                  <td className="p-3 border-b border-gray-700">Location</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id} className="p-3 border-b border-gray-700">
                      {c.location}
                    </td>
                  ))}
                </tr>
              )}

            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
