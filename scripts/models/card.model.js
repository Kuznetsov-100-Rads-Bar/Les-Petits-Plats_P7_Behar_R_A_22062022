const cardsContainer = document.querySelector('.cards-container');

export class Card {
    constructor(recipes) {
        this.initialRecipes = recipes;
        this.recipes = recipes;
    }

    update = (recipes) => {
        if (Array(recipes) && recipes.length > 0) {
            this.recipes = recipes;
        }
        this.display()
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