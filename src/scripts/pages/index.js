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
    //Fetches the recipe data and the  models with all template
    const recipes = await getRecipes();
    const recipeModel = recipeTemplate();
    const tagModel = tagTemplate();

    //Loads data into context
    context.setRecipeData(recipes);

    //Links context input string to the user input and creates listener that starts acting after 3 letters for search
    const mainSearchInput = document.querySelector(".search-input");
    mainSearchInput.addEventListener("input", function (event) {
        const inputValue = event.target.value;
        const deleteSearch = document.querySelector(".global-delete-button");
        if (inputValue.length >= 3) {
            deleteSearch.style.display = "block";
            context.setSearchInput(inputValue);
        } else {
            deleteSearch.style.display = "none";
            context.setSearchInput("");
        }
    });

    //Sets up listener for ingredient search, acts after 3 letters and resets itself
    const ingredientSearchInput = document.querySelector(".ingredient-input");
    const ingredientDeleteButton = document.querySelector(
        ".ingredient-delete-button"
    );
    //todo youre here
    ingredientSearchInput.addEventListener("input", function (event) {
        const inputValue = event.target.value;
        if (inputValue.length >= 3) {
            //deleteSearch.style.display = "block";
            context.setIngredientSearchInput(inputValue);
            ingredientDeleteButton.style.display = "flex";
        } else {
            //deleteSearch.style.display = "none";
            context.setIngredientSearchInput("");
        }
    });

    //
    const applianceSearchInput = document.querySelector(".appliances-input");
    const appliancesDeleteButton = document.querySelector(
        ".appliances-delete-button"
    );
    applianceSearchInput.addEventListener("input", function (event) {
        const inputValue = event.target.value;
        if (inputValue.length >= 3) {
            //deleteSearch.style.display = "block";
            context.setApplianceSearchInput(inputValue);
            appliancesDeleteButton.style.display = "flex";
        } else {
            //deleteSearch.style.display = "none";
            context.setApplianceSearchInput("");
        }
    });

    //
    const ustensilsSearchInput = document.querySelector(".ustensils-input");
    const ustensilsDeleteButton = document.querySelector(
        ".ustensils-delete-button"
    );
    ustensilsSearchInput.addEventListener("input", function (event) {
        const inputValue = event.target.value;
        if (inputValue.length >= 3) {
            //deleteSearch.style.display = "block";
            context.setUstensilsSearchInput(inputValue);
            ustensilsDeleteButton.style.display = "flex";
        } else {
            //deleteSearch.style.display = "none";
            context.setUstensilsSearchInput("");
        }
    });
};

init();
