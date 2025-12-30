const board = document.getElementById("game-board");
const status_text = document.getElementById("status");
const resetButton = document.getElementById("restart");
resetButton.addEventListener("click", resetGame);

let soundEnabled = true;

function toggleSound() {
    soundEnabled = !soundEnabled;
    document.querySelector("button").textContent = soundEnabled ? "🔊" : "🔇";
}

function playWinSound() {
    if (!soundEnabled) return;
    const sound = document.getElementById("winSound");
    sound.currentTime = 0;
    sound.play();
}

const volume = 0.5;
winSound.volume = volume;
flipSound.volume = volume;
matchSound.volume = volume;

const symbols = ["💀", "👽", "👻", "👾", "💀", "👽", "👻", "👾", "🤖"];

let shuflledSymbols = symbols.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;

shuflledSymbols.forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    
     
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${symbol}</div>
            </div>
        

    `;

    card.addEventListener("click", () => {
        playFlipSound(), flipcard(card);
    });

    board.appendChild(card);
});

function flipcard(card) {
    if (lockBoard || card === firstCard) return;

    card.classList.add("flip");

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch =
        firstCard.querySelector(".card-back").textContent ===
        secondCard.querySelector(".card-back").textContent;

    if (isMatch) {
        playMatchSound();
        disableCards();
        matchesFound++;

        if (matchesFound === parseInt(symbols.length / 2)) {
            status_text.textContent = "Congratulations! You've matched all pairs! 🎉";
            resetButton.style.display = "inline-block";
            playWinSound();
            celebrate();
            showWinAnimation();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", () => flipcard(firstCard));
    secondCard.removeEventListener("click", () => flipcard(secondCard));
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function playFlipSound() {
    if (!soundEnabled) return;
    const flip = document.getElementById("flipSound");
    flip.currentTime = 0;
    flip.play();
}

function playMatchSound() {
    if (!soundEnabled) return;
    const match = document.getElementById("matchSound");
    match.play();
}

function celebrate() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
    });
}

function playWinSound() {
    if (!soundEnabled) return;
    const sound = document.getElementById("winSound");
    sound.currentTime = 0; // restart sound if needed
    sound.play();
}

function resetGame() {
    board.innerHTML = "";
    resetButton.style.display = "none";

    shuflledSymbols = symbols.sort(() => Math.random() - 0.5);

    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchesFound = 0;

    status_text.textContent = "Find all matching pairs";

    shuflledSymbols.forEach((symbol) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
    
     
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${symbol}</div>
            </div>
        

    `;

        card.addEventListener("click", () => flipcard(card));

        board.appendChild(card);
    });
}
