import React, { useEffect, useState } from "react";
import { getAdminRecipes, deleteRecipe } from "../api/recipes";
import { Link } from "react-router-dom";

export default function RecipeList() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRecipes = async () => {
    try {
      const data = await getAdminRecipes();
      setRecipes(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this recipe?")) return;
    await deleteRecipe(id);
    loadRecipes();
  };

  if (loading) return <div>Loading recipes...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recipes</h2>

        <Link
          to="/admin/recipes/new"
          className="px-4 py-2 bg-amber-600 text-white rounded-lg"
        >
          Add Recipe
        </Link>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th>Status</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {recipes.map((r) => (
              <tr key={r._id} className="border-b">
                <td className="p-4 font-medium">{r.title}</td>

                {/* STATUS BADGE */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      r.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>

                <td className="capitalize">{r.category}</td>

                <td className="flex gap-4">
                  <Link
                    to={`/admin/recipes/${r._id}/edit`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(r._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {recipes.length === 0 && (
              <tr>
                <td className="p-4">No recipes found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
