"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/colleges/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCollege(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="p-10 text-gray-400">Loading college details...</p>;
  }

  if (!college) {
    return <p className="p-10 text-red-400">College not found</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{college.name}</h1>
        <p className="text-gray-400 mt-2">📍 {college.location}</p>
      </div>

      {/* OVERVIEW CARD */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
          <p className="text-gray-400">Fees</p>
          <h2 className="text-2xl text-yellow-400 font-semibold">
            ₹{college.fees}
          </h2>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
          <p className="text-gray-400">Rating</p>
          <h2 className="text-2xl text-green-400 font-semibold">
            ⭐ {college.rating}
          </h2>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
          <p className="text-gray-400">Placement</p>
          <h2 className="text-2xl text-blue-400 font-semibold">
            {college.placement || "N/A"}%
          </h2>
        </div>

      </div>

      {/* COURSES SECTION */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Courses Offered</h2>

        {college.courses && college.courses.length > 0 ? (
          <ul className="grid md:grid-cols-2 gap-2">
            {college.courses.map((c: string) => (
              <li key={c} className="bg-gray-800 px-3 py-2 rounded">
                {c}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No course data available</p>
        )}
      </div>

      {/* PLACEMENTS SECTION */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Placements</h2>

        <p className="text-gray-300">
          {college.placement
            ? `${college.placement}% students placed successfully.`
            : "Placement data not available."}
        </p>
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={async () => {
          await fetch("http://localhost:5000/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ collegeId: college.id }),
          });

          alert("College saved!");
        }}
        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
      >
        Save College
      </button>

    </div>
  );
}