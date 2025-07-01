"use client";

import {
  createTour,
  updateTour,
  deleteTour,
  getTours,
} from "../lib/api";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdminTours() {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    image: "",
    details: [""],
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    const data = await getTours();
    setTours(data);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateTour(editingId, form);
    } else {
      await createTour(form);
    }
    fetchTours();
    resetForm();
  };

  const handleEdit = (tour) => {
    setForm({ ...tour });
    setEditingId(tour._id);
  };

  const handleDelete = async (id) => {
    await deleteTour(id);
    fetchTours();
  };

  const handleDetailsChange = (index, value) => {
    const updated = [...form.details];
    updated[index] = value;
    setForm({ ...form, details: updated });
  };

  const handleAddDetail = () => {
    setForm({ ...form, details: [...form.details, ""] });
  };

  const handleRemoveDetail = (index) => {
    const updated = form.details.filter((_, i) => i !== index);
    setForm({ ...form, details: updated });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      duration: "",
      image: "",
      details: [""],
    });
    setEditingId(null);
  };

  return (
    <div className="bg-[#FDF6E3] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-8 text-[#065F46]">
          Manage Tours
        </h1>

        {/* Tour Form */}
        <form
          onSubmit={handleAddOrUpdate}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12 space-y-6"
        >
          <h2 className="text-2xl font-semibold mb-4 text-[#065F46]">
            {editingId ? "Edit Tour" : "Add New Tour"}
          </h2>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Title */}
  <div>
    <label className="block text-[#065F46] font-semibold mb-1">
      Title
    </label>
    <input
      type="text"
      required
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
      placeholder="Tour title"
      className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
    />
  </div>

  {/* Price */}
  <div>
    <label className="block text-[#065F46] font-semibold mb-1">
      Price
    </label>
    <input
      type="text"
      required
      value={form.price}
      onChange={(e) => setForm({ ...form, price: e.target.value })}
      placeholder="$450"
      className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
    />
  </div>

  {/* Duration */}
  <div>
    <label className="block text-[#065F46] font-semibold mb-1">
      Duration
    </label>
    <input
      type="text"
      required
      value={form.duration}
      onChange={(e) => setForm({ ...form, duration: e.target.value })}
      placeholder="3 days"
      className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
    />
  </div>

  {/* Image URL */}
  <div>
    <label className="block text-[#065F46] font-semibold mb-1">
      Image URL
    </label>
    <input
      type="text"
      required
      value={form.image}
      onChange={(e) => setForm({ ...form, image: e.target.value })}
      placeholder="https://example.com/image.jpg"
      className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
    />
  </div>
</div>
          <div>
            <label className="block text-[#065F46] font-semibold mb-1">
              Description
            </label>
            <textarea
              rows={4}
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
            ></textarea>
          </div>

          {/* Tour Details */}
          <div>
            <label className="block text-[#065F46] font-semibold mb-2">
              Details (bullet points)
            </label>
            {form.details.map((detail, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleDetailsChange(index, e.target.value)}
                  className="flex-1 border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveDetail(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✖️
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDetail}
              className="text-[#D97706] hover:underline"
            >
              + Add Detail
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D97706] hover:bg-[#b66205] text-white font-semibold py-3 rounded-xl transition"
          >
            {editingId ? "Update Tour" : "Add Tour"}
          </button>
        </form>

        {/* Tours Table */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-[#065F46]">
            Current Tours
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-neutral-200">
              <thead className="bg-[#D97706] text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Duration</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tours.map((tour) => (
                  <tr
                    key={tour._id}
                    className="border-b border-neutral-200 hover:bg-[#FDF6E3]"
                  >
                    <td className="px-4 py-3">
                      <div className="relative w-20 h-14">
                        <Image
                          src={tour.image}
                          alt={tour.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">{tour.title}</td>
                    <td className="px-4 py-3">{tour.price}</td>
                    <td className="px-4 py-3">{tour.duration}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => handleEdit(tour)}
                        className="bg-[#065F46] hover:bg-[#054d3a] text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tour._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {tours.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6">
                      No tours available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
