/* Importation du module tagCard depuis le fichier tagCard.model.js. */
import { tagCard } from "./tagCard.model.js";

/* Une variable constante qui est assignée à l'élément avec le nom de classe 'tag-ustensils'. */
const tagUstensilsContainer = document.querySelector('.tag-ustensils');
const tagIngredientsContainer = document.querySelector('.tag-ingredients');
const tagAppliancesContainer = document.querySelector('.tag-appliances');
const tagIngredientsList = document.querySelector('.tag-list-ingredients');
const ingredientListArrow = document.getElementById('ingredientListArrow');
const tagListInputIngredient = document.getElementById('tagListInputIngredients');

/* La classe Ingrédients est une classe qui contient un tableau d'ingrédients. */
class Ingredients {
  /**
   * The constructor function is a special function that is called when a new object is created.
   * @param ingredients - an array of strings
   */
/* Une fonction constructeur. C'est une fonction spéciale qui est appelée lorsqu'un nouvel objet est créé. */
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

/* Retourner une chaîne. */
    return 'Menu toggled';
  }

/* Créer un élément de liste et l'ajouter à la baliseIngredientsList. */
  createItem = (ingredient) => {
    const ingredientItemList = document.createElement('li');
    ingredientItemList.classList.add('tag-list-item');
    ingredientItemList.textContent = ingredient;

    tagIngredientsList.appendChild(ingredientItemList);
  }

  displayIngredientsList = (filter) => {
    tagIngredientsList.innerHTML = '';
/* Création d'un nouveau tableau à partir du tableau des ingrédients. */
    const ingredientsList = [...new Set(this.ingredients)];
/* Filtrer la liste des ingrédients. */
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

/* Une méthode getter. Il renvoie la valeur des ingrédients de la propriété. */
  getIngredients = () => {
    return this.ingredients;
  };

/* Mise à jour de la liste des ingrédients. */
  updateIngredients = (ingredients) => {
    const tags = tagCard.getTags();
    const newIngredientsList = ingredients;

/* Parcourez le tableau des balises et vérifiez si la balise se trouve dans le tableau des ingrédients. Si c'est le cas, on le supprime du tableau des ingrédients. */
    tags.forEach((tag) => {
      const tagName = tag.tag;
      const index = ingredients.indexOf(tagName);

/* Suppression de l'étiquette de la liste des ingrédients. */
      if (index >= 0) {
        ingredients.splice(index, 1);
      }
    });

/* Mise à jour de la liste des ingrédients. */
    this.ingredients = newIngredientsList;
    this.displayIngredientsList();
    return this.ingredients;
  }
}

export const ingredientsInstance = new Ingredients();