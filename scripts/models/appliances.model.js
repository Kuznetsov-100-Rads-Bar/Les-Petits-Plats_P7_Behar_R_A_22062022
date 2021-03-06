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

/* Une fonction qui est appelée lorsque la classe est instanciée. */
/* Configuration de la liste des appareils. */
  init = () => {
    tagListInputAppliance.value = '';

/* Ajout d'un écouteur d'événement à l'élément applianceListArrow. */
    applianceListArrow.addEventListener('click', () => {
      this.toggleAppliancesList();
    });

/* Écoute d'un événement d'entrée sur l'élément tagListInputAppliance. Si la valeur d'entrée est supérieure
supérieur à 0, il appelle la fonction toggleAppliancesList avec un paramètre de 1. Si la valeur d'entrée est inférieure
supérieur ou égal à 0, il appelle la fonction toggleAppliancesList avec un paramètre de 0. Il appelle ensuite
la fonction displayAppliancesList avec la valeur d'entrée en paramètre. */
    tagListInputAppliance.addEventListener('input', (event) => {
      if (event.target.value.length > 0) {
        this.toggleAppliancesList(1);
      } else {
        this.toggleAppliancesList(0);
      }
      this.displayAppliancesList(event.target.value);
    });

/* Écoute d'un événement de clic sur l'élément tagAppliancesList. Si la cible de l'événement a la classe
tag-list-item, il obtiendra le contenu textuel de la cible et le transmettra à la fonction selectTag. */
    tagAppliancesList.addEventListener('click', (event) => {
      if (event.target.classList.contains('tag-list-item')) {
        const item = event.target;
        this.selectTag(item.textContent);
      }
    })
  }

/* A function that is called when the class is instantiated. */
  setupAppliancesList = (appliances) => {
    this.appliances = appliances.sort();
    this.tempAppliances = appliances.sort();
    this.displayAppliancesList();
    return 'Setup appliances list';
  }

/* Ajouter un appareil à la liste. */
  addAppliance = (appliance) => {
    this.appliances.push(appliance)
    this.appliances = this.appliances.sort();
    this.displayAppliancesList();
    return 'Appliance added to list';
  }

/* Fonction appelée lorsqu'une balise est sélectionnée. Il prend une balise en paramètre. Il trouve alors le
index de la balise dans le tableau appliances. Si l'indice est supérieur ou égal à 0, il supprime le
balise du tableau des appareils, efface le champ de saisie, ajoute la balise à la tagCard et affiche le
liste des appareils. Il renvoie ensuite une chaîne avec la balise sélectionnée. */
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