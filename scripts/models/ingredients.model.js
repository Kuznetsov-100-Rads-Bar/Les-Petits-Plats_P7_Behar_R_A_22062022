import { tagCard } from "./tagCard.model.js";

const tagIngredientsContainer = document.querySelector('.tag-ingredients');
const tagIngredientsList = document.querySelector('.tag-list-ingredients');
const ingredientListArrow = document.getElementById('ingredientListArrow');
const tagListInputIngredient = document.getElementById('tagListInputIngredients');

/* The Ingredients class is a class that contains an array of ingredients. */
class Ingredients {
  /**
   * The constructor function is a special function that is called when a new object is created.
   * @param ingredients - an array of strings
   */
  constructor() {
    this.ingredients = [];
    this.tempIngredients = [];

    this.init();
  }

  init = () => {
    tagListInputIngredient.value = '';

    ingredientListArrow.addEventListener('click', () => {
      this.toggleIngredientsList();
    });

    tagListInputIngredient.addEventListener('input', (event) => {
      if (event.target.value.length > 0) {
        this.toggleIngredientsList(1);
      } else {
        this.toggleIngredientsList(0);
      }
      this.displayIngredientsList(event.target.value);
    });

    tagIngredientsList.addEventListener('click', (event) => {
      if (event.target.classList.contains('tag-list-item')) {
        const item = event.target;
        this.selectTag(item.textContent);
      }
    })
  }

  setupIngredientsList = (ingredients) => {
    this.ingredients = ingredients.sort();
    this.tempIngredients = ingredients.sort();
    this.displayIngredientsList();
    return 'Setup ingredients list';
  }

  addIngredient = (ingredient) => {
    this.ingredients.push(ingredient)
    this.ingredients = this.ingredients.sort();
    this.displayIngredientsList();
    return 'Ingredient added to list';
  }

  selectTag = (tag) => {
    const index = this.ingredients.findIndex((ingredient) => ingredient === tag);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
      tagListInputIngredient.value = '';
      tagCard.addTag({ tag: tag, type: 'ingredient' });
      this.displayIngredientsList();
    }
    return console.log("Tag selectionné :", tag, 'ingredient');
  }

  toggleIngredientsList = (status) => {
    const containerClass = tagIngredientsContainer.classList;
    const isClassExists = Boolean(containerClass.contains('tag-open'));

    const open = () => {
      containerClass.add('tag-open')
    }
    const close = () => {
      containerClass.remove('tag-open')
    }
    if (!status) {
      !isClassExists ? open()
        : close();
    } else if (status && status === 1) {
      open();
    } else if (status && status === 0) {
      close();
    }

    return 'Menu toggled';
  }

  displayIngredientsList = (filter) => {
    tagIngredientsList.innerHTML = '';
    if (!filter) {
      this.ingredients.forEach((ingredient) => {
        const ingredientItemList = document.createElement('li');
        ingredientItemList.classList.add('tag-list-item');
        ingredientItemList.textContent = ingredient;

        tagIngredientsList.appendChild(ingredientItemList);
      });
    } else {
      const filteredList = this.ingredients.filter((item) => item.toLowerCase().charAt(0) === filter[0] && item.toLowerCase().includes(filter.toLowerCase()));

      if (filter.length > 0) {
        if (filteredList) {
          filteredList.forEach((ingredient) => {
            const ingredientItemList = document.createElement('li');
            ingredientItemList.classList.add('tag-list-item');
            ingredientItemList.textContent = ingredient;

            tagIngredientsList.appendChild(ingredientItemList);
          });
        } else {
          this.displayIngredientsList();
        }
      }

    }
    return 'Ingredient list displayed';
  }

  getIngredients = () => {
    return this.ingredients;
  };
}

export const ingredientsInstance = new Ingredients();