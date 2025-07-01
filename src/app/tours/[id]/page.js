import { getTour } from "@/app/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function TourDetails({ params }) {
  const tour = await getTour(params.id);

  if (!tour) {
    return (
      <div className="text-center py-20 text-[#065F46]">
        <h1 className="text-4xl font-bold mb-4">Tour Not Found</h1>
        <Link
          href="/tours"
          className="text-[#D97706] underline hover:text-[#b66205]"
        >
          Go back to tours
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FDF6E3] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative w-full h-80 md:h-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4 text-[#065F46]">
              {tour.title}
            </h1>
            <p className="text-neutral-700 mb-6">{tour.description}</p>

            <ul className="space-y-3 mb-6">
              {tour.details.map((detail, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-neutral-800"
                >
                  <span className="text-[#D97706] text-xl">✓</span> {detail}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-neutral-500">Duration</div>
                <div className="font-semibold">{tour.duration}</div>
              </div>
              <div>
                <div className="text-neutral-500">Price</div>
                <div className="text-[#D97706] font-bold text-lg">
                  {tour.price}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href="/bookings"
                className="px-6 py-3 bg-[#D97706] hover:bg-[#b66205] text-white font-semibold rounded-xl shadow-lg"
              >
                Book Now
              </Link>
              <Link
                href="/tours"
                className="px-6 py-3 border-2 border-[#D97706] text-[#D97706] font-semibold rounded-xl hover:bg-[#D97706] hover:text-white transition"
              >
                Back to Tours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
