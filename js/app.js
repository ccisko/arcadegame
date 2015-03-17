var score = 0;
//check score to see if game is over
var checkScore = function(score) {
  endgame = score ;
  if (endgame > 400 ) {
    ctx.font="24px Arial";
    ctx.fillText("GAME OVER", 200, 375);
    ctx.fillText("Press Space to start", 170, 400);
    ctx.fillText(score, 225, 75);
  }
}
// Enemies our player must avoid
var Enemy = function(y) {
  this.x = -100;
  this.y = y;
  this.r = Math.floor(Math.random() * (200 - 10) + 10);
// if enemy is in first 3 rows then bug else girl
  if (this.y < 280) {
    this.sprite = 'images/enemy-bug.png';
  } else {
    this.sprite = 'images/char-pink-girl.png';
  }
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
// setup player  coordinates for collision
  var	strtx = player.x - 60;
  var fnshx = player.x + 60;
  var	strty = player.y - 26;
  var fnshy = player.y + 60;
  if (this.x > strtx  && this.x < fnshx) {
    if (this.y > strty  && this.y < fnshy) {
//if collision reset player position
      player.x = 200;
      player.y = 430;
    }
  }
// check to see if enemy leaves screen
  if (this.x >= 550) {
    this.x = -100;
    this.r = Math.random() * (200 - 10) + 10;
  }
  this.x = this.x+this.r*dt;
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//set up keys
var key = function(x) {
  this.x = x;
  this.y = 55;
  this.sprite = 'images/Key.png';
}
//update keys on screen
key.prototype.update = function() {
//check to see if game is over 
  checkScore(score);
// setup player  coordinates for key capture
  var	strtx = player.x - 60;
  var fnshx = player.x + 60;
// if key not already captured add 100 to score then set z=0
// and send player back to beginning
// if key has already been captured send player back to beginning
  if (player.y < 1 ) {
    if (this.x > strtx  && this.x < fnshx) {
      if (this.z !=0) {
        score = score + 100;
      }
      this.z = 0;
      player.x = 200;
      player.y = 430;
    }
  }
}
// put keys and score on screen and check to see if game is over
key.prototype.render = function() {
  checkScore(score);
  ctx.font="24px Arial";
  ctx.fillText("SCORE  ", 110, 75);
  ctx.fillText(score, 225, 75);
  if (this.z != 0) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,70,75);
  }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
  this.x = 200;
  this.y = 430;
  this.sprite = 'images/char-boy.png';
}
player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x,this.y);
}
player.prototype.update = function() {
}
player.prototype.handleInput = function(d) {
  if (d =="up") {
    if (this.y >=-5 && score < 500) {
      this.y=this.y -3;
    }
  }
  if (d =="down") {
    if (this.y <=431 && score < 500) {
      this.y=this.y +3;
    }
  }
  if (d =="left") {
    if (this.x >=-5 && score < 500) {
      this.x=this.x -3;
    }
  }
  if (d =="right") {
    if (this.x <=410 && score < 500 ) {
      this.x=this.x +3;
    }
  }
  if (d =="space") {
    this.x = 200;
    this.y = 430;
    score =0
    key1.z = 1;
    key2.z = 1;
    key3.z = 1;
    key4.z = 1;
    key5.z = 1;
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var bug1 = new Enemy(60);
var bug3 = new Enemy(143);
var bug5 = new Enemy(226);
var girl1 = new Enemy(310);
var girl3 = new Enemy(392);
var allEnemies = [bug1 ,  bug3, girl1,  bug5,  girl3];
// Place the player object in a variable called player
var player = new player();
// Place the all key objects in an array called allKeys
var key5 = new key (420);
var key4 = new key (320);
var key3 = new key (220);
var key2 = new key (120);
var key1 = new key (20);
var allKeys = [key1,key2,key3,key4,key5];
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  32: 'space'
};
player.handleInput(allowedKeys[e.keyCode]);});