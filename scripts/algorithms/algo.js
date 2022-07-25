/**
 * Algorythme moderne
 * @param recipes - an array of objects
 * @param input - the search input from the user
 */
// Il filtre le tableau des recettes et renvoie les recettes qui ont l'entrée dans leur nom, ingrédients ou descriptif
export const searchAlgo = (recipes, input) => {
/* Filtrer le tableau des recettes. */
    return recipes.filter((recipe) =>
/* Vérifier si le nom de la recette inclut l'entrée OU. */
        recipe.name.toLowerCase().includes(input)
        ||
/* Il vérifie si l'ingrédient est égal à l'entrée. */
        recipe.ingredients.some((ingredient) => ingredient.ingredient === input)
        ||
/* Vérifier si la description de la recette inclut l'entrée. */
        recipe.description.includes(input)
    );
}

/**
 * Il prend un tableau de recettes et une chaîne d'entrée, et renvoie un tableau de recettes qui correspondent à la chaîne d'entrée
 * @param recipes - an array of objects
 * @param input - the search input
 * @returns An array of objects.
 */


// Algorythme native
// export const searchAlgo = (recipes, input) => {
// /* Création d'un tableau vide. */
//     const list = [];
//     /* Boucler dans le tableau des recettes et vérifier si le nom ou la description correspond à l'entrée. */
//     for (let recipe of recipes) {
//         const recipeName = recipe.name.toLowerCase();
//         const recipeDescription = recipe.description.toLowerCase();

// /* Création d'une expression régulière qui correspondra à la chaîne d'entrée. */
//         const regex = new RegExp('(?:^|\\s)' + input.toLowerCase(), 'i');
// /* Tester si l'expression régulière correspond au nom de la recette. */
//         const isNameMatch = regex.test(recipeName);
// /* Tester si l'expression régulière correspond à la description de la recette. */
//         const isDescriptionMatch = regex.test(recipeDescription);

//         /* Boucler dans le tableau des ingrédients et vérifier si l'ingrédient correspond à l'entrée. */
//         for (const ingredients of recipe.ingredients) {
//             const isIngredientMatch = regex.test(ingredients.ingredient);

//             if (isIngredientMatch) {
//                 list.push(recipe);
//             }
//         }

//       /* Pousser la recette dans la liste si le nom ou la description correspond à l'entrée. */
//         if (isNameMatch) {
//             list.push(recipe);
//         }

//         if (isDescriptionMatch) {
//             list.push(recipe);
//         }
//     }

//     // console.log(input)
// /* Suppression des doublons de la liste. */
//     const filteredRecipes = [...new Set(list)];

// /* Renvoyer les recettes filtrées. */
//     return filteredRecipes;
// }