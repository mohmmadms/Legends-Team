'use client';

import { useEffect, useState } from 'react';
import { getGallery } from '../lib/api';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getGallery();
        setImages(data);
      } catch (err) {
        console.error('Failed to load gallery', err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="bg-[#FDF6E3] min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-[#065F46] mb-4">Gallery</h1>
        <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
          Explore the moments captured on our unforgettable adventures.
        </p>
      </div>

      {images.length === 0 ? (
        <p className="text-center text-gray-500">No images uploaded yet.</p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {images.map((img) => (
            <motion.div
              key={img._id}
              className="group cursor-pointer relative overflow-hidden rounded-xl shadow hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(img)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Image
                src={img.url}
                alt={img.title}
                width={500}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-2">
                {img.title} {img.category && `• ${img.category}`}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-5xl w-full px-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected.url}
                alt={selected.title}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
              />
              <div className="text-white text-lg mt-4 text-center">
                {selected.title}
                {selected.category && <span className="text-sm ml-2">({selected.category})</span>}
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black rounded-full p-2"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
