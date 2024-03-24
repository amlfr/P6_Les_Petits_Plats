//Fucntion used to clear the main search input
const clearMainInput = () => {
    const mainInput = document.querySelector(".global-search-input");
    mainInput.value = "";

    context.setSearchInput("");
};

//Fucntion used to clear the ingredient search input
const clearIngredientInput = () => {
    const ingredientInput = document.querySelector(".ingredient-input");
    ingredientInput.value = "";

    context.setIngredientSearchInput("");
};

//Fucntion used to clear the appliances search input
const clearApplianceInput = () => {
    const applianceInput = document.querySelector(".appliances-input");
    applianceInput.value = "";

    context.setApplianceSearchInput("");
};

//Fucntion used to clear the ustensils search input
const clearUstensilInput = () => {
    const ustensilInput = document.querySelector(".ustensils-input");
    ustensilInput.value = "";
    context.setUstensilsSearchInput("");
};
