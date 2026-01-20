import React from "react";
import {useAuth} from "../../src/context/AuthContext"
export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Admin Panel</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">{user?.name}</span>
        <button
          onClick={logout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
