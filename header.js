import { getData } from "./index.js";

let recipe = [];
let headerInput = document.querySelector(".header__container_input");

let findResipe = document.querySelector(".options_rescipes");

let header = document.querySelector(".header");

let orderRecipes = document.querySelector(".orderRecipes");

let arr = [];

//Полученные данные из API перебрать, каждый элемент добавить вмассив. Поиск существляется совпадением input.value и элементовмассива


let filterContainer = document.querySelector(".filter__container");
//let inputValue = headerInput.value;
getData().then((data) => {
  if (data && Array.isArray(data.hits)) {
    data.hits.forEach((hit) => {
      recipe.push(hit.recipe.label);
    });
  }
});

//В данной функции идет проверка input на заполнение. Если он НЕ пустой, то создается div, если пустой, то div удаляется

const suggestionsDiv = document.createElement("div");
header.appendChild(suggestionsDiv);
let filteredRecipes;

function handleInputEvent() {
  let inputValue = headerInput.value; // Получение текущего значения поля ввода

  if (inputValue !== "") {
    suggestionsDiv.innerHTML = ""; // Очищаем предыдущие результаты
    filteredRecipes = recipe.filter((elem) => {
      const reg = new RegExp("^" + inputValue, "gi");
      return reg.test(elem);
    });

    filteredRecipes.forEach((elem) => {
      filterContainer.style.display = "none";
      let itemDiv = document.createElement("div");
      itemDiv.style.marginLeft = "25%";
      itemDiv.style.backgroundColor = "#ffab08";
      itemDiv.textContent = elem;
      console.log(itemDiv);
      itemDiv.onclick = function () {
        headerInput.value = this.textContent; // Обновляем значение поля ввода
        suggestionsDiv.remove("itemDiv");
        filterContainer.style.display = "flex";
      };
      console.log(filteredRecipes);
      suggestionsDiv.appendChild(itemDiv);
    });

    suggestionsDiv.style.display = "block";
  } else {
    suggestionsDiv.style.display = "none";
    suggestionsDiv.innerHTML = "";
    filterContainer.style.display = "flex";
  }
}
headerInput.addEventListener("input", handleInputEvent);
