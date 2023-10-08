const cards = document.querySelectorAll('.memory__card');

let isCardFlipped = false;
let boardBlocked = false;
let firstCard, secondCard;

const flipCard = (e) => {
   if (boardBlocked) return;

   const target = e.target.parentElement;

   if (target === firstCard) return;

   target.classList.add('flip');

   if (!isCardFlipped) {
      //First click
      isCardFlipped = true;
      firstCard = target;
   } else {
      //Second click
      isCardFlipped = false;
      secondCard = target;
      //Check
      checkFrameworks()
   }
};

checkFrameworks = () => {
   const isEqual = (firstCard.dataset.framework === secondCard.dataset.framework);
   isEqual ? blockCards() : unflipCards();
};

const blockCards = () => {
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard);
};

const unflipCards = () => {
   boardBlocked = true;
   setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
   }, 1000);
};

const resetBoard = () => {
   isCardFlipped = boardBlocked = false;
   firstCard = secondCard = false;
}

cards.forEach(card => {
   //Add eventListener to every card
   card.addEventListener("click", flipCard)
   const randomIndex = Math.floor(Math.random() * cards.length);
   card.style.order = randomIndex;
});
