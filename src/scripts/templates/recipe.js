const recipeTemplate = () => {
    const getRecipeCard = (recipeData) => {
        const cardWrapper = document.createElement("div");
        cardWrapper.classList.add("recipe-card");

        const coverWrapper = document.createElement("div");
        coverWrapper.classList.add("cover-wrapper");
        cardWrapper.appendChild(coverWrapper);

        const recipePicture = document.createElement("img");
        recipePicture.classList.add("recipe-picture");
        //TODO ADD ALT
        recipePicture.setAttribute("alt", "something");
        recipePicture.setAttribute(
            "src",
            "/assets/images/photos/" + recipeData.image
        );
        coverWrapper.appendChild(recipePicture);

        const timeWrapper = document.createElement("div");
        timeWrapper.classList.add("time-wrapper");
        coverWrapper.appendChild(timeWrapper);

        const timeText = document.createElement("p");
        timeText.textContent = recipeData.time + "min";
        timeWrapper.appendChild(timeText);

        const detailsContainer = document.createElement("div");
        detailsContainer.classList.add("recipe-details-container");
        cardWrapper.appendChild(detailsContainer);

        const recipeHeading = document.createElement("h2");
        recipeHeading.classList.add("recipe-heading");
        recipeHeading.textContent = recipeData.name;
        detailsContainer.appendChild(recipeHeading);

        const descriptionWrapper = document.createElement("div");
        descriptionWrapper.classList.add("recipe-description-wrapper");
        detailsContainer.appendChild(descriptionWrapper);

        const descriptionHeading = document.createElement("h3");
        descriptionHeading.classList.add("recipe-description-heading");
        descriptionHeading.textContent = "Recette".toUpperCase();
        descriptionWrapper.appendChild(descriptionHeading);

        const descriptionText = document.createElement("p");
        descriptionText.classList.add("recipe-description");
        descriptionText.textContent = recipeData.description;
        descriptionWrapper.appendChild(descriptionText);

        const ingredientsWrapper = document.createElement("div");
        ingredientsWrapper.classList.add("recipe-ingredients-wrapper");
        detailsContainer.appendChild(ingredientsWrapper);

        const ingredientsHeading = document.createElement("h3");
        ingredientsHeading.classList.add("recipe-ingredients-heading");
        ingredientsHeading.textContent = "ingredients".toUpperCase();
        ingredientsWrapper.appendChild(ingredientsHeading);

        const ingredientsContainer = document.createElement("div");
        ingredientsContainer.classList.add("recipe-ingredients-container");
        ingredientsWrapper.appendChild(ingredientsContainer);

        recipeData.ingredients.forEach((ingredient) => {
            const ingredientItem = document.createElement("div");
            ingredientItem.classList.add("recipe-ingredient-item");

            const ingredientName = document.createElement("p");
            ingredientName.classList.add("ingredient-name");
            ingredientName.textContent = ingredient.ingredient;
            ingredientItem.appendChild(ingredientName);

            const ingredientMeasurement = document.createElement("p");
            ingredientMeasurement.classList.add("ingredient-quantity");
            ingredientMeasurement.textContent =
                (ingredient.quantity ? ingredient.quantity : "") +
                " " +
                (ingredient.unit ? ingredient.unit : "");
            ingredientItem.appendChild(ingredientMeasurement);

            ingredientsContainer.appendChild(ingredientItem);
        });
        return cardWrapper;
    };

    return { getRecipeCard };
};
