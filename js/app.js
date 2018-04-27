var canvas = document.querySelector("#pong");
var ctx = canvas.getContext('2d');

canvas.height = document.getElementById('container').clientHeight;
canvas.width = document.getElementById('container').clientWidth;

ctx.width = canvas.width;
ctx.height = canvas.height;

function animate() {
  window.requestAnimationFrame(step)
}

function step(key) {
  ctx.clearRect(0, 0, canvas.height, canvas.width);
  board.draw();
  playOne.move(key);
  playTwo.draw();
  ball.draw();
}

window.addEventListener('keydown', function(e) {
  console.log(e.keyCode);
  if(e.keyCode === 38) {
    step(38);
  } else if(e.keyCode === 40) {
    step(40);
  }
});

const board = new Board;
const playOne = new PlayerOne;
const playTwo = new PlayerTwo;
const ball = new Ball;
