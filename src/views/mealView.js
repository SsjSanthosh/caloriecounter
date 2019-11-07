import { elements } from "../stuff/base";
export const renderMeal = meal => {
  const markup = `
    <li class="list-group-item" id=${meal.id}>
    <span class="meal-name"
      ><strong> ${meal.meal} - </strong></span
    >
    <span class="meal-calories"><em>${meal.calories} Calories</em></span>
    <div class="float-right icon-div mr-3">
      <i class="fas fa-edit edit mr-3"></i>
      <i class="fas fa-trash-alt delete"></i>
    </div>
  </li>
    `;
  elements.mealList.insertAdjacentHTML("afterbegin", markup);
  elements.calorieInput.value = "";
  elements.mealInput.value = "";
};

export const updateCalories = calories => {
  elements.calcount.textContent = calories;
};

export const clearAll = () => {
  elements.mealList.innerHTML = "";
  elements.calcount.textContent = "0";
  elements.mealInput.focus();
};

export const deleteMeal = id => {
  document.querySelector(`#${id}`).remove();
};

export const goEditMode = () => {
  elements.editBtn.classList.remove("d-none");
  elements.submitBtn.classList.add("d-none");
  elements.clearBtn.classList.add("d-none");
  elements.appstate.innerHTML = "Edit your meal";
};

export const goNormalMode = () => {
  elements.editBtn.classList.add("d-none");
  elements.submitBtn.classList.remove("d-none");
  elements.clearBtn.classList.remove("d-none");
  elements.appstate.innerHTML = "Edit your meal";
};
