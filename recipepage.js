document.addEventListener("DOMContentLoaded", function () {
  const recipeContainer = document.querySelector(".recipepage-container");
  const selectedRecipe = JSON.parse(localStorage.getItem("selectedRecipe"));
  console.log(selectedRecipe);
  const recipeEl = selectedRecipe.recipe;
  console.log(recipeEl);
  appendRecipeCard(recipeContainer, recipeEl);
});
// Функция, которая добавляет разметку в контейнер
function appendRecipeCard(recipeContainer, selectedRecipe) {
  const cardHtml = createRecipeCard(selectedRecipe);
  recipeContainer.innerHTML = cardHtml;
}

// Функция, которая принимает объект рецепта и возвращает строку HTML-разметки
function createRecipeCard(selectedRecipe) {
  const { label, image, calories, ingredients, yield, healthLabels, url } =
    selectedRecipe;
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