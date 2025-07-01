import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './globals.css'


export const metadata = {
  title: "Legends Team",
  description: "Experience the best adventures in Jordan with our expert guides",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}