//Dynamically get the number of cards on screen and put in on the right hand counter
const updateCardsNumber = (context) => {
    const currentCardsNumber = context.getCards().length;
    const counterText = document.querySelector(".recipe-counter-text");
    counterText.textContent = currentCardsNumber + " recettes";
};
