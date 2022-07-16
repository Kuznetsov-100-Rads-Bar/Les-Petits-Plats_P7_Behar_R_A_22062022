// const errorMessage = document.getElementById("errorMessage");
import { searchAlgo } from "../algorithms/algo.js";
import { cardsInstance } from "../models/card.model.js";

const searchInput = document.getElementById('recipeSearch');

const searchInputHandler = () => {
    const initialRecipes = cardsInstance.getRecipes('initial');
    const recipes = cardsInstance.getRecipes();
    searchInput.addEventListener('input', async (event) => {
        const value = event.target.value;

        if (value && value.length >= 3) {
            const filteredRecipes = await searchAlgo(recipes, value);
            if (filteredRecipes.length === 0) {
                cardsInstance.update(filteredRecipes);
            } else {
                cardsInstance.update(filteredRecipes);
            }
        } else {
            cardsInstance.update(initialRecipes);
        }
    });
}

export { searchInputHandler };