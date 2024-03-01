const initialState = {
    recipeData: [],
    currentData: [],
    ingredientsData: [],
    appliancesData: [],
    ustensilsData: [],
    mainSearchInput: "",
    ingredientSearch: "",
    ustensilSearch: "",
    applianceSearch: "",
    selectedIngredients: [],
    selectedAppliances: [],
    selectedUstensils: [],
    cards: [],
};

const context = {
    state: initialState,

    // Full recipe data interface
    getRecipeData: () => context.state.recipeData,
    setRecipeData: (newRecipeData) => {
        context.state.recipeData = newRecipeData;
        context.setCurrentData(newRecipeData);
        context.setIngredientsData(
            getUniqueEntries(newRecipeData, "ingredients.ingredient")
        );
        context.setUstensilsData(getUniqueEntries(newRecipeData, "ustensils"));
        context.setAppliancesData(getUniqueEntries(newRecipeData, "appliance"));
    },

    // Current data interface
    getCurrentData: () => context.state.currentData,
    setCurrentData: (newCurrentData) => {
        context.state.currentData = newCurrentData;
    },

    // Ingredients data interface
    getIngredientsData: () => context.state.ingredientsData,
    setIngredientsData: (newIngredientsData) => {
        context.state.ingredientsData = newIngredientsData;
        refreshDropdown("ingredient", newIngredientsData);
    },

    // Appliances data interface
    getAppliancesData: () => context.state.appliancesData,
    setAppliancesData: (newAppliancesData) => {
        context.state.appliancesData = newAppliancesData;

        refreshDropdown("appliances", newAppliancesData);
    },

    // Ustensils data interface
    getUstensilsData: () => context.state.ustensilsData,
    setUstensilsData: (newUstensilsData) => {
        context.state.ustensilsData = newUstensilsData;
        refreshDropdown("ustensils", newUstensilsData);
    },

    // Cards interface
    getCards: () => context.state.cards,
    setCards: (newCards) => {
        context.state.cards = newCards;
        updateCardsNumber(context);
    },

    // Main search input interface
    getSearchInput: () => context.state.mainSearchInput,
    setSearchInput: (newSearchInput) => {
        context.state.mainSearchInput = newSearchInput;

        const { filteredData } = searchInput(
            newSearchInput,
            context.state.recipeData,
            ["name", "description", "ingredients"]
        );

        refreshCards(filteredData);
        context.setCurrentData(filteredData);
        context.setIngredientsData(
            getUniqueEntries(filteredData, "ingredients.ingredient")
        );
        context.setUstensilsData(getUniqueEntries(filteredData, "ustensils"));
        context.setAppliancesData(getUniqueEntries(filteredData, "appliance"));

        const newAllCards = document.querySelectorAll(".recipe-card");
        context.setCards(newAllCards);
    },

    // Ingredient search input interface
    getIngredientSearchInput: () => context.state.ingredientSearch,
    setIngredientSearchInput: (newIngredientSearchInput) => {
        context.state.ingredientSearch = newIngredientSearchInput;
        const { filteredData } = tagSearchInput(
            newIngredientSearchInput,
            context.state.ingredientsData
        );
        refreshDropdown("ingredient", filteredData);
    },

    // Ustensil search input interface
    getUstensilsSearchInput: () => context.state.ustensilSearch,
    setUstensilsSearchInput: (newUstensilSearchInput) => {
        context.state.ustensilSearch = newUstensilSearchInput;
        const { filteredData } = tagSearchInput(
            newUstensilSearchInput,
            context.state.ustensilsData
        );
        refreshDropdown("ustensils", filteredData);
    },

    // Appliance search input interface
    getApplianceSearchInput: () => context.state.applianceSearch,
    setApplianceSearchInput: (newApplianceSearchInput) => {
        context.state.applianceSearch = newApplianceSearchInput;
        const { filteredData } = tagSearchInput(
            newApplianceSearchInput,
            context.state.appliancesData
        );
        refreshDropdown("appliances", filteredData);
    },

    //selected ingredients tags interface
    getSelectedIngredients: () => context.state.selectedIngredients,
    setSelectedIngredients: (newSelectedIngredients) => {
        context.state.selectedIngredients.push(newSelectedIngredients);
        console.log(context.getSelectedIngredients());
    },
    deleteSelectedIngredients: (targetSelectedIngredient) => {
        const selectedIngredients = context.getSelectedIngredients();
        for (let i = selectedIngredients.length - 1; i >= 0; i--) {
            if (myArray[i] === stringToDelete) {
                myArray.splice(i, 1);
            }
        }
    },
};
