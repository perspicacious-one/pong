var canvas = document.querySelector("#pong");
var ctx = canvas.getContext('2d');

canvas.height = document.getElementById('container').clientHeight;
canvas.width = document.getElementById('container').clientWidth;

ctx.width = canvas.width;
ctx.height = canvas.height;


const board = new Board;
const playOne = new Paddle(20, 10, false);
const playTwo = new Paddle((ctx.width - 35), 6, true);
const ball = new Ball;

function collisionDetected() {
  var ballDiameter = ball.xRange();
  var paddleOne = playOne.collisionAreaY();
  var paddleTwo = playTwo.collisionAreaY();

  if(ballDiameter.includes(playOne.collisionAreaX()) && paddleOne.includes(ball.posY) && ball.posX > playOne.posX)  {
    return true;
  } else if(ballDiameter.includes(playTwo.collisionAreaX()) && paddleTwo.includes(ball.posY) && ball.posX <= playTwo.posX) {
    return true;
  } else {
    return false;
  }
}

window.addEventListener('keydown', function(e) {
  if(e.keyCode === 38) {
    step(38);
  } else if(e.keyCode === 40) {
    step(40);
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
  modal.remove();
  var interval = window.setInterval(function() {animate()}, 15);
}


function step(key) {
  ctx.clearRect(0, 0, ctx.height, ctx.width);
  board.draw();
  playOne.move(key);
  playTwo.update(ball);
  ball.move();
}

function animate() {
  window.requestAnimationFrame(step)
}
