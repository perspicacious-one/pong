// const canvas = document.querySelector("#pong");
// const ctx = canvas.getContext('2d');
// const main = document.querySelector('#container');

class PlayerOne {
  constructor() {
    this.posY = parseInt((ctx.height/2) - (ctx.height * .1));
    this.posX = 10;
    this.height = parseInt(ctx.height * .15);
    this.width = 15;
    this.vy = 4;
    this.draw();
  };



  move(key) {

      if(key === 40) {
        if (this.posY >= 2) {
          this.posY += this.vy;
          this.draw();
        } else {
          this.draw();
        }
      } else if(key === 38) {
          if(this.posY <= ctx.height - this.vy) {
            this.posY -= this.vy;
            this.draw();
          } else {
            this.draw();
          }
      } else {
        this.draw();
      }

  }

  draw() {
    ctx.fillStyle = "#FF5A36";
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }
}
