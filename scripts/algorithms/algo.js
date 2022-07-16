// export const searchAlgo = (recipes, input) => {
//     return recipes.filter((recipe) =>
//         recipe.name.toLowerCase().includes(input)
//         ||
//         recipe.ingredients.some((ingredient) => ingredient.ingredient === input)
//         ||
//         recipe.description.includes(input)
//     );
// }

export const searchAlgo = (recipes, input) => {
    const list = [];
    for (let recipe of recipes) {
        const recipeName = recipe.name.toLowerCase();
        const recipeDescription = recipe.description.toLowerCase();

        const regex = new RegExp('(?:^|\\s)' + input.toLowerCase(), 'i');
        const isNameMatch = regex.test(recipeName);
        const isDescriptionMatch = regex.test(recipeDescription);

        for (const ingredients of recipe.ingredients) {
            const isIngredientMatch = regex.test(ingredients.ingredient);

            if (isIngredientMatch) {
                list.push(recipe);
            }
        }

        if (isNameMatch) {
            list.push(recipe);
        }

        if (isDescriptionMatch) {
            list.push(recipe);
        }
    }

    // console.log(input)
    const filteredRecipes = [...new Set(list)];

    return filteredRecipes;
}