import { API_BASE_URL } from '../config/backend';

export const getRecipes = async (
  search: string = '',
  category: string = ''
) => {
  try {
    const url = `${API_BASE_URL}/recipes?search=${encodeURIComponent(
      search
    )}&category=${encodeURIComponent(category)}`;

    const res = await fetch(url);

    const data = await res.json();

    return data;
  } catch (error: any) {
    throw error;
  }
};


export const getRecipeById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/recipes/${id}`);

  if (!res.ok) throw new Error('Failed to fetch recipe');
  return res.json();
};
