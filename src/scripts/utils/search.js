//Search function using the input and data given
const searchInput = (input, data) => {
    let filteredData = [];
    const regex = new RegExp(input, "i");

    if (input === "") {
        filteredData = data;
        return { filteredData };
    }

    for (let i = 0; i < data.length; i++) {
        const recipe = data[i];

        const nameFound = regex.test(recipe.name.toLowerCase());
        const descriptionFound = regex.test(recipe.description.toLowerCase());

        if (nameFound || descriptionFound) {
            filteredData.push(recipe);
            continue;
        }

        for (let j = 0; j < recipe.ingredients.length; j++) {
            const ingredient = recipe.ingredients[j];
            const ingredientFound = regex.test(
                ingredient.ingredient.toLowerCase()
            );

            if (ingredientFound) {
                filteredData.push(recipe);
                break;
            }
        }
    }

    return { filteredData };
};

//Function an array of tags with an input
const tagSearchInput = (
    input,
    data
    //fields
) => {
    const regex = new RegExp(input, "i");
    let filteredData = [];

    for (const item of data) {
        if (regex.test(item)) {
            filteredData.push(item);
        }
    }

    return { filteredData };
};

// Function that searches the array of ingredients with the ingredient inputs
const ingredientSearchFn = (inputs, data) => {
    let ingredientFilteredData = new Set();

    if (inputs.length === 0) {
        ingredientFilteredData = data;
        return ingredientFilteredData;
    }

    for (const input of inputs) {
        const regex = new RegExp(input, "i");
        for (const recipe of data) {
            for (const ingredient of recipe.ingredients) {
                if (regex.test(ingredient.ingredient)) {
                    ingredientFilteredData.add(recipe);
                }
            }
        }
    }

    return ingredientFilteredData;
};

// Function that searches the array of appliances with the appliances inputs
const applianceSearchFn = (inputs, data) => {
    let applianceFilteredData = new Set();

    if (inputs.length === 0) {
        applianceFilteredData = data;
        return applianceFilteredData;
    }

    for (const input of inputs) {
        const regex = new RegExp(input, "i");

        for (const recipe of data) {
            if (regex.test(recipe.appliance)) {
                applianceFilteredData.add(recipe);
            }
        }
    }

    return applianceFilteredData;
};

// Function that searches the array of ustensils with the ustensil inputs
const ustensilSearchFn = (inputs, data) => {
    let ustensilFilteredData = new Set();

    if (inputs.length === 0) {
        ustensilFilteredData = data;
        return ustensilFilteredData;
    }

    for (const input of inputs) {
        const regex = new RegExp(input, "i");

        for (const recipe of data) {
            for (const ustensil of recipe.ustensils) {
                if (regex.test(ustensil)) {
                    ustensilFilteredData.add(recipe);
                }
            }
        }
    }

    return ustensilFilteredData;
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
    const tagModel = tagTemplate();
    //Creates UI element on click
    let found = false;
    //Sets up the correct state depending on the kind of dropdown used
    switch (field) {
        case "ingredient":
            const selectedIngredients = context.getSelectedIngredients();

            for (const ingredient of selectedIngredients) {
                if (ingredient === label) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                context.setSelectedIngredients(label);
            }

            break;
        case "appliances":
            const selectedAppliances = context.getSelectedAppliances();

            for (const appliance of selectedAppliances) {
                if (appliance === label) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                context.setSelectedAppliances(label);
            }

            break;
        case "ustensils":
            const selectedUstensils = context.getSelectedUstensils();

            for (const ustensil of selectedUstensils) {
                if (ustensil === label) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                context.setSelectedUstensils(label);
            }

            break;
        default:
            break;
    }
    if (!found) {
        const newTag = tagModel.getTagLabel(label, field);
        const tagContainer = document.querySelector(".label-tag-container");
        tagContainer.appendChild(newTag);
    }
};

//Global search function that runs every search in order and returns an array of data to be displayed

const globalSearch = (
    data,
    mainInput,
    ingredientInputs,
    appliancesInput,
    ustensilsInput
) => {
    const { filteredData } = searchInput(mainInput, data);

    const ingredientsFilteredData = ingredientSearchFn(
        context.getSelectedIngredients(),
        filteredData
    );

    const appliancesFilteredData = applianceSearchFn(
        context.getSelectedAppliances(),
        ingredientsFilteredData
    );

    const ustensilsFilteredData = ustensilSearchFn(
        context.getSelectedUstensils(),
        appliancesFilteredData
    );

    console.log(context.getSelectedIngredients(), "select ingredients");
    console.log(context.getSelectedAppliances(), "select appliances");
    console.log(context.getSelectedUstensils(), "select ustensils");

    refreshCards(ustensilsFilteredData);

    context.setCurrentData(ustensilsFilteredData);
};
