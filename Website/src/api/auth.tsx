const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginWithGoogle = async (idToken: string) => {
  const response = await fetch(`${BASE_URL}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // cookies
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    const data = await response.json();
throw new Error(data.message || "Authentication failed");

  }

  return response.json();
};

export const checkAuth = async () => {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};
