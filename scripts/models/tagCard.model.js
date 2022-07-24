/* Importation de l'instance ingredientsInstance depuis le fichier ingredients.model.js. */
import { ingredientsInstance } from "../models/ingredients.model.js";
/* Importation de appliancesInstance à partir du fichier appliances.model.js. */
import { appliancesInstance } from "./appliances.model.js";
/* Importation de l'instance cardsInstance depuis le fichier card.model.js. */
import { cardsInstance } from "./card.model.js";
/* Importation de ustensilsInstance depuis le fichier Ustensils.model.js. */
import { ustensilsInstance } from "./Ustensils.model.js";

/* Sélection de l'élément avec la classe des balises sélectionnées. */
const selectedTagsContainer = document.querySelector('.selected-tags');

/* On crée une nouvelle classe appelée TagCard. */
class TagCard {
    /* Une fonction qui est appelée lorsque vous créez une nouvelle instance d'une classe. */
    constructor() {
/* Création d'un tableau vide. */
        this.tagList = [];
/* Appel de la fonction init. */
        this.init();
/* Création d'un tableau vide. */
        this.searchRecipes = [];
    }

/* Une fonction qui est appelée lorsque vous créez une nouvelle instance d'une classe. */
    init = () => {
/* Appel de la fonction displayTags. */
        this.displayTags();

        selectedTagsContainer.addEventListener('click', (event) => {
            console.log()
           /* Vérifier si la cible de l'événement est une image. Si c'est le cas, il obtient le nœud parent du
           image, qui est le div avec la classe de la balise sélectionnée. Il obtient alors le texte
           contenu du premier nœud enfant de la div, qui est la balise p. Il obtient alors le
           deuxième classe de la div, qui est le type de la balise. */
            if (event.target.nodeName === 'IMG') {
                const tagContainer = event.target.parentNode;
                const tagName = tagContainer.childNodes[0].textContent;
                const tagType = tagContainer.classList[1];

                console.log({ tag: tagName, type: tagType });

/* Vérifier si le tagType est égal à ingrédient, appareil ou ustensile. S'il est égal à l'ingrédient,
il supprimera l'étiquette et ajoutera l'ingrédient. S'il est égal à appliance, il supprimera l'étiquette
et ajouter l'appareil. S'il est égal à ustensile, il supprimera l'étiquette et ajoutera l'ustensile. */
                if (tagType === 'ingredient') {
                    this.removeTag(tagName);
                    ingredientsInstance.addIngredient(tagName);
                } else if (tagType === 'appliance') {
                    this.removeTag(tagName);
                    appliancesInstance.addAppliance(tagName);
                } else if (tagType === 'ustensil') {
                    this.removeTag(tagName);
                    ustensilsInstance.addUstensil(tagName);
                }
            }
        })

    }

/* Mise à jour du tableau searchRecipes avec le tableau Recipes. */
    updateSearchRecipes = (recipes) => {
        this.searchRecipes = recipes;
        return this.searchRecipes;
    }

/* Création d'un nouveau div avec la classe de la balise sélectionnée et le type de tag.type. Il crée alors un
nouvelle balise p avec le texte de tag.tag. Il crée ensuite une nouvelle balise img avec le src de
./assets/icons/close-icon.svg et l'alt de ''. Il ajoute ensuite le tagContainer au
sélectionnéTagsContainer. Il ajoute ensuite le tagText au tagContainer. Il s'ajoute alors
le tagDeleteButton au tagContainer. Il renvoie alors 'SelectedTags displayed'.</code> */
    displayTags = () => {
        selectedTagsContainer.innerHTML = '';
        this.tagList.forEach((tag) => {
            const tagContainer = document.createElement('div');
            tagContainer.classList.add('selected-tag');
            tagContainer.classList.add(tag.type);

            const tagText = document.createElement('p');
            tagText.textContent = tag.tag;

            const tagDeleteButton = document.createElement('img');
            tagDeleteButton.setAttribute('src', './assets/icons/close-icon.svg');
            tagDeleteButton.setAttribute('alt', '');

            selectedTagsContainer.appendChild(tagContainer);
            tagContainer.appendChild(tagText);
            tagContainer.appendChild(tagDeleteButton);
        });
        return 'SelectedTags displayed';
    }

/* Ajout d'une balise au tableau tagList. Il appelle ensuite la fonction displayTags. Il crée alors
une variable appelée recettes et en la définissant égale à la fonction getRecipes. Il crée alors un
variable appelée newRecipes et en la définissant égale au tableau searchRecipes. Il filtre alors le
tableau searchRecipes. Il appelle ensuite la fonction de mise à jour et transmet le tableau newRecipes. */
    addTag = (tag) => {
        this.tagList.push(tag);
        this.displayTags();
        const recipes = cardsInstance.getRecipes();
        const newRecipes = this.searchRecipes.length > 0 ? this.searchRecipes.filter((recipe) =>
            tag.type === 'ingredient' ?
                recipe.ingredients.some((ingredient) => ingredient.ingredient === tag.tag)
                : tag.type === 'appliance' ?
                    recipe.appliance === tag.tag :
                    recipe.ustensils.includes(tag.tag)
        ) : recipes.filter((recipe) =>
            tag.type === 'ingredient' ?
                recipe.ingredients.some((ingredient) => ingredient.ingredient === tag.tag)
                : tag.type === 'appliance' ?
                    recipe.appliance === tag.tag :
                    recipe.ustensils.includes(tag.tag)
        )

        cardsInstance.update(newRecipes);
    }
/* Suppression de la balise du tableau tagList. */
    removeTag = (tag) => {
        const index = this.tagList.findIndex((item) => item.tag === tag);

        if (index >= 0) {
            this.tagList.splice(index, 1);
            this.displayTags();
        }
        // cardsInstance.update();
    }

/* Renvoyer le tableau tagList. */
    getTags = () => {
        return this.tagList;
    }
}

/* Exportation de la nouvelle instance de la classe TagCard. */
export const tagCard = new TagCard();