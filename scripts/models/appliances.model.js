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

  /* Une fonction qui est appelée lorsque la classe est instanciée. */
/* Trier le tableau des appliances puis appeler la fonction displayAppliancesList. */
  setupAppliancesList = (appliances) => {
/* Trier la gamme d'appareils. */
    this.appliances = appliances.sort();
    this.tempAppliances = appliances.sort();
/* Appel de la fonction displayAppliancesList. */
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

  /* Fonction appelée lorsqu'une balise est sélectionnée. Il prend une balise en paramètre. Il trouve alors l'index de la balise dans le tableau appliances. Si l'indice est supérieur ou égal à 0, il supprime le
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

/* A function that is called when the class is instantiated.
Toggle the appliances list then call the displayAppliancesList function. */
  toggleAppliancesList = (status) => {
    const containerClass = tagAppliancesContainer.classList;
    const isClassExists = Boolean(containerClass.contains('tag-open'));

   /**
    * Lorsque l'utilisateur clique sur l'élément avec la classe tag-recipes, la fonction open() est appelée,
    * qui ajoute la classe tag-open à l'élément avec la classe containerClass, et supprime la classe
    * tag-open à partir des éléments avec les classes tag-ustensils et tag-ingredients.
    */
    const open = () => {
/* Ajout de la classe tag-open à la containerClass. */
      containerClass.add('tag-open');
/* Suppression de la classe tag-open de l'élément avec la classe tag-ustensils. */
      tagUstensilsContainer.classList.remove('tag-open');
/* Suppression de la classe tag-open de l'élément avec la classe tag-ingredients. */
      tagIngredientsContainer.classList.remove('tag-open');
    }
   /**
    * Il supprime la classe 'tag-open' de la variable containerClass.
    */
/**
 * Si le statut n'est pas défini, alors vérifiez si la classe existe, si c'est le cas, alors supprimez-la, si ce n'est pas le cas, alors ajoutez-la. Si le statut est défini, alors vérifiez si c'est 1, si c'est le cas, alors ajoutez la classe,
 * si c'est 0, alors supprimez la classe.
 */
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

/* Une fonction qui est appelée lorsque la classe est instanciée. Il prend un filtre en paramètre. Alors
obtient la liste appliances et l'affecte à la variable appliancesList. Ensuite, il crée un nouveau tableau appliancesList  et l'affecte à la variable newAppliancesList. Il parcourt ensuite le
appliancesList et obtient le nom de l'appliance et l'index du nom de l'appliance dans appliancesList
déployer. Si l'indice est supérieur ou égal à 0, il supprime l'appareil de la appliancesList
déployer. Il affecte ensuite le nouveau tableau appliancesList à la variable appliances. Il appelle alors le
fonction displayAppliancesList. Il renvoie ensuite le tableau appliancesList. */
  displayAppliancesList = (filter) => {
    tagAppliancesList.innerHTML = '';
    const appliancesList = [...new Set(this.appliances)];
    if (!filter) {
      appliancesList.forEach((appliance) => {
        const applianceItemList = document.createElement('li');
        applianceItemList.classList.add('tag-list-item');
        applianceItemList.textContent = appliance;

        tagAppliancesList.appendChild(applianceItemList);
      });
    } else {
      if (filter.length > 0) {
      /* Checking if the appliancesList is not empty. If it is not empty, it will filter the
      appliancesList and check if the filter is equal to the appliance. If it is equal, it will
      create a new list item and append it to the tagAppliancesList. */
        if (appliancesList) {
          appliancesList.filter((appliance) => filter.toLowerCase() === appliance.toLowerCase()).forEach((appliance) => {
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

/*Une fonction qui est appelée lorsque la classe est instanciée. Il faut une gamme d'appareils comme un
paramètre. Il obtient ensuite les balises de la tagCard et l'affecte aux balises variables. Alors
crée un nouveau tableau d'appliances et l'affecte à la variable newAppliancesList. Il boucle alors
à travers les balises et obtient le nom de la balise et l'index du nom de la balise dans le tableau d'appliances. Si
l'indice est supérieur ou égal à 0, il supprime la balise du tableau d'appliances. Alors
affecte le nouveau tableau d'appliances à la variable appliances. Il appelle alors la fonction
displayAppliancesList. Il renvoie ensuite le tableau d'appliances. */
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

/* Exportation de la classe Appliances en tant que constante. */
export const appliancesInstance = new Appliances();