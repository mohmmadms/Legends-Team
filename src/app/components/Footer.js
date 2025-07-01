import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#065F46] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Jordan Adventures</h2>
          <p className="text-sm">
            Explore the beauty of Jordan with our curated tours, from Wadi Rum
            to Petra and beyond.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-[#D97706]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/tours" className="hover:text-[#D97706]">
                Tours
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#D97706]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/bookings" className="hover:text-[#D97706]">
                Booking
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-[#D97706]">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>Wadi Rum, Petra, Amman - Jordan</p>
          <p>Phone: +962 79 000 0000</p>
          <p>Email: info@jordanadventure.com</p>
          <div className="flex space-x-4 mt-4">
            <Link href="#" className="hover:text-[#D97706]">
              Instagram
            </Link>
            <Link href="#" className="hover:text-[#D97706]">
              Facebook
            </Link>
            <Link href="#" className="hover:text-[#D97706]">
              WhatsApp
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm border-t border-white/20 pt-4">
        © 2025 Jordan Adventure Tours. All rights reserved.
      </div>
    </footer>
  );
}
