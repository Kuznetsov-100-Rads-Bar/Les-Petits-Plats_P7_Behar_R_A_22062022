/* Importation du fichier tagCard.model.js. */
import { tagCard } from "./tagCard.model.js";

/* Une variable constante qui est assignée à l'élément DOM avec la classe tag-ustensils. */
const tagUstensilsContainer = document.querySelector('.tag-ustensils');
/* Une variable constante qui est assignée à l'élément DOM avec la classe tag-ingredients. */
const tagIngredientsContainer = document.querySelector('.tag-ingredients');
/* Affectation de l'élément DOM avec la classe tag-appliances à la variable tagAppliancesContainer. */
const tagAppliancesContainer = document.querySelector('.tag-appliances');
/* Une variable constante qui est assignée à l'élément DOM avec la classe tag-list-appliances. */
const tagAppliancesList = document.querySelector('.tag-list-appliances');
/* Obtenir l'élément avec l'id de applianceListArrow. */
const applianceListArrow = document.getElementById('applianceListArrow');
/* Obtenir l'élément avec l'id de tagListInputAppliances. */
const tagListInputAppliance = document.getElementById('tagListInputAppliances');

/* La classe Appliances est une classe qui contient un tableau d'appliances. */
class Appliances {
  /**
   * La fonction constructeur est une fonction spéciale qui est appelée lorsqu'un nouvel objet est créé.
   * @param appliances - an array of strings
   */
  constructor() {
/* Création de deux tableaux vide. */
    this.appliances = [];
    this.tempAppliances = [];

    /* Appel de la fonction init. */
    this.init();
  }

  init = () => {
    tagListInputAppliance.value = '';

    applianceListArrow.addEventListener('click', () => {
      this.toggleAppliancesList();
    });

    tagListInputAppliance.addEventListener('input', (event) => {
      if (event.target.value.length > 0) {
        this.toggleAppliancesList(1);
      } else {
        this.toggleAppliancesList(0);
      }
      this.displayAppliancesList(event.target.value);
    });

    tagAppliancesList.addEventListener('click', (event) => {
      if (event.target.classList.contains('tag-list-item')) {
        const item = event.target;
        this.selectTag(item.textContent);
      }
    })
  }

  setupAppliancesList = (appliances) => {
    this.appliances = appliances.sort();
    this.tempAppliances = appliances.sort();
    this.displayAppliancesList();
    return 'Setup appliances list';
  }

  addAppliance = (appliance) => {
    this.appliances.push(appliance)
    this.appliances = this.appliances.sort();
    this.displayAppliancesList();
    return 'Appliance added to list';
  }

  selectTag = (tag) => {
    const index = this.appliances.findIndex((appliance) => appliance === tag);

    if (index >= 0) {
      this.appliances.splice(index, 1);
      tagListInputAppliance.value = '';
      tagCard.addTag({ tag: tag, type: 'appliance' });
      this.displayAppliancesList();
    }
    return `Tag selectionné : ${tag}`;
  }

  toggleAppliancesList = (status) => {
    const containerClass = tagAppliancesContainer.classList;
    const isClassExists = Boolean(containerClass.contains('tag-open'));

    const open = () => {
      containerClass.add('tag-open');
      tagUstensilsContainer.classList.remove('tag-open');
      tagIngredientsContainer.classList.remove('tag-open');
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

  displayAppliancesList = (filter) => {
    tagAppliancesList.innerHTML = '';
    if (!filter) {
      this.appliances.forEach((appliance) => {
        const applianceItemList = document.createElement('li');
        applianceItemList.classList.add('tag-list-item');
        applianceItemList.textContent = appliance;

        tagAppliancesList.appendChild(applianceItemList);
      });
    } else {
      const filteredList = this.appliances.filter((item) => item.toLowerCase().charAt(0) === filter[0] && item.toLowerCase().includes(filter.toLowerCase()));

      if (filter.length > 0) {
        if (filteredList) {
          filteredList.forEach((appliance) => {
            const applianceItemList = document.createElement('li');
            applianceItemList.classList.add('tag-list-item');
            applianceItemList.textContent = appliance;

            tagAppliancesList.appendChild(applianceItemList);
          });
        } else {
          this.displayAppliancesList();
        }
      }

    }
    return 'Appliance list displayed';
  }

  getAppliances = () => {
    return this.appliances;
  };

  updateAppliances = (appliances) => {
    const tags = tagCard.getTags();
    const newAppliancesList = appliances;

    tags.forEach((tag) => {
      const tagName = tag.tag;
      const index = appliances.indexOf(tagName);

      if (index >= 0) {
        appliances.splice(index, 1);
      }
    });

    this.appliances = newAppliancesList;
    this.displayAppliancesList();
    return this.appliances;
  }
}

export const appliancesInstance = new Appliances();