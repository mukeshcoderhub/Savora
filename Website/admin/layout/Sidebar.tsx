import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 text-xl font-bold">Savora Admin</div>

      <nav className="flex flex-col gap-1 px-4">
        <NavLink to="/admin/dashboard" className="admin-link">
          Dashboard
        </NavLink>
        <NavLink to="/admin/recipes" className="admin-link">
          Recipes
        </NavLink>
      </nav>
    </aside>
  );
}
