//Search function using the input and data given
const searchInput = (input, data) => {
    let filteredData = [];
    const regex = new RegExp(input, "i");

    if (input === "") {
        filteredData = data;
        return { filteredData };
    }

    data.forEach((item, index) => {
        const nameFound = regex.test(recipe.name.toLowerCase());
        const descriptionFound = regex.test(recipe.description.toLowerCase());

        if (nameFound || descriptionFound) {
            filteredData.push(recipe);
            return;
        }

        recipe.ingredients.forEach((ingredient) => {
            const ingredientFound = regex.test(
                ingredient.ingredient.toLowerCase()
            );

            if (ingredientFound) {
                filteredData.push(recipe);
                return;
            }
        });
    });

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

    data.forEach((recipe) => {
        if (regex.test(item)) {
            filteredData.push(item);
        }
    });

    return { filteredData };
};

// Function that searches the array of ingredients with the ingredient inputs
const ingredientSearchFn = (inputs, data) => {
    let ingredientFilteredData = new Set();

    if (inputs.length === 0) {
        ingredientFilteredData = data;
        return ingredientFilteredData;
    }

    const targets = [];
    inputs.forEach((input) => {
        const regex = new RegExp(`^${input}$`);
        targets.push(regex);
    });
    data.forEach((recipe) => {
        const matches = [];
        targets.forEach((target) => {
            recipe.ingredients.forEach((ingredient) => {
                if (target.test(ingredient.ingredient)) {
                    matches.push(recipe);
                }
            });
        });
        if (matches.length === targets.length) {
            ingredientFilteredData.add(recipe);
        }
    });

    return ingredientFilteredData;
};

// Function that searches the array of appliances with the appliances inputs
const applianceSearchFn = (inputs, data) => {
    let applianceFilteredData = new Set();

    if (inputs.length === 0) {
        applianceFilteredData = data;
        return applianceFilteredData;
    }

    inputs.forEach((input) => {
        const regex = new RegExp(input, "i");

        data.forEach((recipe) => {
            if (regex.test(recipe.appliance)) {
                applianceFilteredData.add(recipe);
            }
        });
    });

    return applianceFilteredData;
};

// Function that searches the array of ustensils with the ustensil inputs
const ustensilSearchFn = (inputs, data) => {
    let ustensilFilteredData = new Set();

    if (inputs.length === 0) {
        ustensilFilteredData = data;
        return ustensilFilteredData;
    }

    const targets = [];
    inputs.forEach((input) => {
        const regex = new RegExp(`^${input}$`);
        targets.push(regex);
    });
    data.forEach((recipe) => {
        const matches = [];

        targets.forEach((target) => {
            recipe.ustensils.forEach((ustensil) => {
                if (target.test(ustensil)) {
                    matches.push(recipe);
                }
            });
        });

        if (matches.length === targets.length) {
            ustensilFilteredData.add(recipe);
        }
    });

    return ustensilFilteredData;
};

//refreshes all cards using array of data
const refreshCards = (cardData) => {
    const recipeCardsContainer = document.querySelector(".card-container");
    recipeCardsContainer.innerHTML = "";

    const recipeModel = recipeTemplate();

    cardData.forEach((recipe) => {
        const recipeCard = recipeModel.getRecipeCard(recipe);
        recipeCardsContainer.appendChild(recipeCard);
    });
};

//Refreshes a specific dropdown with the given data
const refreshDropdown = (field, dropdownData) => {
    const dropdownList = document.querySelector("." + field + "-list");
    dropdownList.innerHTML = "";
    const tagModel = tagTemplate();

    dropdownData.forEach((item) => {
        const ListItem = tagModel.getTagListItem(item, field);
        dropdownList.appendChild(ListItem);
    });
};

//Gets all the unique values for a given data and field in the data (ingredients, appliances, ustensils)
const getUniqueEntries = (recipeData, field) => {
    const uniqueValues = new Set();

    switch (field) {
        case "ingredients.ingredient":
            recipeData.forEach((recipe) => {
                recipe.ingredients.forEach((ingredient) => {
                    uniqueValues.add(ingredient.ingredient);
                });
            });
            break;
        case "ustensils":
            recipeData.forEach((recipe) => {
                recipe.ustensils.forEach((ustensil) => {
                    uniqueValues.add(ustensil);
                });
            });
            break;
        default:
            recipeData.forEach((recipe) => {
                uniqueValues.add(recipe[field]);
            });
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

            selectedIngredients.forEach((ingredient) => {
                if (ingredient === label) {
                    found = true;
                }
            });

            if (!found) {
                context.setSelectedIngredients(label);
            }

            break;
        case "appliances":
            const selectedAppliances = context.getSelectedAppliances();

            selectedAppliances.forEach((appliance) => {
                if (appliance === label) {
                    found = true;
                }
            });

            if (!found) {
                context.setSelectedAppliances(label);
            }

            break;
        case "ustensils":
            const selectedUstensils = context.getSelectedUstensils();

            selectedUstensils.forEach((ustensil) => {
                if (ustensil === label) {
                    found = true;
                }
            });

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

    refreshCards(ustensilsFilteredData);

    context.setCurrentData(ustensilsFilteredData);
};
