import { tagCard } from "./tagCard.model.js";

const tagUstensilsContainer = document.querySelector('.tag-ustensils');
const tagIngredientsContainer = document.querySelector('.tag-ingredients');
const tagAppliancesContainer = document.querySelector('.tag-appliances');
const tagUstensilsList = document.querySelector('.tag-list-ustensils');
const ustensilListArrow = document.getElementById('ustensilListArrow');
const tagListInputUstensil = document.getElementById('tagListInputUstensils');

/* The Ustensils class is a class that contains an array of ustensils. */
class Ustensils {
  /**
   * The constructor function is a special function that is called when a new object is created.
   * @param ustensils - an array of strings
   */
  constructor() {
    this.ustensils = [];
    this.tempUstensils = [];

    this.init();
  }

  init = () => {
    tagListInputUstensil.value = '';

    ustensilListArrow.addEventListener('click', () => {
      this.toggleUstensilsList();
    });

    tagListInputUstensil.addEventListener('input', (event) => {
      if (event.target.value.length > 0) {
        this.toggleUstensilsList(1);
      } else {
        this.toggleUstensilsList(0);
      }
      this.displayUstensilsList(event.target.value);
    });

    tagUstensilsList.addEventListener('click', (event) => {
      if (event.target.classList.contains('tag-list-item')) {
        const item = event.target;
        this.selectTag(item.textContent);
      }
    })
  }

  setupUstensilsList = (ustensils) => {
    this.ustensils = ustensils.sort();
    this.tempUstensils = ustensils.sort();
    this.displayUstensilsList();
    return 'Setup ustensils list';
  }

  addUstensil = (ustensil) => {
    this.ustensils.push(ustensil)
    this.ustensils = this.ustensils.sort();
    this.displayUstensilsList();
    return 'Ustensil added to list';
  }

  selectTag = (tag) => {
    const index = this.ustensils.findIndex((ustensil) => ustensil === tag);

    if (index >= 0) {
      this.ustensils.splice(index, 1);
      tagListInputUstensil.value = '';
      tagCard.addTag({ tag: tag, type: 'ustensil' });
      this.displayUstensilsList();
    }
    return `Tag selectionné : ${tag}`;
  }

  toggleUstensilsList = (status) => {
    const containerClass = tagUstensilsContainer.classList;
    const isClassExists = Boolean(containerClass.contains('tag-open'));

    const open = () => {
      containerClass.add('tag-open');
      tagIngredientsContainer.classList.remove('tag-open');
      tagAppliancesContainer.classList.remove('tag-open');
    }
    const close = () => {
      containerClass.remove('tag-open');
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

  displayUstensilsList = (filter) => {
    tagUstensilsList.innerHTML = '';
    const ustensilsList = [...new Set(this.ustensils)];
    if (!filter) {
      ustensilsList.forEach((ustensil) => {
        const ustensilItemList = document.createElement('li');
        ustensilItemList.classList.add('tag-list-item');
        ustensilItemList.textContent = ustensil;

        tagUstensilsList.appendChild(ustensilItemList);
      });
    } else {
      if (filter.length > 0) {
        if (ustensilsList) {
          ustensilsList.filter((ustensil) => filter.toLowerCase() === ustensil.toLowerCase()).forEach((ustensil) => {
            const ustensilItemList = document.createElement('li');
            ustensilItemList.classList.add('tag-list-item');
            ustensilItemList.textContent = ustensil;

            tagUstensilsList.appendChild(ustensilItemList);
          });
        } else {
          this.displayUstensilsList();
        }
      }

    }
    return 'Ustensil list displayed';
  }

  getUstensils = () => {
    return this.ustensils;
  };

  updateUstentils = (ustensils) => {
    const tags = tagCard.getTags();
    const newUstensilsList = ustensils;

    tags.forEach((tag) => {
      const tagName = tag.tag;
      const index = ustensils.indexOf(tagName);

      if (index >= 0) {
        ustensils.splice(index, 1);
      }
    });

    this.ustensils = newUstensilsList;
    this.displayUstensilsList();
    return this.ustensils;
  }
}

export const ustensilsInstance = new Ustensils();