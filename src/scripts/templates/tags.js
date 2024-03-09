const tagTemplate = () => {
    const getTagLabel = (tagName, field) => {
        const labelCard = document.createElement("div");
        labelCard.classList.add("label-tag-card");

        const labelText = document.createElement("p");
        labelText.textContent = tagName;
        labelCard.appendChild(labelText);

        const deleteLabelImage = document.createElement("img");
        deleteLabelImage.src = "./assets/images/icons/delete.svg";
        deleteLabelImage.alt = "delete icon";
        deleteLabelImage.classList.add("delete-icon");
        deleteLabelImage.addEventListener("click", () => {
            labelCard.remove();

            switch (field) {
                case "ingredient":
                    context.deleteSelectedIngredients(tagName);
                    break;
                case "appliances":
                    context.deleteSelectedAppliances(tagName);
                    break;
                case "ustensils":
                    context.deleteSelectedUstensils(tagName);
                    break;
                default:
                    break;
            }

            globalSearch(
                context.getRecipeData(),
                context.getSearchInput(),
                context.getSelectedIngredients(),
                context.getSelectedAppliances(),
                context.getSelectedUstensils()
            );
        });

        labelCard.appendChild(deleteLabelImage);

        return labelCard;
    };

    const getTagListItem = (tagName, field) => {
        const listItem = document.createElement("li");
        listItem.textContent = tagName;
        listItem.classList.add("dropdown-list-item");
        listItem.classList.add("ingredient-list-item");
        /* listItem.addEventListener("click", () => {
            const newTag = tagModel.getTagLabel(tagName);
            const tagContainer = document.querySelector(".label-tag-container");
            tagContainer.appendChild(newTag);
            switch (field) {
                case "":
                    break;
                default:
                    break;
            }
        }); */
        listItem.addEventListener("click", () => {
            handleTagSelection(tagName, field);
            globalSearch(
                context.getRecipeData(),
                context.getSearchInput(),
                context.getSelectedIngredients(),
                context.getSelectedAppliances(),
                context.getSelectedUstensils()
            );
        });

        return listItem;
    };
    return { getTagLabel, getTagListItem };
};
