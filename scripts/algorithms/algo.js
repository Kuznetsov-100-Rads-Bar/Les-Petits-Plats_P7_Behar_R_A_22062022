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