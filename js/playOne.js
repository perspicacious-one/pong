// const canvas = document.querySelector("#pong");
// const ctx = canvas.getContext('2d');
// const main = document.querySelector('#container');

class Paddle {
  constructor(x, speed, inverted) {
    this.posY = parseInt((ctx.height/2) - (ctx.height * .1));
    this.posX = x;
    this.height = parseInt(ctx.height * .15);
    this.width = 15;
    this.score = 0;
    this.vy = speed;
    this.inverted = inverted;
    this.reset = function() {
      this.posX = x;
      this.posY = parseInt((ctx.height/2) - (ctx.height * .1));
      this.draw();
    }
    this.draw();
  };

  collisionAreaY() {
    return Array.from(range(this.posY - 1, this.posY + this.height + 1));
  }
  collisionAreaX() {
    return this.inverted ? (this.posX) : (this.posX + this.width);
  }

  middleY() {
    return (this.posY + this.height / 2)
  }
  upperBound() {
    var nextY = this.posY - this.vy;
    if(nextY <= 0) {
      return 0;
    } else {
      return (this.posY - this.vy);
    }
  }

  lowerBound() {
    var nextY = this.posY + this.height + this.vy;
    if(nextY > ctx.height) {
      return (ctx.height - this.height);
    } else {
      return (this.posY + this.vy);
    }
  }

  move(key) {

      if(key === 38) {
        this.posY = this.upperBound();
        this.draw();
      } else if(key === 40) {
        this.posY = this.lowerBound();
        this.draw();
      } else {
        this.draw();
      }
  }
  update(ball) {

    if(ball.yRange().includes(this.middleY())){
      this.draw();
      return;
    }
    if(ball.posY > (this.middleY() + 4)) {
      this.posY = this.lowerBound();
      this.draw();
    } else if(ball.posY < (this.middleY() - 4)) {
      this.posY = this.upperBound();
      this.draw();
    } else {
      this.draw();
    }
  }
  clear() {
    ctx.clearRect(this.posX, this.posY, this.width, this.height);
  }
  draw() {
    ctx.fillStyle = "#FF5A36";
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }
}
