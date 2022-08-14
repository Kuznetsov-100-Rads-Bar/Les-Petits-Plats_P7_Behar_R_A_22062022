/* Création et initialisation des instances. Au chargement de la page ! */

/* Importing the recipes.js file. */
import recipes from "../data/recipes.js";
/* Importing the cardsInstance from the card.model.js file. */
import { cardsInstance } from "./models/card.model.js";
/* Importing the ingredientsInstance from the ingredients.model.js file. */
import { ingredientsInstance } from "./models/ingredients.model.js";
/* Importing the appliancesInstance from the appliances.model.js file. */
import { appliancesInstance } from "./models/appliances.model.js";
/* Importing the ustensilsInstance from the Ustensils.model.js file. */
import { ustensilsInstance } from "./models/Ustensils.model.js";
/* Importing the searchInputHandler function from the searchBar.js file. */
import { searchInputHandler } from "./components/searchBar.js";

const init = () => {
  // console.log(recipes);

 /* Création d'un tableau vide. */
  const tempIngredients = [];
  const tempUstensils = [];
  const tempAppliances = [];

 /* Pousser les ingrédients, les ustensiles et les appareils dans les tableaux temporaire. */
 /* Boucle dans le tableau des recettes. */
  recipes.forEach((recipe) => {
   /* Pousser les ingrédients dans le tableau tempIngredients. */
    if (recipe.ingredients) {
      for (let i = 0; i < recipe.ingredients.length; i++) {
        const ingredient = recipe.ingredients[i];
        tempIngredients.push(ingredient.ingredient);
      }
    }
/* Pousser les ustensiles dans le tableau tempUstensils. */
    if (recipe.ustensils) {
      for (let i = 0; i < recipe.ustensils.length; i++) {
        const ustensil = recipe.ustensils[i];
        tempUstensils.push(ustensil);
      }
    }
/* Pousser l'appliance dans le tableau tempAppliances. */
    if (recipe.appliance) {
      tempAppliances.push(recipe.appliance);
    }
  });

  /* Création d'un nouveau tableau à partir du tableau tempIngredients, mais uniquement avec des valeurs uniques. */
  const ingredients = [...new Set(tempIngredients)];
/* Création d'un nouveau tableau à partir du tableau tempAppliances, mais uniquement avec des valeurs uniques. */
  const appliances =  [...new Set(tempAppliances)];
/* Création d'un nouveau tableau à partir du tableau tempUstensils, mais uniquement avec des valeurs uniques. */
  const ustensils = [...new Set(tempUstensils)];
  //console.log(ingredients);
  //console.log(ustensils);
  //console.log(appliances);
  
 /* Appel de la fonction setupIngredientsList depuis le fichier ingredients.model.js. */
  ingredientsInstance.setupIngredientsList(ingredients);
  /* Appel de la fonction setupAppliancesList depuis le fichier appliances.model.js. */
  appliancesInstance.setupAppliancesList(appliances);
  /* Appel de la fonction setupUstensilsList depuis le fichier Ustensils.model.js. */
  ustensilsInstance.setupUstensilsList(ustensils);

  // console.log("Ingredients", ingredientsInstance.getIngredients());
  // console.log("Appliances", appliancesInstance.getAppliances());
  // console.log("Ustensils", ustensilsInstance.getUstensils());


/* Mise en place des recettes initiales. */
  cardsInstance.setupInitialRecipes(recipes);
/* Affichage des recettes. */
  cardsInstance.display();
  // console.log(cardsInstance.display());
  /** cardsInstances.getRecipes()
   * @params NULL || "initial" (pour récupérer les recettes initiales (non filtrées))
   * @description récupère les recettes filtrées ou non de la page. 
   **/ 
  // cardsInstance.getRecipes();

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