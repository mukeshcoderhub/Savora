import { useEffect, useState } from "react";
import { getAdminRecipes, deleteRecipe } from "../api/recipes";
import { Link } from "react-router-dom";

export default function RecipeList() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

 const [error, setError] = useState("");

useEffect(() => {
  getAdminRecipes()
    .then(setRecipes)
    .catch(() => setError("Failed to load recipes"))
    .finally(() => setLoading(false));
}, []);

if (error) return <p className="text-red-600">{error}</p>;


  const handleDelete = async (id: string) => {
    if (!confirm("Delete this recipe?")) return;
    try {
  await deleteRecipe(id);
  setRecipes(prev => prev.filter(r => r._id !== id));
} catch {
  alert("Failed to delete recipe");
}

    setRecipes(prev => prev.filter(r => r._id !== id));
  };

  if (loading) return <div>Loading recipes...</div>;

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Recipes</h2>
        <Link
          to="/admin/recipes/new"
          className="px-4 py-2 bg-amber-600 text-white rounded-lg text-center"
        >
          Add Recipe
        </Link>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="space-y-4 md:hidden">
        {recipes.map(r => (
          <div
            key={r._id}
            className="bg-white border rounded-xl p-4 space-y-3"
          >
            <div>
              <p className="text-sm text-gray-500">Title</p>
              <p className="font-semibold">{r.title}</p>
            </div>

            <div className="flex justify-between items-center">
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  r.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {r.status}
              </span>

              <span className="text-sm capitalize text-gray-600">
                {r.category}
              </span>
            </div>

            <div className="flex gap-4 pt-2">
              <Link
                to={`/admin/recipes/${r._id}/edit`}
                className="text-blue-600 text-sm"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(r._id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {recipes.length === 0 && (
          <p className="text-gray-500 text-sm">No recipes found</p>
        )}
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block bg-white border rounded-xl overflow-hidden">
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
            {recipes.map(r => (
              <tr key={r._id} className="border-b">
                <td className="p-4 font-medium">{r.title}</td>

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

                <td className="flex gap-4 p-4">
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
                <td className="p-4 text-gray-500">No recipes found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
