let result='{}';
async function getData() {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=chicken%20meat%20fish%20salad&app_id=f1dc740d&app_key=3ccb371b4e1b48ffdecb96d49d3cb192`
    );
    if (response.ok) {
      result = await response.json();
      console.log(result);
      console.log(result.hits[3].recipe.label);
    } else {
      console.log(`Ошибка: ${response.status}`);
    }
  } catch (err) {
    console.log(err);
  }
}
document.addEventListener("DOMContentLoaded", getData);

const filterDropdowns = document.querySelectorAll(".filter-dropdown");
const filterDropdownButtons = document.querySelectorAll(
  ".filter-dropdown_main"
);

filterDropdowns.forEach((elem) => {
  elem.addEventListener("mouseover", () => {
    elem.querySelector(".dropdown-child").classList.add("dropdown-child_open");
    elem
      .querySelector(".dropdown-child")
      .classList.remove("dropdown-child_closed");
  });
});
filterDropdowns.forEach((elem) => {
  elem.addEventListener("mouseout", () => {
    elem
      .querySelector(".dropdown-child")
      .classList.remove("dropdown-child_open");
    elem
      .querySelector(".dropdown-child")
      .classList.add("dropdown-child_closed");
  });
});

const minCal = document.getElementById("minCal");
const maxCal = document.getElementById("maxCal");

const inputs = document.querySelectorAll("input");

const clearButton = document.querySelector(".clearButton");

const allergyFilter = document.getElementById("allergy__box");
let checkboxesAllergy = [];
const dietFilter = document.getElementById("diet__box");
let checkboxesDiet = [];
const caloriesFilter = document.getElementById("calories__box");
let calories = {
  from: "",
  to: "",
};

allergyFilter.querySelectorAll("input").forEach((input) => {
  input.addEventListener("change", () => {
    checkboxesAllergy = allergyFilter.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    console.log(checkboxesAllergy);
    if (checkboxesAllergy.length == 0) {
      document.getElementById("allergy").classList.add("filter-dropdown_main");
      document
        .getElementById("allergy")
        .classList.remove("filter-dropdown_orange");
    } else {
      document
        .getElementById("allergy")
        .classList.remove("filter-dropdown_main");
      document
        .getElementById("allergy")
        .classList.add("filter-dropdown_orange");
    }
  });
});

dietFilter.querySelectorAll("input").forEach((input) => {
  input.addEventListener("change", () => {
    checkboxesDiet = dietFilter.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    console.log(checkboxesDiet);
    if (checkboxesDiet.length == 0) {
      document.getElementById("diet").classList.add("filter-dropdown_main");
      document
        .getElementById("diet")
        .classList.remove("filter-dropdown_orange");
    } else {
      document.getElementById("diet").classList.remove("filter-dropdown_main");
      document.getElementById("diet").classList.add("filter-dropdown_orange");
    }
  });
});

minCal.addEventListener("change", () => {
  calories.from = minCal.value;
  if (!minCal.value == "") {
    document
      .getElementById("calories")
      .classList.remove("filter-dropdown_main");
    document.getElementById("calories").classList.add("filter-dropdown_orange");
  } else {
    document.getElementById("calories").classList.add("filter-dropdown_main");
    document
      .getElementById("calories")
      .classList.remove("filter-dropdown_orange");
  }
});

maxCal.addEventListener("change", () => {
  calories.to = maxCal.value;
  if (!maxCal.value == "") {
    document
      .getElementById("calories")
      .classList.remove("filter-dropdown_main");
    document.getElementById("calories").classList.add("filter-dropdown_orange");
  } else {
    document.getElementById("calories").classList.add("filter-dropdown_main");
    document
      .getElementById("calories")
      .classList.remove("filter-dropdown_orange");
  }
});

const clearFilters = () => {
  minCal.value = "";
  maxCal.value = "";
  inputs.forEach((input) => {
    input.checked = "";
  });
  filterDropdownButtons.forEach((button) => {
    button.classList.remove("filter-dropdown_orange");
    button.classList.add("filter-dropdown_main");
  });
};

clearButton.addEventListener("click", clearFilters);
