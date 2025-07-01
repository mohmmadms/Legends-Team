"use client";

import { useState } from "react";
import { sendMessage } from "../lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await sendMessage(form);
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className="bg-[#FDF6E3] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-[#065F46] mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-center text-lg text-neutral-700 mb-10">
          Have questions? Reach out — we're always ready to help.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <div>
            <label className="block text-[#065F46] font-semibold mb-1">
              Message
            </label>
            <textarea
              rows={5}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your message..."
              className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D97706] hover:bg-[#b66205] text-white font-semibold py-3 rounded-xl transition"
          >
            Send Message
          </button>

          {status && (
            <div className="text-center text-[#065F46] font-semibold mt-4">
              {status}
            </div>
          )}
        </form>

        {/* Social Links Under the Form */}
        <div className="mt-10 flex justify-center gap-8">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            className="text-[#D97706] hover:text-[#b66205] transition"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            className="text-[#D97706] hover:text-[#b66205] transition"
          >
            Facebook
          </a>
          <a
            href="https://wa.me/962791234567"
            target="_blank"
            className="text-[#D97706] hover:text-[#b66205] transition"
          >
            WhatsApp
          </a>
          <a
            href="mailto:info@jordanadventures.com"
            target="_blank"
            className="text-[#D97706] hover:text-[#b66205] transition"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  );
}
