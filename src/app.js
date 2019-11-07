import { elements } from "./stuff/base";
import Meal from "./models/Meal";
import * as mealView from "./views/mealView";
import { type } from "os";

// import mealView from './views/mealView';
const state = {
  meals: [],
  calories: 0
};

// rendering local meals
const renderLocalMeals = () => {
  const meals = JSON.parse(localStorage.getItem("meals"));
  const calories = parseInt(JSON.parse(localStorage.getItem("calories")));
  if (meals) {
    state.meals = meals;
    state.calories = calories;
    state.meals.forEach(el => mealView.renderMeal(el));
    mealView.updateCalories(state.calories);
  }
};
// persist to local storage
const persistMeals = () => {
  localStorage.setItem("meals", JSON.stringify(state.meals));
  localStorage.setItem("calories", JSON.stringify(state.calories));
};

// adding meal controller
const handleMealItem = (meal, calories) => {
  if (meal != "" && calories != null && calories > 0) {
    const item = new Meal(meal, parseInt(calories));
    const newMeal = item.makeMeal();

    state.meals.push(newMeal);
    console.log(typeof state.calories);
    state.calories += newMeal.calories;
    mealView.renderMeal(newMeal);
    mealView.updateCalories(state.calories);
    elements.mealInput.focus();
    persistMeals();
  }
};

// handling one delete
const handleDelete = id => {
  console.log("check this", id);
  for (let i = 0; i < state.meals.length; i++) {
    if (state.meals[i].id === id) {
      state.calories -= parseInt(state.meals[i].calories);
      state.meals.splice(i, 1);
      persistMeals();
      console.log("deleting");
      mealView.updateCalories(state.calories);
      mealView.deleteMeal(id);
    }
  }
};
// handling edit / controller
const handleEdit = id => {
  mealView.goEditMode();
  let meal;
  console.log(id);
  elements.mealInput.focus();
  for (let el of state.meals) {
    if (el.id === id) {
      meal = el;
      break;
    }
  }
  elements.calorieInput.value = meal.calories;
  elements.mealInput.value = meal.meal;
  const completeEdit = e => {
    console.log("gotcha");

    handleMealItem(elements.mealInput.value, elements.calorieInput.value);
    handleDelete(id);
    console.log(id);
    mealView.goNormalMode();
  };
  // adding listener for submitting edit
  elements.editBtn.addEventListener("click", e => {
    completeEdit(e);
  });
  elements.card.addEventListener("keypress", e => {
    if (e.keyCode === 13) {
      completeEdit(e);
      console.log("edit");
    }
  });
};
// clearing all meals
const handleClearAll = () => {
  window.localStorage.clear();
  mealView.clearAll();

  elements.mealInput.focus;
};

// adding event to meal input
elements.submitBtn.addEventListener("click", e => {
  e.preventDefault();

  handleMealItem(elements.mealInput.value, elements.calorieInput.value);
});

// adding event for deleting all meals
elements.clearBtn.addEventListener("click", e => {
  e.preventDefault();
  handleClearAll();
});

// adding event for deleting single meal
elements.mealList.addEventListener("click", e => {
  const id = e.target.parentElement.parentElement.id;
  if (e.target.classList.contains("edit")) {
    handleEdit(id);
    e.target.parentElement.parentElement.classList.add("bg-warning");
    e.target.parentElement.parentElement.style.pointerEvents = "none";
  }
  if (e.target.classList.contains("delete")) {
    handleDelete(id);
  }
});

// handle localstorage rendering of meals
window.addEventListener("load", renderLocalMeals);
