//Search function using the input and data given to search the fields given in array form
const searchInput = (input, data, fields) => {
    let filteredData = [];
    const regex = new RegExp(input, "i");

    for (const recipe of data) {
        let found = false;
        for (const field of fields) {
            if (regex.test(recipe[field])) {
                found = true;
                break;
            }
            if (field === "ingredients") {
                for (let k = 0; k < recipe.ingredients.length; k++) {
                    const ingredient = recipe.ingredients[k];

                    if (regex.test(ingredient.ingredient)) {
                        found = true;
                    }
                }
            }
        }
        if (found) {
            filteredData.push(recipe);
        }
    }

    return { filteredData };
};

//Function that searches the array of ingredients with the ingredient inputs
const ingredientSearchFn = (input, data) => {
    const regex = new RegExp(input, "i");
    let filteredData = [];

    for (const item of data) {
        if (regex.test(item)) {
            filteredData.push(item);
        }
    }

    return { filteredData };
};

//refreshes all cards using array of data
const refreshCards = (cardData) => {
    const recipeCardsContainer = document.querySelector(".card-container");
    recipeCardsContainer.innerHTML = "";

    const recipeModel = recipeTemplate();

    for (const recipe of cardData) {
        const recipeCard = recipeModel.getRecipeCard(recipe);
        recipeCardsContainer.appendChild(recipeCard);
    }
};

//Refreshes a specific dropdown with the given data
const refreshDropdown = (field, dropdownData) => {
    const dropdownList = document.querySelector("." + field + "-list");
    dropdownList.innerHTML = "";
    const tagModel = tagTemplate();

    for (item of dropdownData) {
        const ListItem = tagModel.getTagListItem(item, field);

        dropdownList.appendChild(ListItem);
    }
};

//Gets all the unique values for a given data and field in the data (ingredients, appliances, ustensils)
const getUniqueEntries = (recipeData, field) => {
    const uniqueValues = new Set();

    switch (field) {
        case "ingredients.ingredient":
            for (const recipe of recipeData) {
                for (const ingredient of recipe.ingredients) {
                    uniqueValues.add(ingredient.ingredient);
                }
            }
            break;
        case "ustensils":
            for (const recipe of recipeData) {
                for (const ustensil of recipe.ustensils) {
                    uniqueValues.add(ustensil);
                }
            }
            break;
        default:
            for (const recipe of recipeData) {
                uniqueValues.add(recipe[field]);
            }
    }

    return Array.from(uniqueValues);
};

//Function that handles a click event on a tag in the dropdown lists, adds the correct UI element and sets up the state
const handleTagSelection = (label, field) => {
    //Creates UI element on click
    const labelTagContainer = document.querySelector(".label-tag-container");
    const tagModel = tagTemplate();

    const labelCard = tagModel.getTagLabel(label);
    labelTagContainer.appendChild(labelCard);

    //Sets up the correct state depending on the kind of dropdown used
};
