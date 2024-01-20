const recipeContainer = document.querySelector(".recipepage-container");
const selectedRecipe = localStorage.getItem("selectedRecipe");
const recipe = JSON.parse(selectedRecipe);

window.addEventListener("load", appendRecipeCard);

// Функция, которая добавляет разметку в контейнер
function appendRecipeCard(recipeContainer, recipe) {
  const cardHtml = createRecipeCard(recipe);
  recipeContainer.innerHTML = cardHtml;
}

// Функция, которая принимает объект рецепта и возвращает строку HTML-разметки
function createRecipeCard(recipe) {
  const { label, image, calories, ingredients, yield, healthLabels, url } =
    recipe;
  const roundedCalories = Math.round(calories);
  const ingredientsList = ingredients
    .map(
      (ingredient) =>
        `<li class="recipepage__ingredients-item">&#127825; ${ingredient.text}</li>`
    )
    .join("");

  const cardHtml = `
<div class="recipepage">
  <img class="recipepage__img" src="${image}" alt="${label}" />
  <div class="recipepage__info">
  <a class="recipepage__title" href="${url}" target="_blank"><h2>${label}</h2></a>
  <h3 class="recipepage__subtitle">Nutrition</h3>
  <div class="recipepage__nutrition">
  <p class="recipepage__nutrition-item"><span>${roundedCalories}</span><br>CALORIES /<br>SERVING</p>
  <p class="recipepage__nutrition-item"><span>${ingredients.length}</span><br>INGREDIENTS</p>
  <p class="recipepage__nutrition-item"><span>${yield}</span><br>YIELDS</p>
  </div>
  <div class="recipepage__info-heal">
                <b>Health label:</b><br>
                ${healthLabels}
            </div>
  
  </div>
  <div class="recipepage__ingredients">
  <h3 class="recipepage__subtitle">Ingredients</h3>
  <ul class="recipepage__ingredients">${ingredientsList}
        </ul>
        </div>
        <a class="recipepage__btn" href="${url}" target="_blank">Open instruction</a>
</div>
`;

  return cardHtml;
}
// // Функция получения данных с API и добавление случайной карточки на страницу(случайной, т.к. пока не решена задача перехода с 1-ой страницы на 2-ую для просмотра подробной информации выбранного рецепта)
// async function fetchRandomRecipeAndRender() {
//   const apiUrl =
//     "https://api.edamam.com/api/recipes/v2?type=public&q=chicken%20meat%20fish%20salad&app_id=f1dc740d&app_key=3ccb371b4e1b48ffdecb96d49d3cb192";

//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     console.log(data);
//     const randomIndex = Math.floor(Math.random() * data.hits.length);
//     const randomRecipe = data.hits[randomIndex].recipe;
//     appendRecipeCard(recipeContainer, randomRecipe);
//   } catch (error) {
//     console.error("Ошибка при получении данных:", error);
//   }
// }

// // Вызываем функцию для получения случайного рецепта и отрисовки карточки
// fetchRandomRecipeAndRender();
