import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LearnMore from "./pages/LearnMore"
import AdminLayout from "../admin/layout/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";
import RecipeList from "../admin/pages/RecipeList";
import RecipeForm from "../admin/pages/RecipeForm";



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<Navigate to="dashboard" replace />} />
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="recipes" element={<RecipeList />} />
  <Route path="recipes/new" element={<RecipeForm />} />
  <Route path="recipes/:id/edit" element={<RecipeForm />} />
</Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
