import { tagCard } from "./tagCard.model.js";

const tagUstensilsContainer = document.querySelector('.tag-ustensils');
const tagIngredientsContainer = document.querySelector('.tag-ingredients');
const tagAppliancesContainer = document.querySelector('.tag-appliances');
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

  /* Une fonction qui est appelée lorsqu'un nouvel objet est créé. */
  init = () => {
    tagListInputIngredient.value = '';

    /* Ajout d'un écouteur d'événement à l'élément ingredientsListArrow. Lorsque l'élément est cliqué, le
    La fonction toggleIngredientsList est appelée. */
    ingredientListArrow.addEventListener('click', () => {
      this.toggleIngredientsList();
      this.displayIngredientsList();
    });

    /* Écoute d'un événement d'entrée sur l'élément tagListInputIngredient. Si la valeur d'entrée est supérieure
    supérieur à 0, il appelle la fonction toggleIngredientsList avec un paramètre de 1. Si la valeur d'entrée est 0,
    il appelle la fonction toggleIngredientsList avec un paramètre de 0. Il appelle ensuite le
    fonction displayIngredientsList avec la valeur d'entrée comme paramètre. */
    tagListInputIngredient.addEventListener('input', (event) => {
      if (event.target.value.length > 0) {
        this.toggleIngredientsList(1);
      } else {
        this.toggleIngredientsList(0);
      }
      this.displayIngredientsList(event.target.value);
    });

    /* Écoute d'un événement de clic sur l'élément tagIngredientsList. Si la cible de l'événement a la classe
    tag-list-item, il appellera la fonction selectTag avec le textContent de la cible de l'événement comme
    paramètre. */
    tagIngredientsList.addEventListener('click', (event) => {
      if (event.target.classList.contains('tag-list-item')) {
        const item = event.target;
        this.selectTag(item.textContent);
      }
    })
  }

  /* Une fonction qui est appelée lorsqu'un nouvel objet est créé. */
  /* Trier le tableau des ingrédients puis appeler la fonction displayIngredientsList(). */
  setupIngredientsList = (ingredients) => {
    /* Trier la gamme d'ingrédients. */
    this.ingredients = ingredients.sort();
    this.tempIngredients = ingredients;
    /* Appel de la fonction displayIngredientsList() et transmission de la valeur du champ de saisie. */
    this.displayIngredientsList();
    /* Retourne une chaîne. */
    return 'Setup ingredients list';
  }

  /* Ajouter un ingrédient au tableau des ingrédients. */
  addIngredient = (ingredient) => {
    /* puis trier le tableau, puis afficher le
    liste des ingrédients. */
    this.ingredients.push(ingredient)
    this.ingredients = this.ingredients.sort();
    this.displayIngredientsList();
    return 'Ingredient added to list';
  }

  /* Une fonction qui est appelée lorsqu'un nouvel objet est créé. */
  selectTag = (tag) => {
    const index = this.ingredients.findIndex((ingredient) => ingredient === tag);

    /* Suppression de l'ingrédient sélectionné de la liste. */
    if (index >= 0) {
      this.ingredients.splice(index, 1);
      tagListInputIngredient.value = '';
      tagCard.addTag({ tag: tag, type: 'ingredient' });
      this.displayIngredientsList();
    }
    return `Tag selectionné : ${tag}`;
  }

  toggleIngredientsList = (status) => {
    const containerClass = tagIngredientsContainer.classList;
    const isClassExists = Boolean(containerClass.contains('tag-open'));

    /**
     * Lorsque l'utilisateur clique sur le bouton 'ustensiles', le conteneur 'ustensiles' s'ouvre et le
     * le conteneur 'appareils' se fermera. */
    const open = () => {
      containerClass.add('tag-open');
      tagUstensilsContainer.classList.remove('tag-open');
      tagAppliancesContainer.classList.remove('tag-open');
    }

    /* Il supprime la classe 'tag-open' de la variable containerClass */
    const close = () => {
      containerClass.remove('tag-open');
    }
    /* A ternary operator. */
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

  createItem = (ingredient) => {
    const ingredientItemList = document.createElement('li');
    ingredientItemList.classList.add('tag-list-item');
    ingredientItemList.textContent = ingredient;

    tagIngredientsList.appendChild(ingredientItemList);
  }

  displayIngredientsList = (filter) => {
    tagIngredientsList.innerHTML = '';
    const ingredientsList = [...new Set(this.ingredients)];
    if (filter) {
      if (!ingredientsList.find((ingredient) => ingredient.toLowerCase().includes(filter.toLowerCase()))) {
        ingredientsList.forEach((ingredient) => this.createItem(ingredient));
      } else {
        ingredientsList.filter((ingredient) => ingredient.toLowerCase().includes(filter.toLowerCase()))
          .forEach((ingredient) => this.createItem(ingredient));
      }
    } else {
      ingredientsList.forEach((ingredient) => this.createItem(ingredient));
    }

    return 'Ingredient list displayed';
  }

  getIngredients = () => {
    return this.ingredients;
  };

  updateIngredients = (ingredients) => {
    const tags = tagCard.getTags();
    const newIngredientsList = ingredients;

    tags.forEach((tag) => {
      const tagName = tag.tag;
      const index = ingredients.indexOf(tagName);

      if (index >= 0) {
        ingredients.splice(index, 1);
      }
    });

    this.ingredients = newIngredientsList;
    this.displayIngredientsList();
    return this.ingredients;
  }
}

export const ingredientsInstance = new Ingredients();