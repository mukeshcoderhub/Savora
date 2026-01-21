import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../../src/context/AuthContext";

export default function AdminLayout() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <div className="p-6">Loading admin panel...</div>;

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* OVERLAY (MOBILE) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
