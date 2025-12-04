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

