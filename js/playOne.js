// const canvas = document.querySelector("#pong");
// const ctx = canvas.getContext('2d');
// const main = document.querySelector('#container');

class PlayerOne {
  constructor() {
    this.posY = parseInt((ctx.height/2) - (ctx.height * .1));
    this.posX = 10;
    this.height = parseInt(ctx.height * .15);
    this.width = 15;
    this.draw();
  };

  draw() {
    ctx.fillStyle = "#FF5A36";
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }
}
