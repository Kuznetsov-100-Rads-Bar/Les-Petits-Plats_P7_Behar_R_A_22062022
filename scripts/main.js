import recipes from "../data/recipes.js";
import { Ingredients } from "./models/ingredients.model.js";

const init = async () => {
  console.log(recipes);

  const tempIngredients = [];
  const tempUstensils = [];
  const tempAppliances = [];

  recipes.forEach((recipe) => {
    if (recipe.ingredients) {
      for (let i = 0; i < recipe.ingredients.length; i++) {
        const ingredient = recipe.ingredients[i];
        tempIngredients.push(ingredient.ingredient);
      }
    }
    if (recipe.ustensils) {
      for (let i = 0; i < recipe.ustensils.length; i++) {
        const ustensil = recipe.ustensils[i];
        tempUstensils.push(ustensil);
      }
    }
    if (recipe.appliance) {
      tempAppliances.push(recipe.appliance);
    }
  });

  const ingredients = [...new Set(tempIngredients)];
  const ustensils = [...new Set(tempUstensils)];
  const appliances = [...new Set(tempAppliances)];
  //console.log(ingredients);
  //console.log(ustensils);
  //console.log(appliances);
  const ingredientsInstance = new Ingredients(ingredients);
  console.log(ingredientsInstance.getIngredients());
};

init();
