// const canvas = document.querySelector("#pong");
// const ctx = canvas.getContext('2d');
// const main = document.querySelector('#container');

class Game {
  constructor() {
    if (canvas.getContext) {
      this.render();
    } else {
      var fallback = document.createTextNode("Canvas is not supported by this browser.");
      main.appendChild(fallback);
    }
  }

  render() {
    ctx.fillStyle = "#12264a";
    ctx.fillRect(0, 0, ctx.width, ctx.height);
    var playOne = new PlayerOne;
    var playTwo = new PlayerTwo;
    var ball = new Ball;
  }
}
