// const canvas = document.querySelector("#pong");
// const ctx = canvas.getContext('2d');
// const main = document.querySelector('#container');

class Board {
  constructor() {
    if (canvas.getContext) {
      this.draw();
    } else {
      var fallback = document.createTextNode("Canvas is not supported by this browser.");
      main.appendChild(fallback);
    }
  }

  draw() {
    ctx.fillStyle = dark;
    ctx.fillRect(0, 0, ctx.width, ctx.height);
  }
}
