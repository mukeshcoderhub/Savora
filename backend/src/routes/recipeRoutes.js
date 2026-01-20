import express from "express";
import {
  createRecipe,
  getAllRecipesAdmin,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getPublishedRecipes,
} from "../controllers/recipeController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* ADMIN ROUTES */
router.post("/", authMiddleware, adminOnly, createRecipe);
router.get("/admin", authMiddleware, adminOnly, getAllRecipesAdmin);
router.put("/:id", authMiddleware, adminOnly, updateRecipe);
router.delete("/:id", authMiddleware, adminOnly, deleteRecipe);

/* PUBLIC ROUTES */
router.get("/", getPublishedRecipes);
router.get("/:id", getRecipeById);

export default router;
