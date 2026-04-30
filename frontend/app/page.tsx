import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          🎓 Find Your Perfect College
        </h1>

        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
          Discover top colleges, compare them, and make smarter decisions for your future.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/colleges"
            className="bg-blue-600 px-6 py-3 rounded-lg text-white hover:bg-blue-700 transition"
          >
            Explore Colleges
          </Link>

          <Link
            href="/compare"
            className="border border-gray-500 px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            Compare Colleges
          </Link>
        </div>
      </div>

      {/* TOP COLLEGES SECTION */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          ⭐ Top Colleges
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CARD */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:scale-105 transition shadow-lg">
            <h3 className="text-xl font-semibold mb-2">IIT Bombay</h3>
            <p className="text-gray-400">Mumbai</p>
            <p className="text-yellow-400 mt-2">⭐ 4.9</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:scale-105 transition shadow-lg">
            <h3 className="text-xl font-semibold mb-2">IIT Madras</h3>
            <p className="text-gray-400">Chennai</p>
            <p className="text-yellow-400 mt-2">⭐ 4.8</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:scale-105 transition shadow-lg">
            <h3 className="text-xl font-semibold mb-2">IIT Delhi</h3>
            <p className="text-gray-400">Delhi</p>
            <p className="text-yellow-400 mt-2">⭐ 4.7</p>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/colleges"
            className="bg-blue-600 px-8 py-3 rounded-lg text-white hover:bg-blue-700 transition"
          >
            View All Colleges →
          </Link>
        </div>
      </div>

    </div>
  );
}