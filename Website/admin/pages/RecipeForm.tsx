import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createRecipe,
  getRecipeById,
  updateRecipe,
} from "../api/recipes";

type Ingredient = {
  name: string;
  quantity: string;
  unit: string;
};

type Step = {
  instruction: string;
};

export default function RecipeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  // BASIC INFO
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("curry");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  // EXTRA DETAILS (MATCH DB)
  const [difficulty, setDifficulty] = useState("easy");
  const [dietType, setDietType] = useState("veg");
  const [tags, setTags] = useState("");

  // INGREDIENTS & STEPS
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quantity: "", unit: "" },
  ]);

  const [steps, setSteps] = useState<Step[]>([{ instruction: "" }]);

  const [loading, setLoading] = useState(false);

  // LOAD RECIPE (EDIT MODE)
  useEffect(() => {
    if (!isEdit) return;

    const loadRecipe = async () => {
      try {
        const data = await getRecipeById(id!);

        setTitle(data.title);
        setDescription(data.description || "");
        setCategory(data.category);
        setCoverImage(data.coverImage);
        setStatus(data.status);

        setDifficulty(data.difficulty || "easy");
        setDietType(data.dietType || "veg");
        setTags(data.tags ? data.tags.join(", ") : "");

        setIngredients(data.ingredients);
        setSteps(data.steps.map((s: any) => ({ instruction: s.instruction })));
      } catch {
        alert("Failed to load recipe");
      }
    };

    loadRecipe();
  }, [id, isEdit]);

  // SUBMIT
  const handleSubmit = async () => {
    if (!title || !category || !coverImage) {
      alert("Title, category and cover image are required");
      return;
    }

    setLoading(true);

    const recipeData = {
      title,
      description,
      category,
      ingredients,
      steps: steps.map((s, i) => ({
        stepNumber: i + 1,
        instruction: s.instruction,
      })),
      coverImage,
      status,
      difficulty,
      dietType,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (isEdit) {
        await updateRecipe(id!, recipeData);
        alert("Recipe updated successfully ✅");
      } else {
        await createRecipe(recipeData);
        alert("Recipe created successfully ✅");
      }

      navigate("/admin/recipes");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Recipe" : "Add Recipe"}
      </h2>

      {/* BASIC INFO */}
      <section className="card mb-6">
        <h3 className="font-semibold mb-4">Basic Info</h3>

        <input
          className="input mb-3"
          placeholder="Recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="input mb-3"
          placeholder="Short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="snack">Snack</option>
          <option value="sabzi">Sabzi</option>
          <option value="curry">Curry</option>
          <option value="sweet">Sweet</option>
          <option value="roti">Roti</option>
          <option value="rice">Rice</option>
        </select>
      </section>

      {/* RECIPE DETAILS */}
      <section className="card mb-6">
        <h3 className="font-semibold mb-4">Recipe Details</h3>

        <select
          className="input mb-3"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          className="input mb-3"
          value={dietType}
          onChange={(e) => setDietType(e.target.value)}
        >
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
          <option value="vegan">Vegan</option>
        </select>

        <input
          className="input"
          placeholder="Tags (comma separated e.g. paneer, spicy)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </section>

      {/* INGREDIENTS */}
      <section className="card mb-6">
        <h3 className="font-semibold mb-4">Ingredients</h3>

        {ingredients.map((ing, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              className="input"
              placeholder="Name"
              value={ing.name}
              onChange={(e) => {
                const copy = [...ingredients];
                copy[index].name = e.target.value;
                setIngredients(copy);
              }}
            />

            <input
              className="input"
              placeholder="Quantity"
              value={ing.quantity}
              onChange={(e) => {
                const copy = [...ingredients];
                copy[index].quantity = e.target.value;
                setIngredients(copy);
              }}
            />

            <input
              className="input"
              placeholder="Unit"
              value={ing.unit}
              onChange={(e) => {
                const copy = [...ingredients];
                copy[index].unit = e.target.value;
                setIngredients(copy);
              }}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setIngredients([...ingredients, { name: "", quantity: "", unit: "" }])
          }
          className="text-sm text-amber-600"
        >
          + Add ingredient
        </button>
      </section>

      {/* STEPS */}
      <section className="card mb-6">
        <h3 className="font-semibold mb-4">Steps</h3>

        {steps.map((step, index) => (
          <textarea
            key={index}
            className="input mb-2"
            placeholder={`Step ${index + 1}`}
            value={step.instruction}
            onChange={(e) => {
              const copy = [...steps];
              copy[index].instruction = e.target.value;
              setSteps(copy);
            }}
          />
        ))}

        <button
          type="button"
          onClick={() => setSteps([...steps, { instruction: "" }])}
          className="text-sm text-amber-600"
        >
          + Add step
        </button>
      </section>

      {/* PUBLISH */}
      <section className="card mb-6">
        <h3 className="font-semibold mb-4">Publish</h3>

        <input
          className="input mb-3"
          placeholder="Cover image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />

        <select
          className="input"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </section>

      {/* ACTION */}
      <button
        disabled={loading}
        onClick={handleSubmit}
        className="px-6 py-3 bg-amber-600 text-white rounded-xl"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Recipe"
          : "Save Recipe"}
      </button>
    </div>
  );
}
