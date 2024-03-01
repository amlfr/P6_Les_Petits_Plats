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
        refreshCards(newCurrentData);
        context.setIngredientsData(
            getUniqueEntries(newCurrentData, "ingredients.ingredient")
        );
        context.setUstensilsData(getUniqueEntries(newCurrentData, "ustensils"));
        context.setAppliancesData(
            getUniqueEntries(newCurrentData, "appliance")
        );

        const newAllCards = document.querySelectorAll(".recipe-card");
        context.setCards(newAllCards);
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

        context.setCurrentData(filteredData);
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
    setSelectedIngredients: (newSelectedIngredients, type = "push") => {
        if (newSelectedIngredients.length === 0) {
            context.setCurrentData(context.state.recipeData);
        } else {
            if (type === "replace") {
                context.state.selectedIngredients = newSelectedIngredients;
            } else {
                context.state.selectedIngredients.push(newSelectedIngredients);
            }

            const ingredientFilteredData = ingredientSearchFn(
                context.state.selectedIngredients,
                context.state.recipeData
            );

            context.setCurrentData(ingredientFilteredData);
            //console.log(context.state.currentData);
        }
    },
    deleteSelectedIngredients: (targetSelectedIngredient) => {
        const selectedIngredients = context.getSelectedIngredients();
        for (let i = selectedIngredients.length - 1; i >= 0; i--) {
            if (selectedIngredients[i] === targetSelectedIngredient) {
                const newIngredients = selectedIngredients.toSpliced(i, 1);
                context.setSelectedIngredients(newIngredients, "replace");
            }
        }
    },

    //selected appliances tags interface
    getSelectedAppliances: () => context.state.selectedAppliances,
    setSelectedAppliances: (newSelectedAppliances) => {
        if (newSelectedAppliances.length === 0) {
            context.setCurrentData(context.state.recipeData);
        } else {
            context.state.selectedAppliances.push(newSelectedAppliances);
            const applianceFilteredData = applianceSearchFn(
                context.state.selectedAppliances,
                context.state.recipeData
            );
            context.setCurrentData(applianceFilteredData);
        }
    },
    deleteSelectedAppliances: (targetSelectedAppliance) => {
        const selectedAppliances = context.getSelectedAppliances();
        for (let i = selectedAppliances.length - 1; i >= 0; i--) {
            if (selectedAppliances[i] === targetSelectedAppliance) {
                selectedAppliances.splice(i, 1);
                context.setSelectedAppliances(selectedAppliances, "replace");
            }
        }
    },

    //selected ustensils tags interface
    getSelectedUstensils: () => context.state.selectedUstensils,
    setSelectedUstensils: (newSelectedUstensils) => {
        if (newSelectedUstensils.length === 0) {
            context.setCurrentData(context.state.recipeData);
        } else {
            context.state.selectedUstensils.push(newSelectedUstensils);
            const ustensilFilteredData = ustensilSearchFn(
                context.state.selectedUstensils,
                context.state.recipeData
            );
            context.setCurrentData(ustensilFilteredData);
        }
    },
    deleteSelectedUstensils: (targetSelectedUstensil) => {
        const selectedUstensils = context.getSelectedUstensils();
        for (let i = selectedUstensils.length - 1; i >= 0; i--) {
            if (selectedUstensils[i] === targetSelectedUstensil) {
                selectedUstensils.splice(i, 1);
                context.setSelectedUstensils(selectedUstensils, "replace");
            }
        }
    },
};
