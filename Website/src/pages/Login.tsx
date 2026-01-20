import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../api/auth";
import { useNavigate } from "react-router-dom";
import type { CredentialResponse } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth(); // ✅ IMPORTANT

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const idToken = credentialResponse.credential;

      if (!idToken) {
        throw new Error("No ID token received");
      }

      await loginWithGoogle(idToken);

      // 🔥 SYNC AUTH STATE
      await refreshAuth();

      // ✅ now Navbar + app knows user is logged in
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-8"
      style={{ backgroundColor: "#FAF8F5" }}
    >
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center animate-[float_4s_ease-in-out_infinite]">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#2B1E12" }}>
          Welcome to Savora
        </h2>

        <p className="mb-8" style={{ color: "#6F5B4A" }}>
          Sign in to continue your cooking journey
        </p>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google login failed")}
            theme="outline"
            size="large"
            shape="pill"
            text="continue_with"
          />
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </section>
  );
}
