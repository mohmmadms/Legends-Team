"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-[#D97706]">
          Jordan Adventures
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-[#065F46] hover:text-[#D97706]">
            Home
          </Link>
          <Link href="/tours" className="text-[#065F46] hover:text-[#D97706]">
            Tours
          </Link>
          <Link
            href="/contact"
            className="text-[#065F46] hover:text-[#D97706]"
          >
            Contact
          </Link>
          <Link
            href="/bookings"
            className="text-[#065F46] hover:text-[#D97706]"
          >
            Booking
          </Link>
          <Link
            href="/admin"
            className="bg-[#D97706] hover:bg-[#b66205] text-white px-4 py-2 rounded-lg"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#065F46] focus:outline-none"
          >
            {isOpen ? "✖️" : "☰"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-4">
          <Link
            href="/"
            className="block text-[#065F46] hover:text-[#D97706]"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/tours"
            className="block text-[#065F46] hover:text-[#D97706]"
            onClick={() => setIsOpen(false)}
          >
            Tours
          </Link>
          <Link
            href="/contact"
            className="block text-[#065F46] hover:text-[#D97706]"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/bookings"
            className="block text-[#065F46] hover:text-[#D97706]"
            onClick={() => setIsOpen(false)}
          >
            Booking
          </Link>
          <Link
            href="/admin"
            className="block bg-[#D97706] hover:bg-[#b66205] text-white px-4 py-2 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
}
