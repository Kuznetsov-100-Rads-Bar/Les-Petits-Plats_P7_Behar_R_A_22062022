import recipes from "../data/recipes.js";
import { cardsInstance } from "./models/card.model.js";
import { ingredientsInstance } from "./models/ingredients.model.js";
import { appliancesInstance } from "./models/appliances.model.js";
import { ustensilsInstance } from "./models/Ustensils.model.js";
import { searchInputHandler } from "./components/searchBar.js";

const init = () => {
  // console.log(recipes);

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
  const appliances =  [...new Set(tempAppliances)];
  const ustensils = [...new Set(tempUstensils)];
  //console.log(ingredients);
  //console.log(ustensils);
  //console.log(appliances);
  ingredientsInstance.setupIngredientsList(ingredients);
  appliancesInstance.setupAppliancesList(appliances);
  ustensilsInstance.setupUstensilsList(ustensils);

  // console.log("Ingredients", ingredientsInstance.getIngredients());
  // console.log("Appliances", appliancesInstance.getAppliances());
  // console.log("Ustensils", ustensilsInstance.getUstensils());


  cardsInstance.setupInitialRecipes(recipes);
  cardsInstance.display();
  // console.log(cardsInstance.display());

  searchInputHandler();
};

init();
/*
function generateIng(recipeArr) {
  let temp = []
  recipes.forEach((recipe) => {
    if (recipe.ingredients) {
      for (let i = 0; i < recipe.ingredients.length; i++) {
        const ingredient = recipe.ingredients[i];
        temp.push(ingredient.ingredient);
      }
    }
  });

  return temp
}

function displayIng() {

}

const ingList = generateIng(filteredRecipe)
displayIng(ingList);*/