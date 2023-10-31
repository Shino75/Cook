const searchBar = document.querySelector("#searchingBar");
const btnSearch = document.querySelector("#search");
const container = document.querySelector(".container");
const divImage = document.querySelector(".image");
const divYoutube = document.querySelector(".youtube");
const divIngredient = document.querySelector(".ingredient");
const divRecipe = document.querySelector(".Recipe");
const footer = document.querySelector(".footer");
const btnChange = document.querySelector(".change");
const btnLike = document.querySelector("#like");
const welcomePage = document.querySelector(".welcome");
const btnStart = document.querySelector("#startButton");
const foodName = document.querySelector(".foodName");

container.style.display = "block";

let myIngredients = [];
let listIngredient = "";

// btnSearch.addEventListener("click", () => {
//   let userInput = searchBar.value;
//   getMealbySearch(userInput);
// });

// const getMealbySearch = async function (search) {
//   const ask = await fetch(
//     `www.themealdb.com/api/json/v1/1/search.php?s=${search}`
//   );
//   const data = await ask.json();
//   const recipeInstruction = data.meals[0].strInstructions;
//   const nameRecipe = data.meals[0].strMeal;
//   const videoYtb = data.meals[0].strYoutube.split("").slice(-11).join("");
//   const image = data.meals[0].strMealThumb;
//   getIngredient(data);
//   getOffUseless(myIngredients);
//   displayFood(recipeInstruction, nameRecipe, videoYtb, listIngredient, image);
// };

const getMeal = async function () {
  const ask = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const data = await ask.json();
  const recipeInstruction = data.meals[0].strInstructions;
  const nameRecipe = data.meals[0].strMeal;
  const videoYtb = data.meals[0].strYoutube.split("").slice(-11).join("");
  const image = data.meals[0].strMealThumb;
  getIngredient(data);
  getOffUseless(myIngredients);
  displayFood(recipeInstruction, nameRecipe, videoYtb, listIngredient, image);
};

function displayFood(recipe, name, Ytb, Ingredient, img) {
  const htmlMain = `<div class="image">
        <img src="${img}" alt="image">
    </div>
    <div class = "foodName"><p>${name}</p></div>
    <div id = "titleIngredient"><p>Ingredients list :</p></div>
    <div class="ingredient"><p>${Ingredient}</p></div>
    <div id = "titleYoutube"><p>YouTube video :</p></div>
    <div class="youtube"><iframe width="235" height="165" src="https://www.youtube.com/embed/${Ytb}" frameborder="0" allowfullscreen></iframe></div>
    <div id = "titleRecipe"><p>Recipe :</p></div>
    <div class="recipe"><p>${recipe}</p></div>`;

  container.innerHTML = "";
  container.style.display = "grid";
  container.insertAdjacentHTML("afterbegin", htmlMain);
}

function getOffUseless(array1) {
  array1 = array1.filter((el) => el.length > 1);
  filteredArray = array1.map((el) => el.join(""));
  listIngredient = filteredArray.toString();
  return listIngredient;
}

function getIngredient(meal) {
  allIngredient = Object.entries(meal.meals[0]).filter((e) =>
    e[0].includes("strIngredient")
  );
  allIngredient.forEach((array) => {
    myIngredients.push(array[1].split(""));
  });
}

btnStart.addEventListener("click", () => {
  getMeal();
});

if (btnChange) {
  btnChange.addEventListener("click", () => {
    container.innerHTML = "";
    getMeal();
  });
}
