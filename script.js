const searchBtn = document.getElementById("search-btn");
const ingredientInput = document.getElementById("ingredient-input");
const recipeContainer = document.getElementById("recipe-container");

const API_KEY = "f7177d0b50124329884a39ef2b8a821e";

async function fetchRecipes(ingredients) {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Clear previous results
        recipeContainer.innerHTML = "";

        // Display recipes with clickable links
        data.forEach(recipe => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");

            // Creating the link to Spoonacular's recipe page
            const recipeLink = `https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}`;

            recipeCard.innerHTML = `
                <a href="${recipeLink}" target="_blank" class="recipe-link">
                    <img src="https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg" alt="${recipe.title}">
                    <h3>${recipe.title}</h3>
                </a>
                <p>Ingredients: ${recipe.usedIngredientCount} used, ${recipe.missedIngredientCount} missing</p>
            `;

            recipeContainer.appendChild(recipeCard);
        });

    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    const ingredients = ingredientInput.value.trim().replace(/\s+/g, ",");
    if (ingredients) {
        fetchRecipes(ingredients);
    } else {
        alert("Please enter some ingredients.");
    }
});
