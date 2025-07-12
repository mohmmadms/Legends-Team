"use client";

import {
  createTour,
  updateTour,
  deleteTour,
  getTours,
  createGallery,
  deleteGalleryImage,
  getGallery,
} from "../lib/api";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdminPanel() {
  const [tours, setTours] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [tourForm, setTourForm] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    image: "",
    details: [""],
  });

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "",
    url: "",
  });

  useEffect(() => {
    fetchTours();
    fetchGallery();
  }, []);

  const fetchTours = async () => {
    const data = await getTours();
    setTours(data);
  };

  const fetchGallery = async () => {
    const data = await getGallery();
    setGalleryImages(data);
  };

  const resetTourForm = () => {
    setTourForm({
      title: "",
      description: "",
      price: "",
      duration: "",
      image: "",
      details: [""],
    });
    setEditingId(null);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleTourSubmit = async (e) => {
    e.preventDefault();
    editingId
      ? await updateTour(editingId, tourForm)
      : await createTour(tourForm);
    fetchTours();
    resetTourForm();
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!isValidUrl(galleryForm.url)) return alert("Invalid image URL");

    try {
      await createGallery(galleryForm);
      setGalleryForm({ title: "", category: "", url: "" });
      fetchGallery();
    } catch {
      alert("Failed to add image.");
    }
  };

  const handleDeleteTour = async (id) => {
    await deleteTour(id);
    fetchTours();
  };

  const handleDeleteImage = async (id) => {
    if (confirm("Delete this image?")) {
      await deleteGalleryImage(id);
      fetchGallery();
    }
  };

  const handleDetailsChange = (i, value) => {
    const updated = [...tourForm.details];
    updated[i] = value;
    setTourForm({ ...tourForm, details: updated });
  };

  const handleAddDetail = () => {
    setTourForm({ ...tourForm, details: [...tourForm.details, ""] });
  };

  const handleRemoveDetail = (i) => {
    setTourForm({
      ...tourForm,
      details: tourForm.details.filter((_, index) => index !== i),
    });
  };

  return (
    <div className="bg-[#FDF6E3] min-h-screen py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto space-y-24">
        <h1 className="text-5xl font-bold text-[#065F46] text-center">
          Admin Panel
        </h1>
        <div className="flex justify-end">
        <button
  onClick={async () => {
    await fetch("/api/admin/logout");
    window.location.href = "/admin/login";
  }}
  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
>
  Logout
</button>
        </div>


        {/* === Tour Form === */}
        <form
          onSubmit={handleTourSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-[#065F46]">
            {editingId ? "Edit Tour" : "Add New Tour"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              placeholder="Title"
              required
              value={tourForm.title}
              onChange={(e) => setTourForm({ ...tourForm, title: e.target.value })}
              className="border p-3 rounded-lg"
            />
            <input
              placeholder="Price"
              required
              value={tourForm.price}
              onChange={(e) => setTourForm({ ...tourForm, price: e.target.value })}
              className="border p-3 rounded-lg"
            />
            <input
              placeholder="Duration"
              required
              value={tourForm.duration}
              onChange={(e) => setTourForm({ ...tourForm, duration: e.target.value })}
              className="border p-3 rounded-lg"
            />
            <input
              placeholder="Image URL"
              required
              value={tourForm.image}
              onChange={(e) => setTourForm({ ...tourForm, image: e.target.value })}
              className="border p-3 rounded-lg"
            />
          </div>

          <textarea
            placeholder="Description"
            rows={4}
            required
            value={tourForm.description}
            onChange={(e) => setTourForm({ ...tourForm, description: e.target.value })}
            className="w-full border p-3 rounded-lg"
          />

          <div>
            <label className="text-[#065F46] font-medium">Details</label>
            {tourForm.details.map((d, i) => (
              <div key={i} className="flex gap-2 my-2">
                <input
                  value={d}
                  onChange={(e) => handleDetailsChange(i, e.target.value)}
                  className="flex-1 border p-2 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveDetail(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✖
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

        {/* === Tour Table === */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-[#065F46] mb-6">
            Current Tours
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left border border-neutral-200">
              <thead className="bg-[#D97706] text-white">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tours.map((tour) => (
                  <tr key={tour._id} className="border-b">
                    <td className="p-3">
                      {isValidUrl(tour.image) ? (
                        <Image
                          src={tour.image}
                          alt={tour.title}
                          width={100}
                          height={60}
                          className="rounded object-cover"
                        />
                      ) : (
                        <div className="w-24 h-16 bg-gray-200 text-gray-500 flex items-center justify-center text-xs">
                          Invalid
                        </div>
                      )}
                    </td>
                    <td className="p-3">{tour.title}</td>
                    <td className="p-3">{tour.price}</td>
                    <td className="p-3">{tour.duration}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => {
                          setTourForm(tour);
                          setEditingId(tour._id);
                        }}
                        className="bg-[#065F46] hover:bg-[#044c37] text-white px-4 py-2 rounded-lg transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTour(tour._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
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

        {/* === Gallery Form === */}
        <form
          onSubmit={handleGallerySubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-[#065F46]">
            Add Gallery Image
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Title"
              required
              value={galleryForm.title}
              onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
              className="border p-3 rounded-lg"
            />
            <input
              placeholder="Category"
              value={galleryForm.category}
              onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
              className="border p-3 rounded-lg"
            />
            <input
              placeholder="Image URL"
              required
              value={galleryForm.url}
              onChange={(e) => setGalleryForm({ ...galleryForm, url: e.target.value })}
              className="border p-3 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
          >
            Add Image
          </button>
        </form>

        {/* === Gallery Table === */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-[#065F46] mb-6">
            Gallery Images
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left border border-neutral-200">
              <thead className="bg-[#D97706] text-white">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {galleryImages.map((img) => (
                  <tr key={img._id} className="border-b">
                    <td className="p-3">
                      {isValidUrl(img.url) ? (
                        <img
                          src={img.url}
                          alt={img.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-24 h-16 bg-gray-200 text-gray-500 flex items-center justify-center text-xs">
                          Invalid
                        </div>
                      )}
                    </td>
                    <td className="p-3">{img.title}</td>
                    <td className="p-3">{img.category || "-"}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteImage(img._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {galleryImages.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No images yet
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
