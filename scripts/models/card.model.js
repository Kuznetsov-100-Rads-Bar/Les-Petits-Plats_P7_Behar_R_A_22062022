/* Importation de appliancesInstance à partir du fichier appliances.model.js. */
import { appliancesInstance } from "./appliances.model.js";
/* Importation de l'instance ingredientsInstance depuis le fichier ingredients.model.js. */
import { ingredientsInstance } from "./ingredients.model.js";
/* Importation du modèle tagCard à partir du fichier tagCard.model.js. */
import { tagCard } from "./tagCard.model.js";
/* Importation de ustensilsInstance depuis le fichier Ustensils.model.js. */
import { ustensilsInstance } from "./Ustensils.model.js";

/* Sélection de l'élément avec le nom de classe cards-container. */
const cardsContainer = document.querySelector('.cards-container');
/* Sélection de l'élément avec l'id errorMessage. */
const errorMessage = document.getElementById('errorMessage');

/* La classe Card a deux propriétés : initialRecipes et recettes. */
class Card {
    constructor() {
        this.initialRecipes = [];
        this.recipes = [];
    }

    /* Une fonction qui prend un tableau de recettes et définit la propriété initialeRecipes de la classe
    au tableau des recettes. */
    setupInitialRecipes = (recipes) => {
        this.initialRecipes = recipes;
        this.recipes = recipes;
        tagCard.updateSearchRecipes(recipes);
        return 'Card successfully setup';
    }

/* Une fonction qui prend en paramètre isInitial et renvoie la propriété initialeRecipes de la classe
si le paramètre isInitial est égal à la chaîne "initial". Sinon, il renvoie les recettes
propriété de la classe. */
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
/* Pousser les ingrédients, les ustensiles et les appareils dans leurs tableaux respectifs. */
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
/* Pousser les ustensiles dans le tableau tempUstensils. */
            if (recipe.appliance) {
                tempAppliances.push(recipe.appliance);
            }
        });

        /* Création d'un nouveau tableau à partir du tableau tempIngredients, mais uniquement avec des valeurs uniques. */
        const ingredients = [...new Set(tempIngredients)];
        const appliances = [...new Set(tempAppliances)];
        const ustensils = [...new Set(tempUstensils)];

/* Mise à jour de l'instance ingredients avec le tableau ingredients. */
        ingredientsInstance.updateIngredients(ingredients);
/* Mise à jour de appliancesInstance avec le tableau appliances. */
        appliancesInstance.updateAppliances(appliances);
/* Mise à jour de ustensilsInstance avec le tableau ustensils. */
        ustensilsInstance.updateUstentils(ustensils);
/* Vérifier si le tableau des recettes est vide ou non. S'il est vide, il ajoute la classe not-found au cardsContainer et ajoute l'élément errorMessage à l'élément cardsContainer. Si c'est
non vide, il supprime la classe not-found de l'élément cardsContainer. */
        this.display();
        if (this.recipes.length <= 0) {
            cardsContainer.classList.add('not-found');
            errorMessage.style.display = "block";
            cardsContainer.appendChild(errorMessage);
        } else {
            cardsContainer.classList.remove('not-found');
        }

/* Returning the recipes property of the class. */
        return this.recipes;
    }

/* Effacement de l'élément cardsContainer. */
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