import { useAuth } from "../../src/context/AuthContext";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-2xl"
          aria-label="Open sidebar menu"
        >
          ☰
        </button>
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm hidden sm:block">{user?.name}</span>
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
