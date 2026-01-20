import { Link } from "react-router-dom";

export default function LearnMore() {
  return (
    <section
      className="min-h-screen px-6 md:px-10 py-24"
      style={{ backgroundColor: "#FAF8F5" }}
    >
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ color: "#2B1E12" }}
        >
          Why Savora?
        </h1>

        <p
          className="text-lg md:text-xl leading-relaxed"
          style={{ color: "#6F5B4A" }}
        >
          Savora is a modern recipe platform designed to make cooking
          simple, enjoyable, and stress-free.  
          No clutter, no confusion — just beautifully organized recipes
          that guide you step by step.
        </p>
      </div>

      {/* Features */}
<div className="mt-20 grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
  {[
    {
      title: "Clear & Structured Recipes",
      text: "Every recipe is thoughtfully written with precise ingredients, servings, and step-by-step instructions."
    },
    {
      title: "Smart Filters & Search",
      text: "Quickly discover recipes using ingredients, cuisine type, difficulty, or cooking time."
    },
    {
      title: "Modern & Calm Experience",
      text: "A warm, minimal interface designed to reduce clutter and enhance focus while cooking."
    }
  ].map((item, index) => (
    <div
      key={index}
      className="group relative p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Accent glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          boxShadow: "0 0 0 2px rgba(139, 90, 43, 0.15)"
        }}
      />

      <h3
        className="relative text-xl font-semibold mb-4"
        style={{ color: "#2B1E12" }}
      >
        {item.title}
        <span
          className="block w-12 h-1 mt-2 rounded-full"
          style={{ backgroundColor: "#8B5A2B" }}
        />
      </h3>

      <p
        className="relative leading-relaxed"
        style={{ color: "#6F5B4A" }}
      >
        {item.text}
      </p>
    </div>
  ))}
</div>


      {/* Who is Savora for */}
      <div className="mt-24 max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl font-bold mb-6"
          style={{ color: "#2B1E12" }}
        >
          Who is Savora for?
        </h2>

        <p
          className="text-lg leading-relaxed"
          style={{ color: "#6F5B4A" }}
        >
          Savora is perfect for beginners learning to cook, home chefs
          who love experimenting, and anyone who wants reliable recipes
          without wasting time scrolling endlessly.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-16 flex justify-center gap-4">
        <Link
          to="/"
          className="px-10 py-4 rounded-full font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#8B5A2B" }}
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
