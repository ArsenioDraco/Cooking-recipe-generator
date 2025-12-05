# Cooking recipe generator

**Cooking recipe generator** is a browser-based tool for creating unique, dynamic recipes using a database of ingredients, cooking methods, and cuisines. Built with **TypeScript** (compiled to **JavaScript**), HTML, and CSS, it emphasizes logical internal consistency, flexible ingredient selection, and reproducible results via seeded generation. The interface is minimal and functional, focusing on easy interaction, clean presentation, and downloadable output for practical use.

## Main Features

**Dynamic Recipe Creation:**
Generates recipes with a protein base and a selection of compatible ingredients. Each recipe includes step-by-step instructions for preparation, cooking, and finishing touches.

**Seeded Generation:**
Users can input a custom seed to generate repeatable recipes. This allows for consistent results when experimenting with different ingredient combinations or sharing recipes with others.

**Ingredient Compatibility:**
Ingredients are chosen based on compatibility lists and cuisine similarity. If the ideal match isn’t available, the system broadens the selection logically to maintain flavor and coherence.

**Regeneration:**
Recipes can regenerate compatible ingredients while keeping the main protein and cooking method unchanged. This provides variety without losing the core concept of the recipe.

**Downloadable Recipes:**
Recipes can be exported as `.txt` files, including ingredient lists, cuisine, cooking method, and step-by-step instructions, making it easy to save, share, or print.

**Fallback Handling:**
If `ingredients.json` fails to load, a fallback ingredient list ensures the generator remains functional.

## Technical Highlights

**TypeScript:**

* Strong typing for `Ingredient`, `Recipe`, and `RecipeStep` objects.
* Functions for seeded random number generation, ingredient selection, and step creation.
* Handles async loading of ingredient data with graceful fallback behavior.

**Randomized Logic:**

* `pickBase` selects a protein as the core ingredient.
* `chooseCompatible` picks complementary ingredients by compatibility and cuisine.
* Cooking method is chosen based on the base ingredient’s allowed methods, with a sensible default.
* `buildSteps` constructs detailed instructions covering prep, cooking, and garnishing.

**Browser Integration:**

* DOM manipulation for rendering recipes in a clear, readable format.
* Event-driven buttons for generation, regeneration, and download.
* Optional seed input for deterministic recipe creation.

**JSON Ingredient Database:**

* Structured with type, flavor profile, cuisine, compatible ingredients, and methods.
* Extensible and easy to update with new ingredients or cuisines.

**UI / UX:**

* Simple, responsive HTML layout.
* Clear separation of title, cuisine, method, ingredients, and steps.
* Minimalistic styling ensures readability and functional clarity.

## File Structure

| File               | Description                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `index.html`       | Main HTML interface for the recipe generator.                                                        |
| `style.css`        | Styling for a clean, readable layout.                                                                |
| `script.ts`        | TypeScript logic handling ingredient selection, recipe generation, and step construction.            |
| `script.js`        | Compiled JavaScript from `script.ts` for browser execution.                                          |
| `ingredients.json` | JSON database of ingredients, including type, flavor profile, compatible items, and cooking methods. |

## Personal Note

This project was my first time using TypeScript and combines my interest in algorithmic generation with practical cooking logic. The idea for the site came from when I wanted to make lunch for myself and realized that many people don’t really know what they want to eat and would rather have someone else pick their meals for them—even if they cook the food themselves. This inspired me to create a site that generates recipes, though not an exhaustive number. Using TypeScript allowed me to structure data precisely and enforce ingredient compatibility, while seeded randomization adds reproducibility without sacrificing creativity. Building the Cooking recipe generator reinforced my focus on clear UI design and reliable internal logic, bridging the gap between interactive front-end development and structured data handling.
