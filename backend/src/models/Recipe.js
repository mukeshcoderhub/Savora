import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  unit: { type: String, required: true },
});

const StepSchema = new mongoose.Schema({
  stepNumber: Number,
  instruction: { type: String, required: true },
  image: String,
});

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: String,

    category: {
      type: String,
      enum: ["snack", "sabzi", "curry", "sweet", "roti", "rice"],
      required: true,
    },

    cuisine: { type: String, default: "Indian" },

    ingredients: [IngredientSchema],
    steps: [StepSchema],

    prepTime: Number,
    cookTime: Number,
    servings: Number,

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    dietType: {
      type: String,
      enum: ["veg", "non-veg", "vegan"],
      default: "veg",
    },

    tags: [String],
    coverImage: { type: String, required: true },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    isFeatured: { type: Boolean, default: false },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", RecipeSchema);
