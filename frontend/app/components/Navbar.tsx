"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-gray-900 text-white px-6 py-4 flex gap-6 shadow">
      <Link href="/" className="hover:text-blue-400">Home</Link>
      <Link href="/colleges" className="hover:text-blue-400">Colleges</Link>
      <Link href="/compare" className="hover:text-blue-400">Compare</Link>
      <Link href="/login" className="hover:text-blue-400">Login</Link>
      <Link href="/predict">Predict</Link>
      <Link href="/qa">Q&A</Link>
    </div>
  );
}