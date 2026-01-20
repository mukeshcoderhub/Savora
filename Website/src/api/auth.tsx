export const loginWithGoogle = async (idToken: string) => {
  const response = await fetch(
    "http://localhost:5000/api/auth/google",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 🔥 IMPORTANT (cookies)
      body: JSON.stringify({ idToken }),
    }
  );

  if (!response.ok) {
    throw new Error("Authentication failed");
  }

  return response.json();
};

export const checkAuth = async () => {
  const response = await fetch(
    "http://localhost:5000/api/auth/me",
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json(); // user data
};