import { appliancesInstance } from "./appliances.model.js";
import { ingredientsInstance } from "./ingredients.model.js";
import { tagCard } from "./tagCard.model.js";
import { ustensilsInstance } from "./Ustensils.model.js";

const cardsContainer = document.querySelector('.cards-container');
const errorMessage = document.getElementById('errorMessage');

class Card {
    constructor() {
        this.initialRecipes = [];
        this.recipes = [];
    }

    setupInitialRecipes = (recipes) => {
        this.initialRecipes = recipes;
        this.recipes = recipes;
        tagCard.updateSearchRecipes(recipes);
        return 'Card successfully setup';
    }

    getRecipes = (isInitial) => {
        if (isInitial && isInitial === "initial") {
            return this.initialRecipes;
        }
        return this.recipes;
    }

    update = (recipes) => {
        // if (Array(recipes) && recipes.length > 0) {
        //     this.recipes = recipes;
        // }
        this.recipes = recipes;
        const tempIngredients = [];
        const tempUstensils = [];
        const tempAppliances = [];

        recipes.forEach((recipe) => {
            /* Pousser les ingrédients dans le tableau tempIngredients. */
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

        /* Création d'un nouveau tableau à partir du tableau tempIngredients, mais uniquement avec des valeurs uniques. */
        const ingredients = [...new Set(tempIngredients)];
        const appliances = [...new Set(tempAppliances)];
        const ustensils = [...new Set(tempUstensils)];

        ingredientsInstance.updateIngredients(ingredients);
        appliancesInstance.updateAppliances(appliances);
        ustensilsInstance.updateUstentils(ustensils);
        this.display();
        if (this.recipes.length <= 0) {
            cardsContainer.classList.add('not-found');
            cardsContainer.appendChild(errorMessage);
        } else {
            cardsContainer.classList.remove('not-found');
        }

        return this.recipes;
    }

    display = () => {
        cardsContainer.innerHTML = '';

        this.recipes.forEach((recipe) => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card');

            const cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');

            const cardBody = document.createElement('div');
            cardBody.classList.add("card-body");

            const cardTitleContainer = document.createElement('div');
            cardTitleContainer.classList.add("card-title");

            const cardTitleText = document.createElement('h3');

            const cardDurationContainer = document.createElement("div");
            cardDurationContainer.classList.add("card-duration");

            const cardDurationIcon = document.createElement("img");
            cardDurationIcon.setAttribute('src', "./assets/icons/time-icon.svg");
            cardDurationIcon.setAttribute('alt', "");

            const cardDurationText = document.createElement("p");

            const cardIngredientsContainer = document.createElement("div");
            cardIngredientsContainer.classList.add('card-ingredients');

            const cardIngredientsList = document.createElement('ul');
            cardIngredientsList.classList.add('card-ingredients-list');

            const cardDescriptionContainer = document.createElement('div');
            cardDescriptionContainer.classList.add('card-description');

            const cardDescriptionText = document.createElement('p');

            cardTitleText.textContent = recipe.name;
            cardDurationText.textContent = `${recipe.time} min`;
            cardDescriptionText.textContent = recipe.description;


            cardContainer.appendChild(cardHeader);
            cardContainer.appendChild(cardBody);

            cardBody.appendChild(cardTitleContainer);
            cardTitleContainer.appendChild(cardTitleText);

            cardBody.appendChild(cardDurationContainer);
            cardDurationContainer.appendChild(cardDurationIcon);
            cardDurationContainer.appendChild(cardDurationText);

            cardBody.appendChild(cardIngredientsContainer);
            cardIngredientsContainer.appendChild(cardIngredientsList);

            recipe.ingredients.forEach((ingredient) => {
                const cardIngredientItem = document.createElement('li');
                cardIngredientItem.classList.add("card-ingredient");

                cardIngredientItem.innerHTML = `<span class="card-ingredient-name">${ingredient.ingredient}</span> ${ingredient.quantity ? `: ${ingredient.quantity}` : "1"} ${ingredient.unit ? ingredient.unit === "grammes" || ingredient.unit === "gramme" ? "g" : ingredient.unit : ""}`;
                cardIngredientsList.appendChild(cardIngredientItem);
            });

            cardBody.appendChild(cardDescriptionContainer);
            cardDescriptionContainer.appendChild(cardDescriptionText);

            cardsContainer.appendChild(cardContainer);
        });
        return 'Cards Displayed.';
    }
}

export const cardsInstance = new Card();