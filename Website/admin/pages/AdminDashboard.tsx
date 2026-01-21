import { useEffect, useState } from "react";
import { getAdminRecipes } from "../api/recipes";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  getAdminRecipes()
    .then(setRecipes)
    .catch(() => setError("Failed to load dashboard"))
    .finally(() => setLoading(false));
}, []);


if (error) return <div className="text-red-600">{error}</div>;


  if (loading) return <div>Loading admin dashboard…</div>;

  const total = recipes.length;
  const draft = recipes.filter(r => r.status === "draft").length;
  const published = recipes.filter(r => r.status === "published").length;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <p className="text-sm text-gray-500">Total Recipes</p>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-500">Draft</p>
          <p className="text-3xl font-bold text-yellow-600">{draft}</p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-500">Published</p>
          <p className="text-3xl font-bold text-green-600">{published}</p>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">Recent Recipes</h3>
          <Link to="/admin/recipes" className="text-amber-600 text-sm">
            View all →
          </Link>
        </div>

        <ul className="divide-y">
          {recipes.slice(0, 5).map(r => (
            <li key={r._id} className="py-3 flex justify-between">
              <span>{r.title}</span>
              <span className={`text-xs px-3 py-1 rounded-full ${
                r.status === "published"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {r.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
