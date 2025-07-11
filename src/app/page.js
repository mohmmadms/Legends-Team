'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getGallery } from './lib/api';
import { motion } from 'framer-motion';

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Home() {
  const [tours, setTours] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tours`);
        const data = await res.json();
        setTours(data);
      } catch (error) {
        console.error('Failed to fetch tours:', error);
      }
    };

    const fetchGallery = async () => {
      try {
        const data = await getGallery();
        setGalleryImages(data);
      } catch (err) {
        console.error('Failed to load gallery', err);
      }
    };

    fetchTours();
    fetchGallery();
  }, []);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="bg-[#FDF6E3] text-[#065F46]">
      {/* Hero */}
      <section className="relative h-screen">
        <Image src="/Home.jpg" alt="Wadi Rum desert" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.div
            className="text-center px-4 max-w-3xl"
            initial="hidden"
            animate="show"
            variants={fadeIn}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Discover Jordan&apos;s Hidden Gems
            </h1>
            <p className="text-xl text-white mb-8">
              Unforgettable adventures in Jordan’s breathtaking landscapes.
            </p>
            <div className="space-x-4">
              <Link href="/tours" className="inline-block px-6 py-3 bg-[#D97706] hover:bg-[#b66205] text-white font-semibold rounded-xl shadow-lg">
                Explore Tours
              </Link>
              <Link href="/contact" className="inline-block px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-[#D97706] font-semibold rounded-xl shadow-lg">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tours Carousel */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center mb-8" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
            Our Popular Adventures
          </motion.h2>
          {tours.length === 0 ? (
            <p className="text-center text-neutral-500">No tours available yet.</p>
          ) : (
            <Carousel responsive={responsive} infinite autoPlay className="gap-8">
              {tours.slice(0, 6).map((tour) => (
                <motion.div key={tour._id} variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="bg-white rounded-2xl shadow-xl m-4">
                  <div className="relative h-56">
                    {tour.image && isValidUrl(tour.image) ? (
                      <Image src={tour.image} alt={tour.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">No image</div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                    <p className="text-neutral-700 mb-4">{tour.description}</p>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-[#D97706] font-bold">{tour.price}</span>
                      <span>{tour.duration}</span>
                    </div>
                    <Link href={`/tours/${tour._id}`} className="block text-center bg-[#D97706] text-white py-2 rounded-xl">
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </Carousel>
          )}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center mb-12" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
            Our Core Values
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {[
              { title: 'Innovation', desc: 'Tailored, forward-thinking solutions for lasting impact.', icon: '💡' },
              { title: 'Excellence', desc: 'Striving to meet and exceed every expectation.', icon: '🏆' },
              { title: 'Integrity', desc: 'Transparent collaboration and clear KPIs.', icon: '🤝' },
              { title: 'Trusted Partnership', desc: 'We become part of your team, not just a vendor.', icon: '👥' },
            ].map((item, i) => (
              <motion.div key={i} className="p-6 bg-[#FDF6E3] shadow rounded-xl text-center" variants={fadeIn}>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-neutral-700">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2 className="text-4xl font-bold mb-12" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
            What We Offer
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {[
              { title: 'Inflatable Team Building', desc: 'Fun inflatable challenges to energize your team.' },
              { title: 'Traditional Team Building', desc: 'Indoor & outdoor games that build trust and unity.' },
              { title: 'Treasure Hunt', desc: 'Exciting, strategic puzzle adventures for groups.' },
              { title: 'Outdoor Trips', desc: 'Paintball, hiking, ziplines, camping, horse riding & more.' },
            ].map((s, i) => (
              <motion.div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition" variants={fadeIn}>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-neutral-700">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Travel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center mb-12" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
            Why Travel With Us
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {[
              { icon: '🏨', title: 'Comfortable Stay', desc: 'Top hotels and Bedouin camps.' },
              { icon: '🍽️', title: 'Local Cuisine', desc: 'Authentic Jordanian meals.' },
              { icon: '🚐', title: 'Reliable Transport', desc: 'Modern AC vehicles & drivers.' },
              { icon: '🗺️', title: 'Expert Guides', desc: 'Knowledgeable local guides.' },
              { icon: '🔒', title: 'Safety First', desc: 'Highest safety standards.' },
              { icon: '💯', title: 'Satisfaction', desc: 'We guarantee a memorable trip.' },
            ].map((f, i) => (
              <motion.div key={i} className="bg-[#FDF6E3] p-6 rounded-2xl text-center shadow hover:shadow-lg transition" variants={fadeIn}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-neutral-700">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2 className="text-4xl font-bold mb-6 text-[#065F46]" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
            Gallery
          </motion.h2>
          <motion.p className="text-lg text-neutral-700 mb-12 max-w-2xl mx-auto" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
            Explore the moments captured on our unforgettable adventures.
          </motion.p>

          {galleryImages.length === 0 ? (
            <p className="text-gray-500">No images uploaded yet.</p>
          ) : (
            <>
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
                {galleryImages.slice(0, 6).map((img) => (
                  <motion.div key={img._id} variants={fadeIn} className="group cursor-pointer relative overflow-hidden rounded-xl shadow hover:shadow-lg" onClick={() => setSelectedImage(img)}>
                    <Image src={img.url} alt={img.title} width={500} height={300} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-2">
                      {img.title} {img.category && `• ${img.category}`}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeIn}>
                <Link href="/gallery" className="inline-block mt-4 px-6 py-3 bg-[#D97706] text-white font-semibold rounded-xl hover:bg-[#b66205] transition">
                  View All Gallery
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl w-full px-4">
              <Image src={selectedImage.url} alt={selectedImage.title} width={1200} height={800} className="w-full h-auto rounded-lg" />
              <div className="text-white text-lg mt-4 text-center">
                {selectedImage.title} {selectedImage.category && <span className="text-sm ml-2">({selectedImage.category})</span>}
              </div>
              <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black rounded-full p-2">✕</button>
            </div>
          </div>
        )}
      </section>

      {/* Partners */}
      <section className="py-20 bg-gray-50">
        <motion.div className="max-w-7xl mx-auto px-4 text-center" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-4xl font-bold mb-6">Trusted By</h2>
          <p className="mb-10 text-neutral-600">Some of our valued clients and partners</p>
          <div className="flex flex-wrap justify-center gap-6">
            {["/logo1.png", "/logo2.png", "/logo3.png", "/logo4.png"].map((src, i) => (
              <Image key={i} src={src} alt={`Partner logo ${i}`} width={120} height={60} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#D97706] text-white">
        <motion.div className="max-w-7xl mx-auto text-center px-4" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-4xl font-bold mb-6">Ready for Your Jordanian Adventure?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contact us today to start planning your perfect trip. Our team is ready to help you create unforgettable memories.
          </p>
          <div className="space-x-4">
            <Link href="/contact" className="inline-block px-6 py-3 bg-white text-[#D97706] font-semibold rounded-xl hover:bg-neutral-100 transition">
              Get in Touch
            </Link>
            <Link href="/bookings" className="inline-block px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-[#D97706] transition">
              Book Now
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
