"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CollegesPage() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://college-platform-j7qn.onrender.com/colleges?search=${search}&location=${location}&maxFees=${maxFees}`
    )
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, location, maxFees]);

  return (
    <div className="p-10 bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white">

      <h1 className="text-4xl font-bold mb-6">Explore Colleges</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-600"
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-3 rounded-lg bg-gray-800 border border-gray-600"
        >
          <option value="">All Locations</option>
          <option value="Chennai">Chennai</option>
          <option value="Trichy">Trichy</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Pilani">Pilani</option>
        </select>

        <input
          type="number"
          placeholder="Max Fees"
          value={maxFees}
          onChange={(e) => setMaxFees(e.target.value)}
          className="p-3 rounded-lg bg-gray-800 border border-gray-600"
        />
      </div>

      {loading && <p className="text-gray-400">Loading colleges...</p>}

      {!loading && colleges.length === 0 && (
        <p className="text-gray-400">No colleges found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <Link href={`/colleges/${college.id}`} key={college.id}>
            <div className="bg-gray-900 p-5 rounded-xl border border-gray-700 hover:scale-105 transition cursor-pointer shadow-lg">

              <h2 className="text-xl font-semibold mb-2">
                {college.name}
              </h2>

              <p className="text-gray-400">📍 {college.location}</p>
              <p className="text-yellow-400">💰 ₹{college.fees}</p>
              <p className="text-green-400">⭐ {college.rating}</p>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
