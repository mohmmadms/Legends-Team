'use client';

import { useEffect, useState } from 'react';
import { getTours } from '../lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function ToursPage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours();
        setTours(data);
      } catch (err) {
        console.error('Failed to load tours', err);
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="bg-[#FDF6E3] min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold text-[#065F46] mb-4">Explore Our Tours</h1>
        <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
          Find the adventure that&apos;s perfect for you. Whether it&apos;s the vast deserts, ancient cities, or stunning mountains — Jordan has it all.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {tours.map((tour) => (
          <motion.div
            key={tour._id}
            className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition cursor-pointer"
            whileHover={{ scale: 1.02 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <div className="relative h-56">
              {tour.image && isValidUrl(tour.image) ? (
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm">
                  No image
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-[#065F46]">{tour.title}</h3>
              <p className="text-neutral-700 mb-4">{tour.description}</p>
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-[#D97706] font-bold">{tour.price}</span>
                <span className="text-neutral-600">{tour.duration}</span>
              </div>
              <Link
                href={`/tours/${tour._id}`}
                className="block text-center bg-[#D97706] hover:bg-[#b66205] text-white py-2 rounded-xl transition"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
