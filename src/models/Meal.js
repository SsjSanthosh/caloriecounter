const uniqid = require("uniqid");
export default class Meal {
  constructor(name, calories) {
    this.name = name;
    this.calories = calories;
  }
  makeMeal() {
    return {
      meal: this.name,
      calories: this.calories,
      id: uniqid()
    };
  }
}
