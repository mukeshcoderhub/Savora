import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-20 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="text-2xl font-bold text-[#2B1E12]">
          Savora
        </div>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex gap-10 font-medium text-[#6F5B4A]">
          <li>
            <a href="#home" className="hover:opacity-80">Home</a>
          </li>
          <li>
            <a href="#about" className="hover:opacity-80">About</a>
          </li>
          <li>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </li>
        </ul>

        {/* DESKTOP AUTH */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            /* Skeleton while auth loads */
            <div className="w-24 h-9 rounded-full bg-gray-200 animate-pulse" />
          ) : !isAuthenticated ? (
            <Link
              to="/login"
              className="px-6 py-2.5 rounded-full font-medium text-white bg-[#8B5A2B] hover:opacity-90"
            >
              Login
            </Link>
          ) : (
            <>
              {user?.isAdmin && (
                <Link
                  to="/admin"
                  className="border-b-2 border-amber-950 font-medium"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="px-5 py-2 rounded-full border font-medium text-[#2B1E12] hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-6 flex flex-col gap-4 text-[#6F5B4A]">
          <a href="#home" className="block">Home</a>
          <a href="#about" className="block">About</a>
          <a href="#contact" className="block">Contact</a>

          {loading ? (
            <div className="w-full h-10 rounded-full bg-gray-200 animate-pulse" />
          ) : !isAuthenticated ? (
            <Link
              to="/login"
              className="block w-full text-center py-2 rounded-full bg-[#8B5A2B] text-white"
            >
              Login
            </Link>
          ) : (
            <>
              {user?.isAdmin && (
                <Link to="/admin" className="block font-medium">
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="w-full text-left py-2 font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
