import { NavLink } from "react-router-dom";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <aside
      className={`fixed md:static z-30 inset-y-0 left-0 w-64 bg-white border-r transform transition-transform
      ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      <div className="p-6 text-xl font-bold flex justify-between items-center">
        Savora Admin
        <button onClick={onClose} aria-label="Close sidebar" className="md:hidden text-xl">✕</button>
      </div>

      <nav className="flex flex-col gap-1 px-4">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `admin-link ${isActive ? "font-semibold" : ""}`
          }
          onClick={onClose}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/recipes"
          className={({ isActive }) =>
           `admin-link ${isActive ? "bg-gray-100 font-semibold" : ""}`
          }
          onClick={onClose}
        >
          Recipes
        </NavLink>
      </nav>
    </aside>
  );
}
