export default function TourForm({ form, setForm, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

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

      <div>
        <label className="block text-[#065F46] font-semibold mb-1">
          Description
        </label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          placeholder="Write a detailed description for the tour..."
          className="w-full border border-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#D97706]"
        ></textarea>
      </div>

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

      <button
        type="submit"
        className="w-full bg-[#D97706] hover:bg-[#b66205] text-white font-semibold py-3 rounded-xl transition"
      >
        Save Tour
      </button>
    </form>
  );
}
