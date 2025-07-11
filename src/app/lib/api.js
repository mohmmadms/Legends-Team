const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getTours() {
  const res = await fetch(`${API_URL}/tours`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tours");
  return res.json();
}

export async function getTour(id) {
  const res = await fetch(`${API_URL}/tours/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tour");
  return res.json();
}

export async function createTour(data) {
  const res = await fetch(`${API_URL}/tours`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create tour");
  return res.json();
}

export async function updateTour(id, data) {
  const res = await fetch(`${API_URL}/tours/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update tour");
  return res.json();
}

export async function deleteTour(id) {
  const res = await fetch(`${API_URL}/tours/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete tour");
  return res.json();
}

export async function sendBooking(data) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to send booking");
  return res.json();
}

// 💌 Contact API
export async function sendMessage(data) {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}
export async function getGallery() {
  const res = await fetch(`${API_URL}/gallery`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch gallery");
  return res.json();
}

export async function createGallery(data) {
  const res = await fetch(`${API_URL}/gallery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to add image to gallery");
  return res.json();
}
export async function deleteGalleryImage(id) {
  const res = await fetch(`${API_URL}/gallery/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete gallery image");
  return res.json();
}
