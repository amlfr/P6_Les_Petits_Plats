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

    const getTagItemList = (tagName) => {
        const listItem = document.createElement("li");
        listItem.textContent = tagName;

        return listItem;
    };
    return { getTagLabel, getTagItemList };
};
