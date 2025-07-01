"use client";

import { useState } from "react";
import { sendBooking } from "../lib/api";

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tour: "",
    startDate: "",
    guests: 1,
    notes: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await sendBooking(form);
      setStatus("Booking sent successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        tour: "",
        startDate: "",
        guests: 1,
        notes: "",
      });
    } catch (err) {
      setStatus("Failed to send booking.");
    }
  };

  return (
    <div className="bg-[#FDF6E3] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-[#065F46] mb-4 text-center">
          Book Your Adventure
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-[#065F46] font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#065F46] font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[#065F46] font-semibold mb-1">
                Phone Number
              </label>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+962 79 ..."
                className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
              />
            </div>

            {/* Tour */}
            <div>
              <label className="block text-[#065F46] font-semibold mb-1">
                Tour Name
              </label>
              <input
                type="text"
                required
                value={form.tour}
                onChange={(e) => setForm({ ...form, tour: e.target.value })}
                placeholder="Tour name"
                className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-[#065F46] font-semibold mb-1">
                Start Date
              </label>
              <input
                type="date"
                required
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="block text-[#065F46] font-semibold mb-1">
                Number of Guests
              </label>
              <input
                type="number"
                min={1}
                required
                value={form.guests}
                onChange={(e) =>
                  setForm({ ...form, guests: e.target.value })
                }
                className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[#065F46] font-semibold mb-1">
              Special Requests (Optional)
            </label>
            <textarea
              rows={4}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Any special requests..."
              className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#D97706] hover:bg-[#b66205] text-white font-semibold py-3 rounded-xl transition"
          >
            Submit Booking
          </button>

          {/* Status */}
          {status && (
            <div className="text-center text-[#065F46] font-semibold mt-4">
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
