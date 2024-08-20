const display = document.getElementById("display");
const pwrButton = document.getElementById("pwr");
const rstButton = document.getElementById("rst");
const logButton = document.getElementById("log");
const scsButton = document.getElementById("scs");
const rockButton = document.getElementById("rock");
const pprButton = document.getElementById("ppr");

let gameHistory = [];
let moves = ["👊ROCK", "✌️SCiSSORS", "✋PAPER"];

let gameStarted = false;
let powerOn = false;

let timeoutId;

function togglePower() {
    if (display.classList.contains("power_on")) {
        display.classList.remove("power_on");
        display.innerHTML = "";
        gameHistory = [];
        gameStarted = false;
        powerOn = false;
        clearTimeout(timeoutId); 
    } else {
        startGame();
    }
}

function startGame() {
    if (!gameStarted && !powerOn) {
        if (display.classList.contains("history")) {
            display.classList.remove("history");
        }
        display.classList.add("power_on");
        display.innerHTML = "Starting Game";
        timeoutId = setTimeout(() => {
            showStartingText();
            gameStarted = true;
            powerOn = true; 
        }, 3000); 
    }
}

function checkGameStarted() {
    if (!gameStarted) {
        alert("Please turn on the power first!");
        return false;
    }
    return true;
}

const showStartingText = () => {
    display.innerHTML = "Make your move:";
};

const playerPaper = () => {
    if (!checkGameStarted()) return;
    const playerMove = "✋PAPER";
    console.log(playerMove);
    const computerMove = computerMoveHandler();
    getResult(playerMove, computerMove);
};

const playerRock = () => {
    if (!checkGameStarted()) return;
    const playerMove = "👊ROCK";
    console.log(playerMove);
    const computerMove = computerMoveHandler();
    getResult(playerMove, computerMove);
};

const playerSCS = () => {
    if (!checkGameStarted()) return;
    const playerMove = "✌️SCiSSORS";
    console.log(playerMove);
    const computerMove = computerMoveHandler();
    getResult(playerMove, computerMove);
};

function computerMoveHandler() {
    return moves[Math.floor(Math.random() * 3)];
}

function showHistory() {
    if (!checkGameStarted()) return;

    display.classList.add("history");

    let htmlContent = "";
    
    if (gameHistory.length === 0) {
        htmlContent = "No history.";
    } else {
        let startIndex = Math.max(0, gameHistory.length - 5);

        for (let i = startIndex; i < gameHistory.length; i++) {
            htmlContent += gameHistory[i] + "<br>";
        }
    }

    display.innerHTML = htmlContent;

    display.classList.remove("history");
}

function clearReset() {
    if (!powerOn) return; 

    clearTimeout(timeoutId);

    gameHistory = []; 
    gameStarted = false;
    powerOn = false;
    display.innerHTML = "";
    display.classList.remove("history");
    display.classList.remove("power_on");

   
    setTimeout(startGame, 1000);
}

function getResult(playerMove, computerMove) {
    if (playerMove === computerMove) {
        console.log("It's a draw!");
        gameHistory.push("It's a draw");
        display.innerHTML = computerMove + "<br>It's a draw <br> Try again!";
    } else if (
        (playerMove === "✌️SCiSSORS" && computerMove === "✋PAPER") ||
        (playerMove === "✋PAPER" && computerMove === "👊ROCK") ||
        (playerMove === "👊ROCK" && computerMove === "✌️SCiSSORS")
    ) {
        console.log("You win!");
        gameHistory.push("You WIN");
        display.innerHTML = computerMove + "<br>You win!<br> Try again!";
    } else {
        console.log("You lose!");
        gameHistory.push("You LOST.");
        display.innerHTML = computerMove + "<br>You lost! <br> Try again!";
    }
}

pwrButton.addEventListener("click", togglePower);
pprButton.addEventListener("click", playerPaper);
scsButton.addEventListener("click", playerSCS);
rockButton.addEventListener("click", playerRock);
logButton.addEventListener("click", showHistory);
rstButton.addEventListener("click", clearReset);
