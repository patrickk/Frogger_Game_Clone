var MAX_SPEED = 350;
var MIN_SPEED = 100;
var gameScore = 0;
var playerLife = 5;
var life = document.querySelector("#life");
var score = document.querySelector("#score")
life.innerText = playerLife;
score.innerText = gameScore;


//Class function for enemies
var Enemy = function(x,y,speed) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  /*Y should be between 50 and 230... 50 1st row, 140 2nd, 230 3rd*/
  this.y = y;
  this.speed = Math.floor(Math.random()*(MAX_SPEED - MIN_SPEED + 1))+MIN_SPEED;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x = this.x + (this.speed * dt);
  if (this.x >= 410) {
    this.x = -10;
  }
  this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Check for collisions between bugs and player
//Using the Axis-Aligned Bounding Box algorithm from MDN
//Subtracts life each time player hits enemy
Enemy.prototype.checkCollisions = function() {
    if (this.x < player.x + 50 &&
        this.x + 50 > player.x &&
        this.y < player.y + 50 &&
        this.y+ 50 > player.y) {
          playerLife--;
          life.innerText = playerLife;
          player.resetPosition();
          if (playerLife <= 0) {
            alert("GAME OVER!");
            gameScore = 0;
            score.innerText = gameScore;
            playerLife = 5;
            life.innerText = playerLife;
          }
          document.getElementById("message").innerHTML = "Get wrecked";
        }

};

//Class function for player
var Player = function () {
  this.sprite = "images/char-boy.png"
  this.x = 200;
  this.y = 400;
  /*Player cannot go above y: 400px, x: 410px
    Once player hits y: 0 px, reset game and add to score*/
};

//Updates player position on game
Player.prototype.update = function() {
  //Left this blank and the game still works.. ??
};

//Draws player sprite onto game
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handles input from user, logic ensures player cannot move off screen
//If player gets to end of map, reset game
Player.prototype.handleInput = function (allowedKeys) {
  if (allowedKeys === 'left' && this.x > 0){
    this.x = this.x-101;
  }
  if (allowedKeys === 'right' && this.x <= 399) {
    this.x = this.x+101;
  }
  if (allowedKeys === 'down' && this.y < 400) {
    this.y = this.y+83;
  }
  if (allowedKeys === 'up' && this.y > 0) {
    this.y = this.y-83;
  }
  if (this.y <= 0) {
    document.querySelector("#message").innerHTML = "GOOD JOB!!!!!";
    gameScore += 100;
    score.innerText =  gameScore;
    this.resetPosition();
  }
};

//Player resets to said coordinates if collision or win
Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 400;
};

//Instantiate enemy objects and player object
var allEnemies = [new Enemy(50,50), new Enemy(50,140), new Enemy(50,230), new Enemy(50, 50)];    //[enemy1, enemy2, enemy3];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
