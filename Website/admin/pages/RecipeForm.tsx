import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRecipe, getRecipeById, updateRecipe } from "../api/recipes";

/* ---------------- TYPES ---------------- */

type Ingredient = {
  name: string;
  quantity: string;
  unit: string;
};

type Step = {
  instruction: string;
};

/* ---------------- COMPONENT ---------------- */

export default function RecipeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  /* -------- BASIC INFO -------- */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("curry");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  /* -------- DETAILS -------- */
  const [difficulty, setDifficulty] = useState("easy");
  const [dietType, setDietType] = useState("veg");
  const [tags, setTags] = useState("");

  /* -------- TIME & SERVINGS -------- */
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [servings, setServings] = useState(0);

  /* -------- INGREDIENTS & STEPS -------- */
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", quantity: "", unit: "" },
  ]);
  const [steps, setSteps] = useState<Step[]>([{ instruction: "" }]);

  const [loading, setLoading] = useState(false);

  /* -------- LOAD RECIPE -------- */
  useEffect(() => {
    if (!isEdit) return;

    getRecipeById(id!)
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setCoverImage(data.coverImage);
        setStatus(data.status);
        setDifficulty(data.difficulty);
        setDietType(data.dietType);
        setTags(data.tags?.join(", ") || "");
        setPrepTime(data.prepTime);
        setCookTime(data.cookTime);
        setServings(data.servings);
        setIngredients(data.ingredients);
        setSteps(data.steps.map((s: any) => ({ instruction: s.instruction })));
      })
      .catch(() => alert("Failed to load recipe"));
  }, [id, isEdit]);

  /* -------- REQUIRED VALIDATION -------- */
  const validateForm = () => {
    if (!title.trim()) return "Recipe title is required";
    if (!description.trim()) return "Description is required";
    if (!category) return "Category is required";
    if (!coverImage.trim()) return "Cover image is required";

    if (prepTime <= 0) return "Prep time must be greater than 0";
    if (cookTime <= 0) return "Cook time must be greater than 0";
    if (servings <= 0) return "Servings must be greater than 0";

    if (!difficulty) return "Difficulty is required";
    if (!dietType) return "Diet type is required";

    for (const ing of ingredients) {
      if (!ing.name.trim() || !ing.quantity.trim() || !ing.unit.trim()) {
        return "All ingredient fields are required";
      }
    }

    for (const step of steps) {
      if (!step.instruction.trim()) {
        return "All steps are required";
      }
    }

    return null;
  };

  /* -------- SUBMIT -------- */
  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    setLoading(true);

    const recipeData = {
      title,
      description,
      category,
      coverImage,
      status,
      difficulty,
      dietType,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      prepTime,
      cookTime,
      servings,
      ingredients,
      steps: steps.map((s, i) => ({
        stepNumber: i + 1,
        instruction: s.instruction,
      })),
    };

    try {
      isEdit
        ? await updateRecipe(id!, recipeData)
        : await createRecipe(recipeData);

      alert(isEdit ? "Recipe updated ✅" : "Recipe created ✅");
      navigate("/admin/recipes");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-4xl w-full">
      <h2 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Recipe" : "Add Recipe"}
      </h2>

      {/* BASIC INFO */}
      <section className="card mb-6 space-y-3">
        <input className="input" placeholder="Recipe Title *" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="input" placeholder="Description *" value={description} onChange={e => setDescription(e.target.value)} />
        <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="snack">Snack</option>
          <option value="sabzi">Sabzi</option>
          <option value="curry">Curry</option>
          <option value="sweet">Sweet</option>
          <option value="roti">Roti</option>
          <option value="rice">Rice</option>
        </select>
      </section>

      {/* DETAILS */}
      <section className="card mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            ["Prep Time (mins)", prepTime, setPrepTime],
            ["Cook Time (mins)", cookTime, setCookTime],
            ["Servings", servings, setServings],
          ].map(([label, value, setter]: any, i) => (
            <div key={i}>
              <label className="block text-sm mb-1">{label} *</label>
              <input
                type="number"
                className="input"
                value={value}
                onChange={e => setter(Number(e.target.value))}
                min={1}
              />
            </div>
          ))}
        </div>

        <select className="input" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select className="input" value={dietType} onChange={e => setDietType(e.target.value)}>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
          <option value="vegan">Vegan</option>
        </select>

        <input className="input" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
      </section>

      {/* INGREDIENTS */}
      <section className="card mb-6">
        {ingredients.map((ing, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
            <input className="input" placeholder="Name *" value={ing.name} onChange={e => {
              const c = [...ingredients]; c[i].name = e.target.value; setIngredients(c);
            }} />
            <input className="input" placeholder="Qty *" value={ing.quantity} onChange={e => {
              const c = [...ingredients]; c[i].quantity = e.target.value; setIngredients(c);
            }} />
            <input className="input" placeholder="Unit *" value={ing.unit} onChange={e => {
              const c = [...ingredients]; c[i].unit = e.target.value; setIngredients(c);
            }} />
          </div>
        ))}
        <button onClick={() => setIngredients([...ingredients, { name: "", quantity: "", unit: "" }])} className="text-sm text-amber-600">
          + Add Ingredient
        </button>
      </section>

      {/* STEPS */}
      <section className="card mb-6">
        {steps.map((s, i) => (
          <textarea
            key={i}
            className="input mb-2"
            placeholder={`Step ${i + 1} *`}
            value={s.instruction}
            onChange={e => {
              const c = [...steps]; c[i].instruction = e.target.value; setSteps(c);
            }}
          />
        ))}
        <button onClick={() => setSteps([...steps, { instruction: "" }])} className="text-sm text-amber-600">
          + Add Step
        </button>
      </section>

      {/* PUBLISH */}
      <section className="card mb-6 space-y-3">
        <input className="input" placeholder="Cover Image URL *" value={coverImage} onChange={e => setCoverImage(e.target.value)} />
        <select className="input" value={status} onChange={e => setStatus(e.target.value as any)}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </section>

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="px-6 py-3 bg-amber-600 text-white rounded-xl w-full sm:w-auto"
      >
        {loading ? "Saving..." : isEdit ? "Update Recipe" : "Save Recipe"}
      </button>
    </div>
  );
}
