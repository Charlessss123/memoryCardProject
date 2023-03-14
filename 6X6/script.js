// >>>>>> Objects and variables declaration section >>>>>>

//Create a list that holds all of your cards
// this array should be the same during all the time of a single macth and change only when the player press the btn "restart"
let cardsArray = [
  "fa-anchor",
  "fa-anchor",
  "fa-bicycle",
  "fa-bolt",
  "fa-cube",
  "fa-diamond",
  "fa-diamond",
  "fa-plane",
  "fa-leaf",
  "fa-bomb",
  "fa-leaf",
  "fa-bomb",
  "fa-bolt",
  "fa-bicycle",
  "fa-plane",
  "fa-cube",
  "fa-briefcase",
  "fa-briefcase",
  "fa-btc",
  "fa-btc",
  "fa-building",
  "fa-building",
  "fa-bullhorn",
  "fa-bullhorn",
  "fa-bus",
  "fa-bus",
  "fa-bullseye",
  "fa-bullseye",
  "fa-calendar",
  "fa-calendar",
  "fa-calculator",
  "fa-calculator",
  "fa-camera",
  "fa-camera",
  "fa-car",
  "fa-car",
];

let lock = false;
let firstClick = null,
  secondClick = null;
let li1 = null,
  li2 = null; //element of firstClick and secondClick
let score = document.querySelector("#fin-score");

////////////////// moves    ////////////////////
let moves = 0;
let lastMoves = document.querySelector("#fin-moves");
let lastTime = document.querySelector("#fin-time");
let counter = document.querySelector(".moves");
let matchedCard = 0;
let finalMoves = document.querySelector("#final-moves");
let finalTime = document.querySelector("#final-time");

// star icon variable
const allStars = document.querySelectorAll(".fa-star");
console.log(allStars, "STAR");

//////////////////////   Time      ////////////////////
let time = document.querySelector(".displayTime");
let startGame = 0;
let gameInterval;

/////////////////////////////////////////////////
// end of Game modal
const mordal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
// const btnsOpenModal = document.querySelector(".show-modal");

///////////////////////////////////////////////

let modal = document.querySelector(".pop-up");

const buttonRestart = document.getElementsByClassName("restart");
const buttonNewGame = document.getElementsByClassName("new-game");
const buttonResumeGame = document.getElementsByClassName("resume-game");
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// >>>>>> Functions declaration section >>>>>>

////////// Shuffle function   ///////////
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

///////////  Timer function /////////////////
function timer() {
  let minutes = 0;
  let seconds = 0;
  gameInterval = setInterval(function () {
    seconds = parseInt(seconds, 10) + 1;
    minutes = parseInt(minutes, 10);
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }

    seconds = seconds < 10 ? "0" + seconds : seconds;
    // minutes = minutes < 10 ? "0" + minutes : minutes;

    time.innerHTML = minutes + ":" + seconds;
    lastTime.textContent = time.textContent;
    finalTime.textContent = time.textContent;
    // console.log(time,"hellooooo ");
  }, 1000);
}

function endOfGame() {
  clearInterval(gameInterval);
}

function displaySymbol(el) {
  el.classList.add("open");
  el.classList.add("show");
}

function closeUnmatchedCards() {
  let els = document.getElementsByClassName("unMatch");
  Array.from(els).forEach((el) => {
    el.classList.remove("unMatch");
    el.classList.remove("show");
    el.classList.remove("open");
  });
}

function restartClick() {
  firstClick = null;
  secondClick = null;
}

function changeRating() {
  // console.log(moves)
  if (moves === 5) {
    document.querySelector(".cup-gold").classList.remove("hide");
    return true;
  } else if (moves === 7) {
    allStars[0].classList.add("hide");
    allStars[3].classList.add("hide");
    document.querySelector(".cup-silver").classList.remove("hide");
    document.querySelector(".cup-gold").classList.add("hide");
  } else if (moves === 10) {
    allStars[1].classList.add("hide");
    allStars[4].classList.add("hide");
    document.querySelector(".cup-bronze").classList.remove("hide");
    document.querySelector(".cup-silver").classList.add("hide");
  }
  // console.log(allStars, "are you my stars??!");
}

function movesCounter() {
  moves++;
  counter.innerHTML = moves;
  lastMoves.innerHTML = moves;
  finalMoves.innerHTML = moves;
  // setting rates based on moves
  if (moves <= 10 && moves !== 0) {
    changeRating();
  }
}

function restartValue() {
  // show again stars
  for (let i = 0; i < 3; i++) {
    allStars[i].classList.remove("hide");
  }
  //show again cups
  for (let i = 0; i < 3; i++) {
    allStars[i].classList.remove("hide");
  }

  // empty matched cards variables
  matchedCard = 0;
  startGame = 0;
  moves = 0;
  counter.textContent = 0;
  li1 = null;
  li2 = null;

  // hide the modal
  modal.classList.remove("show");
  modal.classList.add("hide");
}

///////****Game****////////////

// newCard function
const newCard = (cardClass) => {
  // we create a new li element with a class "card"
  let li = document.createElement("li");
  li.classList.add("card");
  // we create a "i" element called icon and we applied to it a "fa" class, then we applied a class form the array of cards
  let icon = document.createElement("i");
  li.appendChild(icon);
  icon.classList.add("fa");
  icon.classList.add(cardClass);
  return li;
};

const pickACard = (card) => {
  card.addEventListener("click", function (e) {
    // we start the time at the first click
    if (startGame === 0) {
      timer();
      startGame++;
    }

    let li = e.currentTarget;
    //   ignore Card if opened already
    if (
      lock ||
      (li.classList.contains("open") && li.classList.contains("show"))
    ) {
      return true;
    }

    let icon = li.getElementsByClassName("fa")[0].className;

    if (firstClick === null && secondClick === null) {
      firstClick = icon;
      li1 = li; // element of firstClick
      console.log("firstClick", firstClick);
    } else if (firstClick !== null && secondClick === null) {
      secondClick = icon;
      li2 = li; // element secondClick
      ///// console.log(secondClick, "secondClick");

      if (firstClick === secondClick) {
        li1.classList.add("match");
        li1.classList.add("true");
        li2.classList.add("match");
        li2.classList.add("true");
        score.textContent += 10;
        matchedCard++;
        if (matchedCard === 18) {
          endOfGame();
          // modal.classList.remove('hide')
          // modal.classList.add('show')
          openModal();
          // mordal.classList.remove('hidden');
          // overlay.classList.remove('hidden');

          const closeModal = function () {
            mordal.classList.add("hidden");
            overlay.classList.add("hidden");
          };

          btnCloseModal.addEventListener("click", closeModal);
          overlay.addEventListener("click", closeModal);
        }

        // console.log('Correct Choice ');
      } else {
        // console.log('Wrong Choice ');
        li1.classList.add("unMatch");
        li2.classList.add("unMatch");
        score.textContent -= 1;
        setTimeout(function () {
          closeUnmatchedCards();
        }, 750);
      }
      movesCounter();
      restartClick();
    }
    displaySymbol(li);
  });
};

function gameStart() {
  // we store in a variable our "ul" element with inside the class "desk" and we store inside it our "li" element, created before.
  // list[0] because one the console appear as an object
  // we restart the variables

  restartValue();
  // we restart the click
  restartClick();
  // // we stop the time
  endOfGame();
  //  we clear the time string
  time.innerHTML = "00:00";
  // we grab all the cards
  let list = document.getElementsByClassName("deck");

  // we empty the current board of cards
  list[0].innerHTML = "";

  // We first shuffle the array of cards
  let cardsShuffled = shuffle(cardsArray);

  for (let card of cardsShuffled) {
    let li = newCard(card);
    list[0].appendChild(li);
  }

  let cards = list[0].getElementsByClassName("card"); //  html collection
  for (let card of cards) {
    pickACard(card);
  }
}

gameStart();

Array.from(buttonRestart).forEach((el) => {
  el.addEventListener("click", function () {
    gameStart();
    modalClose();
    closeModal();
  });
});

// buttonResumeGame.addEventListener("click", function(){
//   modalClose();
// });

// end of Game modal

const openModal = function () {
  mordal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  mordal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// btnsOpenModal.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);

// menu modal  ////////
const menuModal = document.querySelector(".menu-modal");
const openMenuModalbtn = document.querySelector(".menu");
const closeMenuModal = document.querySelector(".close");
const overlayMenu = document.querySelector(".menu-overlay");

const modalOpen = function () {
  overlayMenu.classList.remove("hidden");
  menuModal.classList.remove("hidden");
  console.log("modal opened");
};

const modalClose = function () {
  overlayMenu.classList.add("hidden");
  menuModal.classList.add("hidden");
};
overlayMenu.addEventListener("click", modalClose);

openMenuModalbtn.addEventListener("click", modalOpen);
// closeMenuModal.addEventListener('click',modalClose );
