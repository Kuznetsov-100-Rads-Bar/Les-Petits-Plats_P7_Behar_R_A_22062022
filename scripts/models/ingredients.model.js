/* The Ingredients class is a class that contains an array of ingredients. */
export class Ingredients {
  /**
   * The constructor function is a special function that is called when a new object is created.
   * @param ingredients - an array of strings
   */
  constructor(ingredients) {
    this.ingredients = ingredients;
  }

  getIngredients = () => {
    return this.ingredients;
  };
}
