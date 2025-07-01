import { getTours } from "../lib/api";
import Link from "next/link";
import Image from "next/image";

export default async function ToursPage() {
  const tours = await getTours();

  return (
    <div className="bg-[#FDF6E3] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#065F46] mb-4">
            Explore Our Tours
          </h1>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            Find the adventure that’s perfect for you. Whether it's the vast
            deserts, ancient cities, or stunning mountains — Jordan has it all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div
              key={tour._id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition"
            >
              <div className="relative h-56">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#065F46]">
                  {tour.title}
                </h3>
                <p className="text-neutral-700 mb-4">{tour.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#D97706] font-bold">{tour.price}</span>
                  <span className="text-neutral-600">{tour.duration}</span>
                </div>
                <Link
                  href={`/tours/${tour._id}`}
                  className="block w-full text-center bg-[#D97706] hover:bg-[#b66205] text-white py-2 rounded-xl transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
