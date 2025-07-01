"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tours`
        );
        const data = await res.json();
        setTours(data);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="bg-[#FDF6E3] text-[#065F46]">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Image
          src="/images/hero.jpg"
          alt="Wadi Rum desert"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-4 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Discover Jordan's Hidden Gems
            </h1>
            <p className="text-xl text-white mb-8">
              Unforgettable adventures in Jordan’s breathtaking landscapes.
            </p>
            <div className="space-x-4">
              <Link
                href="/tours"
                className="inline-block px-6 py-3 bg-[#D97706] hover:bg-[#b66205] text-white font-semibold rounded-xl shadow-lg"
              >
                Explore Tours
              </Link>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-[#D97706] font-semibold rounded-xl shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Popular Adventures</h2>
            <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
              Carefully curated experiences showcasing Jordan’s natural beauty
              and culture.
            </p>
          </div>

          {tours.length === 0 ? (
            <div className="text-center text-neutral-500">
              No tours available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.slice(0, 3).map((tour) => (
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
                    <h3 className="text-xl font-semibold mb-2">
                      {tour.title}
                    </h3>
                    <p className="text-neutral-700 mb-4">
                      {tour.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[#D97706] font-bold">
                        {tour.price}
                      </span>
                      <span className="text-neutral-600">
                        {tour.duration}
                      </span>
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
          )}

          <div className="text-center mt-12">
            <Link
              href="/tours"
              className="inline-block px-8 py-3 border-2 border-[#D97706] text-[#D97706] font-semibold rounded-xl hover:bg-[#D97706] hover:text-white transition"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Travel With Us</h2>
            <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
              We go above and beyond to make your Jordanian adventure
              unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🏨", title: "Comfortable Stay", desc: "Top hotels and Bedouin camps." },
              { icon: "🍽️", title: "Local Cuisine", desc: "Authentic Jordanian meals." },
              { icon: "🚐", title: "Reliable Transport", desc: "Modern AC vehicles & drivers." },
              { icon: "🗺️", title: "Expert Guides", desc: "Knowledgeable local guides." },
              { icon: "🔒", title: "Safety First", desc: "Highest safety standards." },
              { icon: "💯", title: "Satisfaction", desc: "We guarantee a memorable trip." },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-[#FDF6E3] p-6 rounded-2xl text-center shadow hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-neutral-700">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#D97706] text-white">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready for Your Jordanian Adventure?
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contact us today to start planning your perfect trip. Our team is
            ready to help you create unforgettable memories.
          </p>
          <div className="space-x-4">
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-white text-[#D97706] font-semibold rounded-xl hover:bg-neutral-100 transition"
            >
              Get in Touch
            </Link>
            <Link
              href="/bookings"
              className="inline-block px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-[#D97706] transition"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
