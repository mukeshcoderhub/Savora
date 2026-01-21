import Navbar from "../components/Navbar";
import heroImage from "../assets/hero-illustration.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section
        id="home"
        className="min-h-[calc(100vh-80px)] bg-[#faf8f5]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Image */}
          <div className="flex justify-center">
            <img
              src={heroImage}
              alt="Cooking illustration"
              className="w-[260px] sm:w-[320px] md:w-[420px] animate-float"
            />
          </div>
          
          {/* Text */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2b1e12] leading-tight mb-6">
              Clarity in <br className="hidden md:block" /> every recipe
            </h1>

            <p className="text-base sm:text-lg text-[#6f5b4a] mb-10">
              Savora helps you cook with confidence — thoughtfully
              designed recipes, precise steps, and a calm cooking
              experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-4 rounded-full bg-[#8b5a2b] text-white font-semibold">
                Download App
              </button>

              <Link
                to="learn-more"
                className="px-8 py-4 rounded-full border border-[#8b5a2b] text-[#8b5a2b] font-semibold text-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-28 px-6 md:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#8b5a2b] mb-6">
          About Savora
        </h2>
        <p className="max-w-2xl mx-auto text-[#6f5b4a] text-base md:text-lg">
          Savora is built for people who value simplicity in cooking.
          No clutter. No confusion. Just clean, structured recipes
          designed for everyday life.
        </p>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-20 md:py-24 text-center bg-[#FAF8F5]"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#2B1E12]">
          Contact
        </h2>

        <div className="flex flex-col items-center gap-3 text-base md:text-lg text-[#6F5B4A]">
          <p>📧 <span className="font-medium">mukeshcoderhub@gmail.com</span></p>
          <p>📞 <span className="font-medium">+91 9352577689</span></p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-[#6f5b4a]">
        © {new Date().getFullYear()} Savora. All rights reserved.
      </footer>
    </>
  );
}
