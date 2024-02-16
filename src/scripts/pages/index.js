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

    //Creates the cards and appends them on the page
    const recipeCardsContainer = document.querySelector(".card-container");
    for (const recipe of recipes) {
        const recipeCard = recipeModel.getRecipeCard(recipe);
        recipeCardsContainer.appendChild(recipeCard);
    }

    //Sets up the created cards in the context
    const allCards = document.querySelectorAll(".recipe-card");
    context.setCards(allCards);

    //Links context input string to the user input and creates listener that starts acting after 3 letters for search
    const mainSearchInput = document.querySelector(".search-input");
    mainSearchInput.addEventListener("input", function (event) {
        const inputValue = event.target.value;
        const deleteSearch = document.querySelector(".delete-input");
        if (inputValue.length >= 3) {
            deleteSearch.style.display = "block";
            context.setSearchInput(inputValue);
            console.log(context.getSearchInput());
        } else {
            deleteSearch.style.display = "none";
        }
    });

    //Placeholder labels to test functionnality
    const labelTagContainer = document.querySelector(".label-tag-container");
    const labelArray = [
        "Coco",
        "Marmite",
        "Fourchette",
        "Verre",
        "Poulet",
        "Citron",
    ];
    for (const label of labelArray) {
        const labelCard = tagModel.getTagLabel(label);
        labelTagContainer.appendChild(labelCard);
    }
};

init();
