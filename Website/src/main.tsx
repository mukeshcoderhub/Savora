import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <AuthProvider>
    <GoogleOAuthProvider clientId="221293480464-bs47klch5es16vahrns55cp8e0lo0sn8.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    </AuthProvider>
  </StrictMode>,
)
