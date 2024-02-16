const context = (() => {
    let state = {
        recipeData: [],
        cards: [],
        mainSearchInput: "",
        ingredientSearch: "",
        utensilSearch: "",
        applianceSearch: "",
        labelCards: [],
    };

    // Cards interface
    const getCards = () => state.cards;
    const setCards = (newCards) => {
        state.cards = newCards;
        updateCardsNumber();
    };

    // main search input interface
    const getSearchInput = () => state.searchInput;
    const setSearchInput = (newSearchInput) =>
        (state.searchInput = newSearchInput);

    // ingredient search input interface
    const getIngredientSearchInput = () => state.ingredientSearch;
    const setIngredientSearchInput = (newIngredientSearchInput) =>
        (state.ingredientSearch = newIngredientSearchInput);

    // utensils search input interface

    const getUtensilsSearchInput = () => state.utensilSearch;
    const setUtensilsSearchInput = (newSearchInput) =>
        (state.utensilSearch = newSearchInput);

    // appliance search input interface
    const getApplianceSearchInput = () => state.applianceSearch;
    const setApplianceSearchInput = (newApplianceSearchInput) =>
        (state.applianceSearch = newApplianceSearchInput);

    return {
        getCards,
        setCards,
        getSearchInput,
        setSearchInput,
        getIngredientSearchInput,
        setIngredientSearchInput,
        getUtensilsSearchInput,
        setUtensilsSearchInput,
        getApplianceSearchInput,
        setApplianceSearchInput,
    };
})();
