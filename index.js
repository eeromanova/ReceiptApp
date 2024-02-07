let recipes = []; //для вывода карточек
let checkboxesAllergy = [];
let checkboxesDiet = [];
let calories = {
  from: "",
  to: "",
};

let checkboxesAll = [];
let recipe = [];
const headerInput = document.querySelector(".header__container_input");

const findResipe = document.querySelector(".options_rescipes");

const header = document.querySelector(".header");

const orderRecipes = document.querySelector(".orderRecipes");
let url = `https://api.edamam.com/api/recipes/v2?type=public&dishType=Main%20course&app_id=f1dc740d&app_key=3ccb371b4e1b48ffdecb96d49d3cb192`;

let arr = [];
async function getData() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      recipes = result.hits;
      console.log(recipes);
      console.log(recipes[0].recipe.calories);
      // console.log(result.hits[3].recipe.label);
      setRecipes();
      localStorage.setItem("recipes", JSON.stringify(recipes)); // Сохраняем полученные данные в localStorage
      return result;
    } else {
      console.log(`Ошибка: ${response.status}`);
    }
  } catch (err) {
    console.log(err);
  }
  return recipes;
}
document.addEventListener("DOMContentLoaded", getData);

const filterDropdowns = document.querySelectorAll(".filter-dropdown");
const filtersContainer = document.querySelector(".filter__container");

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

const dietFilter = document.getElementById("diet__box");

const caloriesFilter = document.getElementById("calories__box");

//Полученные данные из API перебрать, каждый элемент добавить вмассив. Поиск существляется совпадением input.value и элементовмассива
const filterContainer = document.querySelector(".filter__container");
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
      let itemDiv = document.createElement("div");
      suggestionsDiv.style.position = "absolute"; // Или 'fixed', в зависимости от вашего макета
      suggestionsDiv.style.zIndex = "9999";
      suggestionsDiv.style.backgroundColor = "#ffab08"; // Пример фона
      suggestionsDiv.style.width = "100%";
      suggestionsDiv.style.marginLeft = "30%";
      itemDiv.textContent = elem;
      itemDiv.onclick = function () {
        headerInput.value = this.textContent;
        suggestionsDiv.remove("itemDiv");
        this.remove();
        // filterContainer.style.display = "flex"; // Обновляем значение поля ввода
      };
      suggestionsDiv.appendChild(itemDiv);
    });

    suggestionsDiv.style.display = "block";
  } else {
    suggestionsDiv.style.display = "none";
    suggestionsDiv.innerHTML = "";
    // filterContainer.style.display = "flex";
  }
}

headerInput.addEventListener("input", handleInputEvent);

const seachRecipeButton = document.querySelector(".header__container_btn");

let requestArr;

const replaceSearch = () => {
  let headerInputValue = headerInput.value.replace("Recipe", "");
  requestArr = [...headerInputValue];
  for (let i = 0; i < requestArr.length; i++) {
    if (requestArr[i] == " ") {
      requestArr[i] = "%20";
    }
  }
  return requestArr;
};

const joinSearchUrl = () => {
  url = `${url}&q=${requestArr.join("")}`;
  return url;
};

const sliceSearchUrl = (x) => {
  let str = `&${x}=${requestArr.join("")}`;
  let n = url.indexOf(str);
  let l = str.length;
  url = `${url.slice(0, n)}${url.slice(n + l)}`;
  return url;
};

const getSearchURL = () => {
  if (!headerInput.value == "") {
    replaceSearch();
    joinSearchUrl();
    getData();
    sliceSearchUrl("q");
  } else {
    getData();
  }
  suggestionsDiv.innerHTML = "";
};

seachRecipeButton.addEventListener("click", () => {
  getSearchURL();
  minCal.value = "";
  maxCal.value = "";
  removeClass("calories");
});
headerInput.addEventListener("keyup", (event) => {
  if (event.code === "Enter" && !headerInput.value == "") {
    getSearchURL();
    minCal.value = "";
    maxCal.value = "";
    removeClass("calories");
  }
});

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

filtersContainer.querySelectorAll(".input").forEach((input) => {
  input.addEventListener("change", () => {
    console.log(headerInput.value);
    replaceSearch();

    if (input.checked) {
      if (
        input.value == "balanced" ||
        input.value == "high-fiber" ||
        input.value == "high-protein" ||
        input.value == "low-carb" ||
        input.value == "low-fat" ||
        input.value == "low-sodium"
      ) {
        joinSearchUrl();
        url = `${url}&diet=${input.value}`;
      } else {
        joinSearchUrl();
        url = `${url}&health=${input.value}`;
      }
      console.log(url);
      getData();
      sliceSearchUrl("q");
      minCal.value = "";
    maxCal.value = "";
    removeClass("calories");
    } else {
      if (
        input.value == "balanced" ||
        input.value == "high-fiber" ||
        input.value == "high-protein" ||
        input.value == "low-carb" ||
        input.value == "low-fat" ||
        input.value == "low-sodium"
      ) {
        console.log(url);
        let str1 = `&diet=${input.value}`;
        let n1 = url.indexOf(str1);
        let l1 = str1.length;
        url = `${url.slice(0, n1)}${url.slice(n1 + l1)}&q=${requestArr.join(
          ""
        )}`;
        console.log(url);
      } else {
        console.log(input.value);
        console.log(url);
        let str = `&health=${input.value}`;
        let n = url.indexOf(str);
        let l = str.length;
        url = `${url.slice(0, n)}${url.slice(n + l)}&q=${requestArr.join("")}`;
        console.log(url);
      }
      console.log(url);
      getData();
      console.log(headerInput.value);
      sliceSearchUrl("q");
    }
  });
});

allergyFilter.querySelectorAll(".input").forEach((input) => {
  input.addEventListener("change", () => {
    checkboxesAllergy = allergyFilter.querySelectorAll(
      "input[type=checkbox]:checked"
    );

    if (!checkboxesAllergy.length == 0) {
      addClass("allergy");
    } else {
      removeClass("allergy");
    }
  });
});

dietFilter.querySelectorAll(".input").forEach((input) => {
  input.addEventListener("change", () => {
    checkboxesDiet = dietFilter.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    console.log(checkboxesDiet);
    if (!checkboxesDiet.length == 0) {
      addClass("diet");
    } else {
      removeClass("diet");
    }
  });
});

const addClass = (x) => {
  document.getElementById(x).classList.add("filter-dropdown_orange");
};

const removeClass = (x) => {
  document.getElementById(x).classList.remove("filter-dropdown_orange");
};

minCal.addEventListener("change", () => {
  calories.from = minCal.value;
  if (!minCal.value == "") {
    addClass("calories");
  } else {
    removeClass("calories");
  }
});

const filterCalMin = () => {
  console.log(minCal.value);
  recipes = recipes.filter((item) => item.recipe.calories > minCal.value);
  console.log(recipes);
  setRecipes();
};

minCal.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    if (!minCal.value == "") {
      filterCalMin();
    } else {
      getData();
    }
  }
});

maxCal.addEventListener("change", () => {
  calories.to = maxCal.value;
  if (!maxCal.value == "") {
    addClass("calories");
  } else {
    removeClass("calories");
  }
});
const filterCalMax = () => {
  recipes = recipes.filter((item) => item.recipe.calories < maxCal.value);
  console.log(recipes);
  setRecipes();
};

maxCal.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    if (!maxCal.value == "") {
      filterCalMax();
    } else {
      getData();
    }
  }
});

const clearFilters = () => {
  minCal.value = "";
  maxCal.value = "";
  inputs.forEach((input) => {
    input.checked = "";
  });
  removeClass("calories");
  removeClass("diet");
  removeClass("allergy");
  if (!headerInput.value == "") {
    replaceSearch();
    url = `https://api.edamam.com/api/recipes/v2?type=public&dishType=Main%20course&app_id=f1dc740d&app_key=3ccb371b4e1b48ffdecb96d49d3cb192&q=${requestArr.join(
      ""
    )}`;
  } else {
    url = `https://api.edamam.com/api/recipes/v2?type=public&dishType=Main%20course&app_id=f1dc740d&app_key=3ccb371b4e1b48ffdecb96d49d3cb192`;
  }
  console.log(url);
  getData();
  sliceSearchUrl("q");
  console.log(url);
};

clearButton.addEventListener("click", clearFilters);
//Получение рецептов

const container = document.querySelector(".container");

const getRecipes = () => {
  return recipes
    .map(
      ({
        recipe: { image },
        recipe: { label },
        recipe: { ingredientLines },
        recipe: { calories },
        recipe: { url },
        recipe: { source },
      }) => {
        return `<div class="card">
      <div>
      <img class="card__img" src="${image}" alt="${label}"/>
      <h2 class="card__title">${label}</h2>
      </div>
      <article class="card__description">
      <p class="card__ingredients">${ingredientLines.length} ingredients</p>
      <p class="card__calories">${Math.round(calories)} calories</p>
      <button class="card__btn">Open recipe</button>
      <a href="${url}" class="card__link" target="_blank">Source: ${source}</a>
      </article>
    </div>`;
      }
    )
    .join("");
};

// Вывод рецептов на интерфейс
const setRecipes = () => {
  container.innerHTML = getRecipes();
  const recipeCards = document.querySelectorAll(".card__btn");
  recipeCards.forEach((recipeCard, index) => {
    recipeCard.addEventListener("click", () => {
      openRecipeDetails(recipes[index]); //Обработчик на .card
    });
  });
};

// Функция для открытия страницы recipepage.html
function openRecipeDetails(recipe) {
  // Сохраняем выбранный рецепт в localStorage
  localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
  // Открываем новую страницу recipepage.html
  window.open("recipepage.html", "_blank");
}
