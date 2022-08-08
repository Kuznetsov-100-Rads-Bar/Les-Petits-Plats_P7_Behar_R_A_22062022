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
        this.filteredRecipes = [];
        /* Appel de la fonction init. */
        this.init();
    }

    /* Une fonction qui est appelée lorsque vous créez une nouvelle instance d'une classe. */
    init = () => {
        /* Appel de la fonction displayTags. */
        this.displayTags();

        selectedTagsContainer.addEventListener('click', (event) => {
            // console.log()
            /* Vérifier si la cible de l'événement est une image. Si c'est le cas, il obtient le nœud parent du
            image, qui est le div avec la classe de la balise sélectionnée. Il obtient alors le texte
            contenu du premier nœud enfant de la div, qui est la balise p. Il obtient alors le
            deuxième classe de la div, qui est le type de la balise. */
            if (event.target.nodeName === 'IMG') {
                const tagContainer = event.target.parentNode;
                const tagName = tagContainer.childNodes[0].textContent;
                const tagType = tagContainer.classList[1];

                // console.log({ tag: tagName, type: tagType });

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

        this.filterByTags();
    }
    /* Suppression de la balise du tableau tagList. */
    removeTag = (tag) => {
/* Trouver l'index de la balise dans le tableau tagList. */
        const index = this.tagList.findIndex((item) => item.tag === tag);

/* Suppression de la balise du tableau tagList. */
        if (index >= 0) {
            this.tagList.splice(index, 1);
            this.displayTags();
            this.filterByTags();
        }

        // cardsInstance.update();
    }

    /* Renvoyer le tableau tagList. */
    getTags = () => {
        return this.tagList;
    }

    /* Filtrer les recettes par les tags. */
    /* Renvoie une liste des nouvelles recettes mise à jour en filtrant les ingrédients, appareils, et usenstils grace aux tags selectionnés */
    getUpdatedRecipes = (array) => {
        const updatedRecipes = array.filter((recipe) => {
            return this.tagList.every((tag) => {
                return recipe.ingredients.some((ingredient) => {
                    return ingredient.ingredient === tag.tag;
                }) || recipe.appliance === tag.tag
                    || recipe.ustensils.some((ustensil) => {
                        return ustensil === tag.tag;
                    })
            })
        })
        return updatedRecipes;
    }

    /* Filtrer les recettes par les tags. */
    filterByTags = () => {
        /* Mapper le tableau tagList et renvoyer la balise si le type est égal à l'ingrédient. */
        // const ingredientTags = this.tagList.map((tag) => tag.type === 'ingredient' ? tag.tag : null);
        // const applianceTags = this.tagList.map((tag) => tag.type === 'appliance' ? tag.tag : null);
        // const ustensilTags = this.tagList.map((tag) => tag.type === 'ustensil' ? tag.tag : null);

        /* Création d'un tableau vide. */
        // let tempRecipes = [];


        /* Filtrer les recettes par les ingrédients. */
        // tempRecipes.push(...this.searchRecipes.filter((recipe) => recipe.ingredients.some((ingredient) => ingredientTags === ingredient.ingredient)));
        // /* Filtrer les recettes par les appareils. */
        // tempRecipes.push(...this.searchRecipes.filter((recipe) => applianceTags === recipe.appliance));
        // /* Filtrer les recettes par les ustensiles. */
        // tempRecipes.push(...this.searchRecipes.filter((recipe) => recipe.ustensils.some((ustensil) => ustensilTags === ustensil)));


        /* Suppression des doublons du tableau. */
        // const newRecipes = [...new Set(tempRecipes)];
        // console.log(newRecipes)

        const newRecipes = this.getUpdatedRecipes(this.searchRecipes);


        /* Vérifier si la longueur du tableau est inférieure ou égale à 0. Si c'est le cas, il définit la
        filteredRecipes au tableau newRecipes. Il renvoie ensuite la fonction cardsInstance.update avec la
        tableau searchRecipes. */
        if (newRecipes.length <= 0) {
            this.filteredRecipes = newRecipes;
            return cardsInstance.update(this.searchRecipes);
        }

        /* Renvoyer la fonction cardsInstance.update avec le tableau searchRecipes. */
        return cardsInstance.update(newRecipes);
    }

}

/* Exportation de la nouvelle instance de la classe TagCard. */
export const tagCard = new TagCard();