var canvas = document.querySelector("#pong");
var ctx = canvas.getContext('2d');

canvas.height = document.getElementById('container').clientHeight;
canvas.width = document.getElementById('container').clientWidth;

ctx.width = canvas.width;
ctx.height = canvas.height;

var interval;

const board = new Board;
const playOne = new Paddle(20, 10, false);
const playTwo = new Paddle((ctx.width - 35), 5, true);
const ball = new Ball;

function collisionDetected() {
  var ballDiameter = ball.xRange();
  var paddleOne = playOne.collisionAreaY();
  var paddleTwo = playTwo.collisionAreaY();

  if(ballDiameter.includes(playOne.collisionAreaX()) && paddleOne.includes(ball.posY) && ball.posX > (playOne.posX + playOne.width))  {
    // pathRedirect(playOne);
    return true;
  } else if(ballDiameter.includes(playTwo.collisionAreaX()) && paddleTwo.includes(ball.posY) && ball.posX <= playTwo.posX) {
    // pathRedirect(playTwo);
    return true;
  } else {
    return false;
  }

}

// function pathRedirect(paddle) {
//   var onLowerEdge = function() { (ball.posY + ball.radius) >= (paddle.posY + paddle.height); }
//   var onUpperEdge = function() { (ball.posY + ball.radius) <= paddle.posY }
//
//   switch (true) {
//     case ball.isMovingDown() && onLowerEdge:
//       ball.velocityY *= 1.5;
//       break;
//     case !ball.isMovingDown() && onLowerEdge:
//       ball.velocityY *= -1;
//       break;
//     case ball.isMovingDown() && onUpperEdge:
//       ball.velocityY *= -1;
//       break;
//     case !ball.isMovingDown() && onUpperEdge:
//       ball.velocityY *= 1.5;
//       break;
//     default:
//       break;
//   }
// }
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

function start() {
  var modal = document.querySelector(".modal");
  modal.classList.remove('is-active');

  interval = window.setInterval(function() {animate()}, 15);
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
  checkScore();
}
function step(key) {
  playOne.clear();
  playTwo.clear();
  board.draw();
  playOne.move(key);
  playTwo.update(ball);
  ball.move();
  checkScore();
}

function checkScore() {
  if(ball.posX <= playOne.posX) {
    playTwo.score += 1;
    reset();
  } else if (ball.posX >= playTwo.posX) {
    playOne.score += 1;
    reset();
  }
  return;
}
function animate() {
  window.requestAnimationFrame(step)
}
