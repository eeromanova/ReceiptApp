async function getData() {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=chicken%20meat%20fish%20salad&app_id=f1dc740d&app_key=3ccb371b4e1b48ffdecb96d49d3cb192`
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      console.log(result.hits[0].recipe.label);
      return result;
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
const dropdownItems = document.querySelectorAll(".dropdown-child");

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
///////////////////////////////////////////////////////////////////////////

//Переменные для работы с input в части header.
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
      itemDiv.onclick = function () {
        headerInput.value = this.textContent; // Обновляем значение поля ввода
      };
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
