const indexContext = (() => {
    let state = {
        recipeData: [],
        cards: [],
        mainSearchInput: "",
        ingredientSearch: "",
        ingredientsLabels: [],
        utensilSearch: "",
        utensilsLabels: [],
        applianceSearch: "",
        applianceLabels: [],
    };

    // Cards interface
    const getCards = () => state.cards;
    const setCards = (newCards) => (state.cards = newCards);

    // main search input interface
    const getSearchInput = () => state.searchInput;
    const setSearchInput = (newSearchInput) =>
        (state.searchInput = newSearchInput);

    //

    return {
        getCards,
        setCards,
        getSearchInput,
        setSearchInput,
    };
})();
