//

const clearMainInput = () => {
    const mainInput = document.querySelector(".global-search-input");
    mainInput.value = "";

    context.setSearchInput("");
    //todo add to context for livesearch
};

//

const clearIngredientInput = () => {
    const ingredientInput = document.querySelector(".ingredient-input");
    ingredientInput.value = "";

    context.setIngredientSearchInput("");
};

//

const clearApplianceInput = () => {
    const applianceInput = document.querySelector(".appliances-input");
    applianceInput.value = "";

    context.setApplianceSearchInput("");
};

//

const clearUstensilInput = () => {
    const ustensilInput = document.querySelector(".ustensils-input");
    ustensilInput.value = "";
    context.setUstensilsSearchInput("");
};
