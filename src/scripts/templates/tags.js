const tagTemplate = () => {
    const getTagLabel = (tagName) => {
        const labelCard = document.createElement("div");
        labelCard.classList.add("label-tag-card");

        const labelText = document.createElement("p");
        labelText.textContent = tagName;
        labelCard.appendChild(labelText);

        const deleteLabelImage = document.createElement("img");
        deleteLabelImage.src = "./assets/images/icons/delete.svg";
        deleteLabelImage.alt = "delete icon";
        deleteLabelImage.classList.add("delete-icon");
        deleteLabelImage.addEventListener("click", function () {
            labelCard.remove();
        });
        labelCard.appendChild(deleteLabelImage);

        return labelCard;
    };

    const getTagListItem = (tagName, field) => {
        const tagModel = tagTemplate();
        const listItem = document.createElement("li");
        listItem.textContent = tagName;
        listItem.classList.add("dropdown-list-item");
        listItem.classList.add("ingredient-list-item");
        listItem.addEventListener("click", () => {
            const newTag = tagModel.getTagLabel(tagName);
            const tagContainer = document.querySelector(".label-tag-container");
            tagContainer.appendChild(newTag);
            console.log(field);
        });

        return listItem;
    };
    return { getTagLabel, getTagListItem };
};
