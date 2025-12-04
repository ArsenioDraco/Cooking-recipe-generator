// script.js - compiled from script.ts (hand-polished for browser).
(function(){
  // small inline fallback (same as ingredients.json)
  var FALLBACK_INGREDIENTS = [
    {
      "name":"chicken breast","type":"protein","flavorProfile":["savory"],"cuisine":["American","Mediterranean"],
      "compatibleWith":["garlic","lemon","olive oil","thyme"],"methods":["roast","pan-fry","grill"]
    },
    {
      "name":"salmon fillet","type":"protein","flavorProfile":["savory","fatty"],"cuisine":["Nordic","Japanese","Mediterranean"],
      "compatibleWith":["lemon","soy sauce","ginger","olive oil"],"methods":["pan-fry","bake","grill"]
    },
    {
      "name":"potato","type":"starch","flavorProfile":["earthy","starchy"],"cuisine":["American","European"],
      "compatibleWith":["butter","rosemary","olive oil","garlic"],"methods":["roast","boil","pan-fry"]
    },
    {
      "name":"spinach","type":"vegetable","flavorProfile":["green","slightly-bitter"],"cuisine":["Mediterranean","Indian"],
      "compatibleWith":["garlic","olive oil","lemon","feta"],"methods":["sauté","blanch"]
    },
    {
      "name":"garlic","type":"spice","flavorProfile":["pungent","umami"],"cuisine":["global"],
      "compatibleWith":["chicken breast","potato","spinach","olive oil","butter"],"methods":["saute","roast"]
    },
    {
      "name":"olive oil","type":"sauce","flavorProfile":["fatty","fruity"],"cuisine":["Mediterranean"],
      "compatibleWith":["chicken breast","potato","spinach","garlic","lemon"],"methods":["drizzle","pan-fry"]
    },
    {
      "name":"lemon","type":"fruit","flavorProfile":["bright","acidic"],"cuisine":["Mediterranean","Asian"],
      "compatibleWith":["chicken breast","salmon fillet","spinach","olive oil"],"methods":["zest","juice"]
    },
    {
      "name":"thyme","type":"herb","flavorProfile":["earthy","herbaceous"],"cuisine":["Mediterranean","French"],
      "compatibleWith":["chicken breast","potato","olive oil"],"methods":["roast","infuse"]
    },
    {
      "name":"soy sauce","type":"sauce","flavorProfile":["salty","umami"],"cuisine":["Asian"],
      "compatibleWith":["salmon fillet","ginger","garlic"],"methods":["marinate","glaze"]
    },
    {
      "name":"butter","type":"dairy","flavorProfile":["fatty","rich"],"cuisine":["European"],
      "compatibleWith":["potato","garlic","thyme"],"methods":["pan-fry","baste"]
    },
    {
      "name":"feta","type":"dairy","flavorProfile":["salty","tangy"],"cuisine":["Mediterranean"],
      "compatibleWith":["spinach","olive oil","lemon"],"methods":["crumbles","garnish"]
    },
    {
      "name":"ginger","type":"spice","flavorProfile":["warm","zesty"],"cuisine":["Asian","Indian"],
      "compatibleWith":["salmon fillet","soy sauce"],"methods":["grate","saute"]
    }
  ];

  function loadIngredients(){
    return fetch("ingredients.json", {cache:"no-store"}).then(function(resp){
      if(!resp.ok) throw new Error("bad");
      return resp.json();
    }).catch(function(e){
      console.warn("Using fallback ingredients", e);
      return FALLBACK_INGREDIENTS;
    });
  }
function seededRandom(seed){
    var s = seed % 2147483647;
    if(s <= 0) s += 2147483646;
    return function(){
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  function randomChoice(arr, rand){
    if(rand === void 0) rand = Math.random;
    return arr[Math.floor(rand() * arr.length)];
  }

  function pickBase(ingredients, rand){
    if(rand === void 0) rand = Math.random;
    var proteins = ingredients.filter(function(i){ return i.type === "protein"; });
    return randomChoice(proteins, rand);
  }

  function chooseCompatible(base, all, count, rand){
    if(count === void 0) count = 3;
    if(rand === void 0) rand = Math.random;
    var pool = all.filter(function(i){ return i.name !== base.name && base.compatibleWith.includes(i.name); });
    var chosen = [];
    if(pool.length >= count){
      var shuffled = pool.slice().sort(function(){ return 0.5 - rand(); });
      chosen = shuffled.slice(0, count);
    } else {
      var sameCuisine = all.filter(function(i){ return i.name !== base.name && i.cuisine.some(function(c){ return base.cuisine.includes(c); }); });
      var mergedNames = {};
      var merged = [];
      pool.concat(sameCuisine).forEach(function(x){
        if(!mergedNames[x.name]) { mergedNames[x.name] = true; merged.push(x); }
      });
      var shuffled2 = merged.slice().sort(function(){ return 0.5 - rand(); });
      chosen = shuffled2.slice(0, count);
    }
    return chosen;
  }
 function buildSteps(base, chosen, method){
    var steps = [];
    var main = base.name;
    if(method === "roast" || method === "bake"){
      steps.push({ instruction: "Preheat the oven to 375°F (190°C)." });
    } else if(method === "pan-fry" || method === "pan-frying"){
      steps.push({ instruction: "Heat a skillet over medium-high heat and add 1–2 tbsp of oil or butter." });
    } else {
      steps.push({ instruction: "Prepare your pan or oven for " + method + "." });
    }
    steps.push({ instruction: "Season the " + main + " with salt and pepper. If available, add a squeeze of lemon or a drizzle of soy sauce." });
    var vegs = chosen.filter(function(i){ return i.type === "vegetable" || i.type === "starch"; });
    if(vegs.length){
      steps.push({ instruction: "Prepare the side items: " + vegs.map(function(v){ return v.name; }).join(", ") + " (wash, peel, chop as needed)." });
    }
 if(method === "roast" || method === "bake"){
      steps.push({ instruction: "Roast the " + main + " in the oven for 20–40 minutes (depending on thickness) until cooked through." });
      if(vegs.length) steps.push({ instruction: "Roast the " + vegs.map(function(v){ return v.name; }).join(", ") + " alongside for 20–30 minutes until tender." });
    } else if(method === "pan-fry" || method === "pan-frying"){
      steps.push({ instruction: "Pan-fry the " + main + " on medium-high heat, about 3–6 minutes per side until golden and cooked through." });
      if(vegs.length) steps.push({ instruction: "Sauté the " + vegs.map(function(v){ return v.name; }).join(", ") + " in the same pan until tender." });
    } else {
      steps.push({ instruction: "Cook the " + main + " using " + method + " until done." });
    }
    var garnish = chosen.find(function(i){ return i.type === "herb" || i.type === "dairy" || i.type === "fruit"; });
    if(garnish) steps.push({ instruction: "Finish with " + garnish.name + " — a little goes a long way." });
    steps.push({ instruction: "Serve warm. Enjoy." });
    return steps;
  }

  function recipeName(method, base){
    var capitalMethod = method.charAt(0).toUpperCase() + method.slice(1);
    return capitalMethod + " " + base.name;
  }
 function init(){
    loadIngredients().then(function(ingredients){
      if(!ingredients || !ingredients.length){
        console.error("No ingredients available.");
        return;
      }
      var generateBtn = document.getElementById("generateBtn");
      var regenBtn = document.getElementById("regenBtn");
      var downloadBtn = document.getElementById("downloadBtn");
      var seedInput = document.getElementById("seed");
      var titleEl = document.getElementById("recipeTitle");
      var ingredientList = document.getElementById("ingredientList");
      var stepsList = document.getElementById("stepsList");
      var cuisineTag = document.getElementById("cuisineTag");
      var methodTag = document.getElementById("methodTag");
      var lastRecipe = null;

      function renderRecipe(recipe){
        titleEl.textContent = recipe.name;
        cuisineTag.textContent = recipe.cuisine;
        methodTag.textContent = recipe.method;
        ingredientList.innerHTML = "";
        recipe.ingredients.forEach(function(ing){
          var li = document.createElement("li");
          li.textContent = ing.name;
          ingredientList.appendChild(li);
        });
        stepsList.innerHTML = "";
        recipe.steps.forEach(function(s){
          var li = document.createElement("li");
          li.textContent = s.instruction;
          stepsList.appendChild(li);
        });
      }
  function makeRecipe(seedText){
        var rand = Math.random;
        if(seedText && seedText.trim().length){
          var n = Array.from(seedText).reduce(function(acc, ch){ return acc + ch.charCodeAt(0); }, 0);
          rand = seededRandom(n);
        }
        var base = pickBase(ingredients, rand);
        var compat = chooseCompatible(base, ingredients, 3, rand);
        var method = randomChoice(base.methods.concat("pan-fry"), rand);
        var ingreds = [base].concat(compat);
        var steps = buildSteps(base, compat, method);
        var rec = {
          name: recipeName(method, base),
          cuisine: base.cuisine[0] || "Global",
          method: method,
          ingredients: ingreds,
          steps: steps
        };
        lastRecipe = rec;
        return rec;
      }

      generateBtn.addEventListener("click", function(){
        var seedVal = seedInput.value;
        var r = makeRecipe(seedVal);
        renderRecipe(r);
      });
 regenBtn.addEventListener("click", function(){
        if(!lastRecipe){
          var r = makeRecipe(seedInput.value);
          renderRecipe(r);
          return;
        }
        var rand = seedInput.value ? seededRandom(seedInput.value.length) : Math.random;
        var newCompat = chooseCompatible(lastRecipe.ingredients[0], ingredients, 3, rand);
        var newRecipe = {
          name: lastRecipe.name,
          cuisine: lastRecipe.cuisine,
          method: lastRecipe.method,
          ingredients: [lastRecipe.ingredients[0]].concat(newCompat),
          steps: buildSteps(lastRecipe.ingredients[0], newCompat, lastRecipe.method)
        };
        lastRecipe = newRecipe;
        renderRecipe(newRecipe);
      });
downloadBtn.addEventListener("click", function(){
        if(!lastRecipe) return alert("Generate a recipe first.");
        var lines = [];
        lines.push(lastRecipe.name);
        lines.push("");
        lines.push("Cuisine: " + lastRecipe.cuisine);
        lines.push("Method: " + lastRecipe.method);
        lines.push("");
        lines.push("Ingredients:");
        lastRecipe.ingredients.forEach(function(i){ lines.push("- " + i.name); });
        lines.push("");
        lines.push("Instructions:");
        lastRecipe.steps.forEach(function(s, idx){ lines.push((idx+1) + ". " + s.instruction); });
        var blob = new Blob([lines.join("\n")], { type: "text/plain" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");


