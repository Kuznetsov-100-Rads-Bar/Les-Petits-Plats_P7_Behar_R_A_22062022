import recipes from "../data/recipes.js";
import { Card } from "./models/card.model.js";
import { Ingredients } from "./models/ingredients.model.js";

const init = async () => {
  console.log(recipes);

 /* Creating an empty array. */
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

  /* Creating a new array from the tempIngredients array, but only with unique values. */
  const ingredients = [...new Set(tempIngredients)];
  const ustensils = [...new Set(tempUstensils)];
  const appliances = [...new Set(tempAppliances)];
  //console.log(ingredients);
  //console.log(ustensils);
  //console.log(appliances);
  const ingredientsInstance = new Ingredients(ingredients);
  console.log(ingredientsInstance.getIngredients());

  const cardsInstance = new Card(recipes);
  console.log(cardsInstance.display());
};

init();
