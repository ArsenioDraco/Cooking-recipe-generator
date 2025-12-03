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
function randomChoice<T>(arr: T[], rand = Math.random): T {
  return arr[Math.floor(rand() * arr.length)];
}

function pickBase(ingredients: Ingredient[], rand = Math.random): Ingredient {
  const proteins = ingredients.filter(i => i.type === "protein");
  return randomChoice(proteins, rand);
}
function chooseCompatible(base: Ingredient, all: Ingredient[], count = 3, rand = Math.random) {
  const pool = all.filter(i => i.name !== base.name && base.compatibleWith.includes(i.name));
  // If not enough compatible, broaden to same cuisine
  let chosen: Ingredient[] = [];
  if (pool.length >= count) {
    const shuffled = pool.slice().sort(()=>0.5 - rand());
    chosen = shuffled.slice(0, count);
  } else {
    const sameCuisine = all.filter(i => i.name !== base.name && i.cuisine.some(c=>base.cuisine.includes(c)));
    const merged = Array.from(new Set([...pool, ...sameCuisine]));
    const shuffled = merged.slice().sort(()=>0.5 - rand());
    chosen = shuffled.slice(0, count);
  }
  return chosen;
}
function buildSteps(base: Ingredient, chosen: Ingredient[], method: string): RecipeStep[] {
  const steps: RecipeStep[] = [];
  const main = base.name;
  // Preheat/prepare step
  if (method === "roast" || method === "bake") {
    steps.push({ instruction: `Preheat the oven to 375°F (190°C).` });
  } else if (method === "pan-fry" || method === "pan-frying" || method === "pan-fry") {
    steps.push({ instruction: `Heat a skillet over medium-high heat and add 1–2 tbsp of oil or butter.` });
  } else {
    steps.push({ instruction: `Prepare your pan or oven for ${method}.` });
  }

  // Prep step
  steps.push({ instruction: `Season the ${main} with salt and pepper. If available, add a squeeze of lemon or a drizzle of soy sauce.` });

  // Add any quick-prepare ingredients
  const vegs = chosen.filter(i => i.type === "vegetable" || i.type === "starch");
  if (vegs.length) {
    steps.push({ instruction: `Prepare the side items: ${vegs.map(v=>v.name).join(", ")} (wash, peel, chop as needed).` });
  }

