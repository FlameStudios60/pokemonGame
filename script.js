//===================game variables==============================
const grass_class = 'grass',
    grass_count = 50;
const ball_class = 'pokeball',
    ball_count = 5;

var score = 0;
var views = document.getElementById('sc');

const PLAYER = document.querySelector(".player");

const PLAYER_SPEED = 1.8;

let playerPos = {
    x: 0,
    y: 0,
};
let playerVel = {
    x: 0,
    y: 0,
}

const PLAYER_START_POS = {
    x:window.innerWidth / 2,
    y:window.innerHeight / 2,
}

const SOUND = new Audio("assets/coin.mp3");
//*********************************************** */

var mPx = PLAYER.style.left;
var mPy = PLAYER.style.top;
var mPw = PLAYER.style.width;
var mPh = PLAYER.style.height;

var mBx = document.querySelector(".pokeball");
var mBy = document.querySelector(".pokeball");
var mBw = document.querySelector(".pokeball");
var mBh = document.querySelector(".pokeball");

//===================game functions==============================
function start(){
    randomElements(grass_class,grass_count);
    randomElements(ball_class,ball_count);

    playerPos = PLAYER_START_POS;
}

function update(){
    playerPos.x += playerVel.x;
    playerPos.y += playerVel.y;
    PLAYER.style.left= playerPos.x + 'px';
    PLAYER.style.top= playerPos.y + 'px';

    checkCollisions();
    //Collisions(mPx,mPy,mPw,mPh,mBx,mBy,mBw,mBh);

    requestAnimationFrame(update);
}


//===================game controles===============================
window.addEventListener('keydown',(e)=>{
    if (e.key == "ArrowUp") {
        playerVel.y = -1 * PLAYER_SPEED;
        PLAYER.style.backgroundImage = "url('assets/player_front.png')";
    }
    if (e.key == "ArrowDown") {
        playerVel.y = 1 * PLAYER_SPEED;
        PLAYER.style.backgroundImage = "url('assets/player_back.png')";
    }
    if (e.key == "ArrowLeft") {
        playerVel.x = -1 * PLAYER_SPEED;
        PLAYER.style.backgroundImage = "url('assets/player_left.png')";
    }
    if (e.key == "ArrowRight") {
        playerVel.x = 1 * PLAYER_SPEED;
        PLAYER.style.backgroundImage = "url('assets/player_right.png')";
    }
    PLAYER.classList.add("walk");
});

window.addEventListener('keyup',e=>{
    playerVel.x = 0;
    playerVel.y = 0;

    PLAYER.classList.remove("walk");
});

function randomElements(classname , ecount){
    for (let i = 0; i < ecount; i++) {
        const newElement = document.createElement('div');
        newElement.classList.add(classname);
        newElement.style.left= Math.random() * 100 + '%';
        newElement.style.top= Math.random() * 100 + '%';
        document.body.appendChild(newElement);
    }
}

/*function Collisions(Px,Py,Pw,Ph,Bx,By,Bw,Bh){
    if (Px < Bx + Bw &&
        Px + Pw > Bx &&
        Py < By + Bh &&
        Py + Ph > By
    ){
        console.log("Collision.........");
        ball.style.left = Math.random() * 100 + "%";
        ball.style.top = Math.random() * 100 + "%";
        SOUND.play();
    }
    else{
        
    }
}*/

function checkCollisions(){
    balls = document.querySelectorAll(".pokeball");
    balls.forEach((ball) => {
      if (collision(ball, PLAYER)) {
        console.log("Collision.........");
        ball.style.left = Math.random() * 100 + "%";
        ball.style.top = Math.random() * 100 + "%";
        SOUND.play();
        score++;
        views.innerHTML = score;
      }
    });
}

function collision($div1, $div2){
    var x1 = $div1.getBoundingClientRect().left;
    var y1 = $div1.getBoundingClientRect().top;
    var h1 = $div1.clientHeight;
    var w1 = $div1.clientWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;
  
    var x2 = $div2.getBoundingClientRect().left;
    var y2 = $div2.getBoundingClientRect().top;
    var h2 = $div2.clientHeight;
    var w2 = $div2.clientWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;
  
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}
//===================run the game=================================
start();
update();