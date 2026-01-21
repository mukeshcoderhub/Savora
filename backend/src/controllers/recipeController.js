import Recipe from "../models/Recipe.js";
import slugify from "slugify";

export const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      ingredients,
      steps,
      prepTime,
      cookTime,
      servings,
      difficulty,
      dietType,
      tags,
      coverImage,
      status,
    } = req.body;

    const recipe = await Recipe.create({
      title,
      slug: slugify(title, { lower: true }),
      description,
      category,
      ingredients,
      steps,
      prepTime,
      cookTime,
      servings,
      difficulty,
      dietType,
      tags,
      coverImage,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const getAllRecipesAdmin = async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });
  res.json(recipes);
};



export const getRecipeById = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  res.json(recipe);
};


export const updateRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  Object.assign(recipe, req.body);

  await recipe.save();

  res.json(recipe);
};

export const deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  await recipe.deleteOne();

  res.json({ message: "Recipe deleted successfully" });
};


export const getPublishedRecipes = async (req, res) => {
  try {
    const { search, category } = req.query;

    const filter = { status: 'published' };

    if (category) filter.category = category;

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const recipes = await Recipe.find(filter).sort({ createdAt: -1 });

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

