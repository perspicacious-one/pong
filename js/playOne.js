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

  // collisionY() {
  //   return range(this.posY, this.height);
  // }
  // collisionX() {
  //   return (this.posX + this.width);
  // }
  upperBound() {
    return (this.posY - this.vy);
  }

  lowerBound() {
    return (this.posY + this.height + this.vy);
  }

  move(key) {

      if(key === 38) {
        if (this.upperBound() >= this.vy) {
          this.posY -= this.vy;
          this.draw();
        } else {
          this.draw();
        }
      } else if(key === 40) {
          if(this.lowerBound() <= ctx.height - this.vy) {
            this.posY += this.vy;
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
