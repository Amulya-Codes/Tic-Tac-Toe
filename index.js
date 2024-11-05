const homepage = document.querySelector(".homepage");
const selectPlayerBtn = document.getElementById('select-player-btn');
const SelectPlayerPage = document.querySelector('.select-player-container');
const gamePage = document.querySelector('.game-container');
const startGameBtn = document.getElementById('start-btn');
const playerImage = document.querySelector('.player-image');
const cells = document.querySelectorAll('.cell');
const xScore = document.querySelector('.x-score');
const oScore = document.querySelector('.o-score');
const resetBtn = document.querySelector('.reset-btn');
const modal = document.querySelector('.modal-container');
const statusEl = document.querySelector('.status');
const quitBtn =  document.querySelector('.quit-btn');
const newGameBtn = document.querySelector('.new-game-btn');
const statusImg = document.querySelector('.status-img');
let playing = false;
const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7],[2,5,8],[0,4,8],[2,4,6]
]

let currentPlayer = "X";
const xPath = './assets/icons/x.svg';
const oPath = './assets/icons/o.svg';

let options = ["", "","", "","", "","", "",""];


selectPlayerBtn.addEventListener('click', function(){
    homepage.style.display = 'none';
    SelectPlayerPage.style.display = 'block';
})

startGameBtn.addEventListener('click', function(){
    homepage.style.display = 'none';
    SelectPlayerPage.style.display = 'none';
    gamePage.style.display = 'block';
})

quitBtn.addEventListener('click', function(){
    homepage.style.display = 'block';
    homepage.style.cssText = 'center';
    SelectPlayerPage.style.display = 'none';
    gamePage.style.display = 'none';
    modal.style.display = 'none';
    document.body.classList.remove('no-scroll');
    resetGame();
    xScore.textContent =0;
    oScore.textContent =0;
})

newGameBtn.addEventListener('click', function(){
    modal.style.display = 'none';
    document.body.classList.remove('no-scroll');
    resetGame();
})


initializeGame();

function initializeGame(){
    playing = true;
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    resetBtn.addEventListener('click', resetGame);
}

function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex');

    if(options[cellIndex] != "" || playing == false){
        return;
    }else {

    }

    updateCell(this, cellIndex);
    updateWinner();
    
}

function updateCell(cell, index){
    options[index]= currentPlayer;
    cell.textContent = "";
    const image=document.createElement('img');
    image.src = currentPlayer === "X"? xPath: oPath;
    image.alt = currentPlayer;
    cell.appendChild(image);
    changePlayer();
}

function changePlayer(){
    currentPlayer = (currentPlayer === "X" ? "O": "X");
    if(currentPlayer === "X"){
        playerImage.src = xPath;
    } else {
        playerImage.src = oPath;
    }
}

function updateWinner(){
let roundWon = false;
let winner
for(let condition of winningConditions){
    const [a,b,c] = condition;
    if(options[a] && options[a] === options[b] && options[a] === options[c]){
        roundWon = true;
        winner =options[a];
        break;
    }
}
if(roundWon){
    playing = false;
    if(winner === "X"){
        xScore.textContent = parseInt(xScore.textContent)+1;
        modal.style.display = 'block';
        document.body.classList.add('no-scroll');
        playing = false;
        statusEl.innerHTML = `<img src='${xPath}' style='width: 50px; display:inline-block; vertical-align: middle'> won this round`;
    } else if(winner === "O") {
        oScore.textContent= parseInt(oScore.textContent)+1;
        modal.style.display = 'block';
        document.body.classList.add('no-scroll');
        playing = false;
        statusEl.innerHTML = `<img src='${oPath}' style='width: 50px; display:inline-block; vertical-align: middle'> won this round`;
    }
   
}
else if(!options.includes("")){
    playing= false;
    modal.style.display = 'block';
    document.body.classList.add('no-scroll');
    statusEl.textContent = 'This game is a tie';
 }


}

function resetGame(){
    options = ["", "","", "","", "","", "",""];
    cells.forEach(cell => cell.textContent = "");
    playing = true;
    currentPlayer = "X";
}
