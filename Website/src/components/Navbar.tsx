import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout, loading } = useAuth();

  if (loading) return null; // prevent flicker

  return (
    <nav className="sticky top-0 z-20 bg-white">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl font-bold" style={{ color: "#2B1E12" }}>
          Savora
        </div>

        {/* Links */}
        <ul className="hidden md:flex gap-10 font-medium">
          <li>
            <a href="#home" className="hover:opacity-80" style={{ color: "#6F5B4A" }}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:opacity-80" style={{ color: "#6F5B4A" }}>
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:opacity-80" style={{ color: "#6F5B4A" }}>
              Contact
            </a>
          </li>
        </ul>

        {/* Auth Section */}
        {!isAuthenticated ? (
          <Link
            to="/login"
            className="px-6 py-2.5 rounded-full font-medium text-white transition hover:opacity-90"
            style={{ backgroundColor: "#8B5A2B" }}
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-4">
        {isAuthenticated && user?.isAdmin === true && (
  <Link className="cursor-pointer border-b-2 border-amber-950 mx-4" to="/admin">Admin</Link>
)}


            {/* Logout */}
            <button
              onClick={logout}
              className="cursor-pointer px-5 py-2 rounded-full font-medium border transition hover:bg-gray-100"
              style={{ color: "#2B1E12" }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
