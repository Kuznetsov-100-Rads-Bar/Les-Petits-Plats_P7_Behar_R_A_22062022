import { searchAlgo } from "../algorithms/algo.js";
import { cardsInstance } from "../models/card.model.js";

const searchInput = document.getElementById('recipeSearch');

const searchInputHandler = () => {
    searchInput.addEventListener('input', async (event) => {
        const initialRecipes = cardsInstance.getRecipes('initial');
        const recipes = cardsInstance.getRecipes();
        const value = event.target.value;

        if (value && value.length >= 3) {
            const filteredRecipes = await searchAlgo(recipes, value);

            cardsInstance.update(filteredRecipes);
        } else {
            console.log("void")
            cardsInstance.update(initialRecipes);
        }
        console.log(value);
    });
}

export { searchInputHandler };