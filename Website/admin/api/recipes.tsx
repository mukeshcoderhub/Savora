const API_URL = "http://localhost:5000/api/recipes";

export const createRecipe = async (recipeData: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 VERY IMPORTANT (cookies)
    body: JSON.stringify(recipeData),
  });

  if (!res.ok) {
    throw new Error("Failed to create recipe");
  }

  return res.json();
};

export const getAdminRecipes = async () => {
  const res = await fetch(`${API_URL}/admin`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return res.json();
};

export const deleteRecipe = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to delete recipe");
  }

  return res.json();
};

export const getRecipeById = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to load recipe");

  return res.json();
};

export const updateRecipe = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update recipe");

  return res.json();
};
