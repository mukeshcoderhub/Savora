import { API_BASE_URL } from '../config/backend';

export const getRecipes = async (
  search = '',
  category = ''
) => {
  const res = await fetch(
    `${API_BASE_URL}/recipes?search=${search}&category=${category}`
  );

  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
};

export const getRecipeById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/recipes/${id}`);

  if (!res.ok) throw new Error('Failed to fetch recipe');
  return res.json();
};
