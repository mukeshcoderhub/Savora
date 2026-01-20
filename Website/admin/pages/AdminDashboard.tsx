import React, { useEffect, useState } from "react";
import { getAdminRecipes } from "../api/recipes";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getAdminRecipes();
        setRecipes(data);
      } catch {
        alert("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  const total = recipes.length;
  const draft = recipes.filter((r) => r.status === "draft").length;
  const published = recipes.filter((r) => r.status === "published").length;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <p className="text-gray-500 text-sm">Total Recipes</p>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="card">
          <p className="text-gray-500 text-sm">Draft Recipes</p>
          <p className="text-3xl font-bold text-yellow-600">{draft}</p>
        </div>

        <div className="card">
          <p className="text-gray-500 text-sm">Published Recipes</p>
          <p className="text-3xl font-bold text-green-600">{published}</p>
        </div>
      </div>

      {/* RECENT RECIPES */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Recent Recipes</h3>

          <Link
            to="/admin/recipes"
            className="text-amber-600 text-sm"
          >
            View all →
          </Link>
        </div>

        {recipes.length === 0 ? (
          <p>No recipes yet</p>
        ) : (
          <ul className="divide-y">
            {recipes.slice(0, 5).map((r) => (
              <li key={r._id} className="py-3 flex justify-between">
                <span className="font-medium">{r.title}</span>

                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    r.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {r.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
