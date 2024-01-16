let recipes = [];
async function getData() {
  try {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=chicken%20meat%20fish%20salad&app_id=f1dc740d&app_key=3ccb371b4e1b48ffdecb96d49d3cb192`);
    if (response.ok) {
      const result = await response.json();
      recipes = result.hits;
      //console.log(result);
      console.log(result.hits);      
      setRecipes();
    } else {
      console.log(`Ошибка: ${response.status}`);
    }
  } catch (err) {
    console.log(err);
  }
}
document.addEventListener("DOMContentLoaded", getData);

const filterDropdowns=document.querySelectorAll('.filter-dropdown');
const filterDropdownButtons=document.querySelectorAll('.filter-dropdown_main');



filterDropdowns.forEach((elem)=>{
  elem.addEventListener('mouseover', ()=>{
    elem.querySelector('.dropdown-child').classList.add('dropdown-child_open');
    elem.querySelector('.dropdown-child').classList.remove('dropdown-child_closed')
  })
})
filterDropdowns.forEach((elem)=>{
  elem.addEventListener('mouseout', ()=>{
    elem.querySelector('.dropdown-child').classList.remove('dropdown-child_open');
    elem.querySelector('.dropdown-child').classList.add('dropdown-child_closed')
  })
})

const minCal=document.getElementById('minCal');
const maxCal=document.getElementById('maxCal');

minCal.addEventListener('input', ()=>{
  localStorage.setItem('minCal', JSON.stringify(minCal.value));
})
maxCal.addEventListener('input', ()=>{
  localStorage.setItem('maxCal', JSON.stringify(maxCal.value));
})

const clearButton=document.querySelector('.clearButton');

const clearStorage=()=>{
  localStorage.removeItem('maxCal');
  localStorage.removeItem('minCal');
}

clearButton.addEventListener('click', clearStorage);

//Получение рецептов 
const getRecipes = () => {
  return recipes.map(({ recipe: {image}, recipe: {label}, recipe: {ingredientLines}, recipe: {calories}, recipe: {url}, recipe: {source} }) => {
    return `<div class="card">
      <img class="card__img" src="${image}" alt="${label}"/>
      <p class="card__title">${label}</p>
      <p class="card__ingredients">${ingredientLines.length} ingredients</p>
      <p class="card__calories">${Math.round(calories)} calories</p>
      <button class="card__btn">Open recipe</button>
      <div class="card__source"><a href="${url}" class="card__link">Source: ${source}</a>
      </div>
    </div>`;
  }).join("");
}

const container = document.querySelector('.container');

//Вывод рецептов на интерфейс
const setRecipes = () => {
  container.innerHTML = getRecipes();
};

