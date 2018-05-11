var canvas = document.querySelector("#pong");
var ctx = canvas.getContext('2d');

canvas.height = document.getElementById('container').clientHeight;
canvas.width = document.getElementById('container').clientWidth;

ctx.width = canvas.width;
ctx.height = canvas.height;

var interval;

const dark = "#363636";
const primary = "#00D1B2";
const secondary = "#FF3860";
const darkInvert = "#F5F5F5";

const board = new Board;
const playOne = new Paddle(30, 10, false);
const playTwo = new Paddle((ctx.width - 45), 3, true);
const ball = new Ball;


window.addEventListener('keydown', function(e) {
  if(e.keyCode === 38) {
    stepKey(38);
  } else if(e.keyCode === 40) {
    stepKey(40);
  }
});

function* range(start, end) {
    start = Math.ceil(start);
    end = Math.ceil(end);
    yield start;
    if (start === end) return;
    yield* range(start + 1, end);
}

var collision = function(paddle) {
  var dx = ball.posX - paddle.collisionAreaX();
  return paddle.collisionAreaY().some( y => {
    var dy = ball.posY - y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if(distance < ball.radius) {
      return true;
    }
  })
}

function edgeRedirect() {
  var onLeftEdge = (ball.posX - ball.radius) <= 1;
  var onRightEdge = (ball.posX + ball.radius) >= (ctx.width - 1);
  var onTopEdge = (ball.posY - ball.radius) <= 0;
  var onBottomEdge = (ball.posY + ball.radius) >= ctx.height;

  if (onLeftEdge) {
    checkScore(2);
    ball.adjustVelocity(-1, 1);
    return;
  }
  if (onRightEdge) {
    checkScore(1);
    ball.adjustVelocity(-1, 1);
    return;
  }
  if (onTopEdge) {
    ball.adjustVelocity(1, -1);
    return;
  }
  if (onBottomEdge) {
    ball.adjustVelocity(1, -1);
    return;
  }
}

function paddleRedirect(paddle) {
  var onLowerEdge = ball.posY >= (paddle.posY + paddle.height);
  var onUpperEdge = ball.posY <= paddle.posY ;

  if(ball.isMovingDown() && onLowerEdge) {
    ball.adjustVelocity(-1, 2);
    return;
  }
  if(!ball.isMovingDown() && onLowerEdge) {
    ball.adjustVelocity(-1, -1.1);
    return;
  }
  if(ball.isMovingDown() && onUpperEdge) {
    ball.adjustVelocity(-1, -1);
    return;
  }
  if(!ball.isMovingDown() && onUpperEdge) {
    ball.adjustVelocity(-1, 2);
    return;
  }
  ball.adjustVelocity(-1, 1);
}

function start() {
  var modal = document.querySelector(".modal");
  modal.classList.remove('is-active');

  interval = window.setInterval(function() {animate()}, 15);
}

function end() {
  addNewElement('h2', "Game Over!", 'prompt', "modal-title", 'modal-title-area');
  addNewElement('h3', "Player One: " + playOne.score.toString(), 'score-left-text', 'subtitle', 'score-left');
  addNewElement('h3', "Player Two: " + playTwo.score.toString(), 'score-right-text', 'subtitle', 'score-right');

  var go = document.getElementById("go");
  var restart = document.getElementById("restart");
  var newButton = document.getElementById("new-game");
  go.classList.add('inactive');
  go.classList.remove('is-active');

  restart.classList.add('inactive');
  restart.classList.remove('is-active');

  newButton.classList.add('is-active');
  newButton.classList.remove('inactive');
  var modal = document.querySelector(".modal");
  modal.classList.add('is-active');
}
function reset() {
  ctx.clearRect(0, 0, ctx.height, ctx.width);
  board.draw();
  playOne.reset();
  playTwo.reset();
  ball.reset();
  window.clearInterval(interval);
  ShowScore();
}

function ShowScore() {
  addNewElement('h3', "Player One: " + playOne.score.toString(), 'score-left-text', 'subtitle', 'score-left');
  addNewElement('h3', "Player Two: " + playTwo.score.toString(), 'score-right-text', 'subtitle', 'score-right');


  var modal = document.querySelector(".modal");
  modal.classList.add('is-active');
}

function addNewElement(tag, text, id, selectors, parentId) {
  var element = document.createElement(tag);
  var text = document.createTextNode(text);
  var parent = document.getElementById(parentId);
  var existing = document.getElementById(id);

  element.appendChild(text);
  element.classList.add(selectors);
  element.id = id;

  if(parent.hasChildNodes()) {
    parent.replaceChild(element, existing);
  } else {
    parent.appendChild(element);
  }
}

function stepKey(key) {
  playOne.move(key);
}


function moveBall() {
  if(collision(playOne) == true) {
    paddleRedirect(playOne);
  } else if(collision(playTwo) == true) {
    paddleRedirect(playTwo);
  } else {
    edgeRedirect();
  }
  ball.move();
}
function step(key) {
  playOne.clear();
  playTwo.clear();
  board.draw();
  playOne.move(key);
  playTwo.update(ball);
  moveBall();
}

function checkScore(arg) {
  if(arg == 2) {
    playTwo.score += 1;
    if(playTwo.score >= 2) {
      end();
    }
    reset();
  } else if (arg == 1) {
    playOne.score += 1;
    if(playOne.score >= 2) {
      end();
    }
    reset();
  }
  return;
}
function animate() {
  window.requestAnimationFrame(step)
}
