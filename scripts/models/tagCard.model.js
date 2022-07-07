import { ingredientsInstance } from "../models/ingredients.model.js";
import { appliancesInstance } from "./appliances.model.js";
import { ustensilsInstance } from "./Ustensils.model.js";

const selectedTagsContainer = document.querySelector('.selected-tags');

class TagCard {
    constructor() {
        this.tagList = [];
        this.init();
    }

    init = () => {
        this.displayTags();

        selectedTagsContainer.addEventListener('click', (event) => {
            console.log()
            if (event.target.nodeName === 'IMG') {
                const tagContainer = event.target.parentNode;
                const tagName = tagContainer.childNodes[0].textContent;
                const tagType = tagContainer.classList[1];

                console.log({ tag: tagName, type: tagType });

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

    addTag = (tag) => {
        this.tagList.push(tag);
        this.displayTags();
    }
    removeTag = (tag) => {
        const index = this.tagList.findIndex((item) => item.tag === tag);
        console.log(index)
        if (index >= 0) {
            this.tagList.splice(index, 1);
            this.displayTags();
        } 
    }
}

export const tagCard = new TagCard();