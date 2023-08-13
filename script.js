// Game description: There'll be a game window, divided into 2 parts. One will be a dashboard and other will be the main screen. On the dash board, there will be 3 sections - find, timer & score. On the screen many bubbles would be shown with numbers written on it. As the player clicks on the correct bubble, the score will get incremented and the player has to score max in the given timeperiod. There will be 50 bubbles on the screen with just one bubble with correct number, as soon as the player clicks the right bubble, the timer will restart. If the player runs out of time, game would be over

// Game variables
let game_timer;
let timer;
let score = 0;
let toFind;

// Game functions
function loadScreen() {
    $(".after-game-over").hide();
    $(".game-window .screen").css("height","80%");
    $(".game-window .dashboard").show();
    $("#score").text(`${score}`);
    toFind = Math.floor(Math.random()*10)+1; 
    $("#find").text(`${toFind}`);
    $(".game-window").show();
    let rand1 = Math.floor(Math.random()*50)+1;
    
    for (let i=1; i<rand1; i++){
        let rand2 = Math.floor(Math.random()*50)+1;
        let toEnter = (rand2!=toFind)?rand2:rand2+1;
        $(".game-window .screen").append(`<div class="bubble">${toEnter}</div>`);
    }

    $(".game-window .screen").append(`<div class="bubble">${toFind}</div>`);

    for (let i=rand1; i<50; i++){
        let rand2 = Math.floor(Math.random()*50)+1;
        let toEnter = (rand2!=toFind)?rand2:rand2-1;
        $(".game-window .screen").append(`<div class="bubble">${toEnter}</div>`);
    }
}

function gameOver() {
    clearInterval(timer);
    $(".bubble").remove();
    $(".after-game-over").css({
        display: "flex"
    });
    $(".game-window .dashboard").hide();
    $(".game-window .screen").css("height","100%");
    $("#gameover").text("GAME OVER");
    $("#final-score").text(`Your Score: ${score}`);
    $("#play-again").text("Return to home");
    $("#play-again").show();
}

function startGame() {
    game_timer = 10;
    $("#timer").text(`${game_timer}`);
    clearInterval(timer);
    timer = setInterval(() => {
        if (game_timer==0){
            gameOver();
            clearInterval(timer);
        }
        else{
            $("#timer").text(`${--game_timer}`);
        }
    }, 1000);
}

// Implementation
$(".welcome-window button").on("click",()=>{
    $(".welcome-window").hide();
    loadScreen();
    startGame();
});

$(".game-window .screen").on("click",(dets)=>{
    let clickedOn = Number(dets.target.textContent);
    if (clickedOn == toFind){
        score += 10;
        toFind = Math.floor(Math.random()*10);
        $(".bubble").remove();
        loadScreen();
        startGame();
    }
    else{
        gameOver();
    }
});

$("#play-again").on("click",()=>{
    $(".welcome-window").show();
    $(".game-window").hide();
});