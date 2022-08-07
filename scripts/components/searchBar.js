// const errorMessage = document.getElementById("errorMessage");
/* Importation de la fonction searchAlgo depuis le fichier algo.js. */
import { searchAlgo } from "../algorithms/algo.js";
/* Importation de l'instance cardsInstance depuis le fichier card.model.js. */
import { cardsInstance } from "../models/card.model.js";
import { tagCard } from "../models/tagCard.model.js";

/* Obtenir la valeur du champ de saisie. */
const searchInput = document.getElementById('recipeSearch');

/**
 * Il prend la valeur de l'entrée de recherche et filtre les recettes en fonction de la valeur.
 */
/* Une fonction qui est appelée lorsque l'utilisateur tape dans le champ de recherche. */
/**
 * La fonction searchInputHandler écoute un événement d'entrée sur l'élément searchInput. Quand l'événement
 * est déclenché, il obtient la valeur de l'entrée et la transmet à la fonction searchAlgo. La fonction searchAlgo renvoie un tableau filtré de recettes. Le tableau filtré est ensuite passé au
Le tableau filtré est ensuite transmis à la méthode de mise à jour de l'objet cardsInstance. La méthode update met à jour la propriété des recettes de l'objet cardsInstance
 */
const searchInputHandler = () => {
    /* Obtenir les recettes initiales des cartesInstance. */
    const initialRecipes = cardsInstance.getRecipes('initial');
    /* Obtenir les recettes des cartesInstance. */
    const recipes = cardsInstance.getRecipes();
/* Écoute d'un événement d'entrée sur l'élément searchInput. Lorsque l'événement est déclenché, il obtient le
valeur de l'entrée et la transmet à la fonction searchAlgo. La fonction searchAlgo renvoie un
tableau filtré de recettes. Le tableau filtré est ensuite passé à la méthode de mise à jour du
Objet cardsInstance. La méthode update met à jour la propriété des recettes de l'objet cardsInstance.
</code> */
    searchInput.addEventListener('input', async (event) => {
        const value = event.target.value;

       /* Vérifier si la valeur n'est pas vide et si la longueur de la valeur est supérieure ou égale à 3.
       Si c'est le cas, il appellera la fonction searchAlgo et passera les recettes et la valeur comme arguments.
       La fonction searchAlgo renverra un tableau filtré de recettes. Le tableau filtré est alors
       passé à la méthode de mise à jour de l'objet cardsInstance. La méthode de mise à jour met à jour le
       Propriété de recettes de l'objet cardsInstance. Si la valeur est vide ou la longueur du
       valeur est inférieure à 3, il mettra à jour la propriété recettes de l'objet cardsInstance avec
       les recettes initiales. */
        if (value && value.length >= 3) {
            const filteredRecipes =  searchAlgo(recipes, value);
            if (filteredRecipes.length === 0) {
                tagCard.updateSearchRecipes(filteredRecipes);
                cardsInstance.update(filteredRecipes);
            } else {
                tagCard.updateSearchRecipes(filteredRecipes);
                cardsInstance.update(filteredRecipes);
            }
        } else {
            tagCard.updateSearchRecipes(initialRecipes);
            cardsInstance.update(initialRecipes);
        }
    });
}

/* Exportation de la fonction searchInputHandler. */
export { searchInputHandler };