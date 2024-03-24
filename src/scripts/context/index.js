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

    // Full recipe data interface called only on loading
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

        const currentMessages = document.querySelectorAll(
            ".search-fail-message"
        );
        for (const failMessage of currentMessages) {
            failMessage.remove();
        }

        context.setIngredientsData(
            getUniqueEntries(newCurrentData, "ingredients.ingredient")
        );
        context.setUstensilsData(getUniqueEntries(newCurrentData, "ustensils"));
        context.setAppliancesData(
            getUniqueEntries(newCurrentData, "appliance")
        );
        refreshCards(newCurrentData);
        const newAllCards = document.querySelectorAll(".recipe-card");
        context.setCards(newAllCards);
        if (newAllCards.length === 0) {
            const currentSearch = context.getSearchInput();

            const failSearchMessage = `Aucune recette ne contient ${currentSearch}, vous pouvez chercher «tarte aux pommes », « poisson », etc.`;
            const cardSection = document.querySelector(".card-section");

            const messageElement = document.createElement("div");
            messageElement.classList.add("search-fail-message");
            messageElement.textContent = failSearchMessage;

            cardSection.appendChild(messageElement);
        }
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
        globalSearch(
            context.getRecipeData(),
            context.getSearchInput(),
            context.getSelectedIngredients(),
            context.getSelectedAppliances(),
            context.getSelectedUstensils()
        );
        //context.setCurrentData(filteredData);
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
            context.setCurrentData(context.getCurrentData());
        } else {
            if (type === "replace") {
                context.state.selectedIngredients = newSelectedIngredients;
            } else {
                context.state.selectedIngredients.push(newSelectedIngredients);
            }
        }
    },
    deleteSelectedIngredients: (targetSelectedIngredient) => {
        const selectedIngredients = context.getSelectedIngredients();
        for (let i = selectedIngredients.length - 1; i >= 0; i--) {
            if (selectedIngredients[i] === targetSelectedIngredient) {
                selectedIngredients.splice(i, 1);
                context.setSelectedIngredients(selectedIngredients, "replace");
            }
        }
    },

    //selected appliances tags interface
    getSelectedAppliances: () => context.state.selectedAppliances,
    setSelectedAppliances: (newSelectedAppliances, type = "push") => {
        if (newSelectedAppliances.length === 0) {
            context.setCurrentData(context.getCurrentData());
        } else {
            if (type === "replace") {
                context.state.selectedAppliances = newSelectedAppliances;
            } else {
                context.state.selectedAppliances.push(newSelectedAppliances);
            }

            //context.setCurrentData(applianceFilteredData);
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
    setSelectedUstensils: (newSelectedUstensils, type = "push") => {
        if (newSelectedUstensils.length === 0) {
            context.setCurrentData(context.getCurrentData());
        } else {
            if (type === "replace") {
                context.state.selectedUstensils = newSelectedUstensils;
            } else {
                context.state.selectedUstensils.push(newSelectedUstensils);
            }

            //context.setCurrentData(ustensilFilteredData);
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
