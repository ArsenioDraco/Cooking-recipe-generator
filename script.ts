// script.ts
// TypeScript source. Compile with `tsc script.ts` to produce script.js (provided below).
type IngredientType = "protein"|"vegetable"|"starch"|"spice"|"herb"|"sauce"|"dairy"|"fruit";

interface Ingredient {
  name: string;
  type: IngredientType;
  flavorProfile: string[];
  cuisine: string[];
  compatibleWith: string[];
  methods: string[];
}

interface RecipeStep { instruction: string; durationMinutes?: number; }

interface Recipe {
  name: string;
  cuisine: string;
  method: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
}

const FALLBACK_INGREDIENTS: Ingredient[] = [
  // (kept short, same as ingredients.json)
];

async function loadIngredients(): Promise<Ingredient[]> {
  try {
    const resp = await fetch("ingredients.json", { cache: "no-store" });
    if (!resp.ok) throw new Error("Failed to fetch JSON");
    const data = await resp.json();
    return data as Ingredient[];
  } catch (e) {
    console.warn("Could not fetch ingredients.json — using fallback list.", e);
    return FALLBACK_INGREDIENTS;
  }
}
function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
