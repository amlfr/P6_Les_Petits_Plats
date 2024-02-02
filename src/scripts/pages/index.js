//Fetches and returns the data of all recipes
const getRecipes = async () => {
    try {
        const recipesData = await import("../../../assets/data/recipes.js");

        return recipesData.default;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
};

const init = async () => {
    const recipes = await getRecipes();
    const recipeModel = recipeTemplate();
    const recipeCardsContainer = document.querySelector("card-container");
    for (const recipe of recipes) {
        const recipeCard = recipeModel.getRecipeCard(recipe);
    }

    console.log(recipes);
};

init();
