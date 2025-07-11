import { getTour } from "@/app/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function TourDetails({ params }) {
  const tour = await getTour(params.id);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (!tour) {
    return (
      <div className="text-center py-20 text-[#065F46] px-4">
        <h1 className="text-4xl font-bold mb-4">Tour Not Found</h1>
        <Link
          href="/tours"
          className="text-[#D97706] underline hover:text-[#b66205] text-lg"
        >
          Go back to tours
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FDF6E3] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative w-full h-72 sm:h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            {tour.image && isValidUrl(tour.image) ? (
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                No image
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#065F46] mb-4 leading-tight">
              {tour.title}
            </h1>
            <p className="text-neutral-700 text-lg mb-6">{tour.description}</p>

            <ul className="space-y-3 mb-6 text-base text-neutral-800">
              {tour.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#D97706] text-lg mt-1">✓</span>
                  {detail}
                </li>
              ))}
            </ul>

            <div className="flex justify-between mb-8">
              <div>
                <p className="text-sm text-neutral-500">Duration</p>
                <p className="font-semibold text-base">{tour.duration}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Price</p>
                <p className="text-[#D97706] font-bold text-lg">{tour.price}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/bookings"
                className="px-6 py-3 bg-[#D97706] hover:bg-[#b66205] text-white font-semibold rounded-xl shadow-md text-center"
              >
                Book Now
              </Link>
              <Link
                href="/tours"
                className="px-6 py-3 border-2 border-[#D97706] text-[#D97706] font-semibold rounded-xl hover:bg-[#D97706] hover:text-white transition text-center"
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
