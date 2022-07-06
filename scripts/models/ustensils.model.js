/* The Ustensils class is a class that contains an array of ustensils. */
export class Ustensils {
  /**
   * The constructor function is a special function that is called when a new object is created.
   * @param ustensils - an array of strings
   */
  constructor(ustensils) {
    this.ustensils = ustensils;
  }

  getUstensils = () => {
    return this.ustensils;
  };
}
