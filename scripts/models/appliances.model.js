import { tagCard } from "./tagCard.model.js";

const tagUstensilsContainer = document.querySelector('.tag-ustensils');
const tagIngredientsContainer = document.querySelector('.tag-ingredients');
const tagAppliancesContainer = document.querySelector('.tag-appliances');
const tagAppliancesList = document.querySelector('.tag-list-appliances');
const applianceListArrow = document.getElementById('applianceListArrow');
const tagListInputAppliance = document.getElementById('tagListInputAppliances');

/* The Appliances class is a class that contains an array of appliances. */
class Appliances {
  /**
   * The constructor function is a special function that is called when a new object is created.
   * @param appliances - an array of strings
   */
  constructor() {
    this.appliances = [];
    this.tempAppliances = [];

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
}

export const appliancesInstance = new Appliances();