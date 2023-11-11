function getUserName() {
    let pn = prompt("Введіть своє ім'я:");
    if (pn === null || pn.trim() === "") {
        alert("Введіть ім'я гравця!");
        return getUserName();
    } else {
        return pn;
    }
}
let pn = getUserName();
if (pn !== null) {
    let userName = document.getElementById("userName");
    userName.innerHTML = pn;
    function getRandomScore(min, max) {
        let ranNumber;
        do {
            ranNumber = Math.floor(Math.random() * (max - min + 1) + min);
        } while (ranNumber === 5);
        return ranNumber;
    }
    function getRandomSuit() {
        let suits = ["hearts", "diamonds", "clubs", "spades"];
        return suits[Math.floor(Math.random() * suits.length)];
    }
    function createCardImage(score, suit) {
        let cardImg = document.createElement("img");
        cardImg.src = "img/" + suit + "_" + score + ".png";
        return cardImg;
    }
    let userCards = document.getElementById("userCards");
    let computerCards = document.getElementById("computerCards");
    let rounds = 0;
    let win = document.getElementById("winner");
    let roundsPlay = document.getElementById("roundsPlay");
    function resetGame() {
        rounds = 0;
        win.innerHTML = "";
        document.getElementById("userScore").innerHTML = "";
        document.getElementById("computerScore").innerHTML = "";
        userCards.innerHTML = "";
        computerCards.innerHTML = "";
        roundsPlay.innerHTML = "Спроба " + rounds + " з 3";
        userScore.style.display = "none";
        computerScore.style.display = "none";
    }
    function gameScore() {
        if (rounds < 3) {
            let userScore = getRandomScore(2, 11);
            let computerScore = getRandomScore(2, 11);
            let userSum = +document.getElementById("userScore").innerHTML;
            let computerSum = +document.getElementById("computerScore").innerHTML;
            userSum += userScore;
            computerSum += computerScore;
            document.getElementById("userScore").innerHTML = userSum;
            document.getElementById("computerScore").innerHTML = computerSum;
            userCards.innerHTML = "";
            computerCards.innerHTML = "";
            let userSuit = getRandomSuit();
            let computerSuit = getRandomSuit();
            userCards.appendChild(createCardImage(userScore, userSuit));
            computerCards.appendChild(createCardImage(computerScore, computerSuit));
            rounds++;
            roundsPlay.innerHTML = "Спроба " + rounds + " з 3";
            if (rounds === 3) {
                if (userSum > computerSum) {
                    win.innerHTML = "Переміг " + pn + "!";
                } else if (userSum < computerSum) {
                    win.innerHTML = "Переміг комп'ютер!";
                } else {
                    win.innerHTML = "Нічия!";
                }
            }
        } else {
            resetGame();
        }
    }
    document.getElementById("button").addEventListener("click", function() {
        userScore.style.display = "block";
        computerScore.style.display = "block";
        gameScore();
    });
}