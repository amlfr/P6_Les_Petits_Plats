//Fetches and returns the data of all recipes
async function getRecipes() {
    try {
        const recipesData = await import("../../../assets/data/recipes.js");

        return recipesData.default;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
}

async function init() {
    const recipes = await getRecipes();
    console.log(recipes);
}

init();
