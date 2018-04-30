
class Ball {
  constructor() {
    this.yPos = (ctx.height / 2);
    this.xPos = (ctx.width / 2);
    this.radius = 15;
    this.vectorMax = 4;
    this.velocityY = 0;
    this.velocityX = 0;
    this.path = [];
    this.init();
    this.draw();
  };

  init() {
    var max = Math.ceil(this.vectorMax);
    var min = Math.floor(1);
    this.velocityY = Math.floor(Math.random() * (max - min)) + min;
    this.velocityX = (this.vectorMax - this.velocityY);
    this.path.push([this.xPos, this.yPos])
  }

  xLimit() {
    return ctx.width - this.radius;
  }

  yLimit() {
    return ctx.height - this.radius;
  }
  setPath() {
    var x = this.xPos + this.velocityX;
    var y = this.yPos + this.velocityY;

    if(x > this.xLimit()) {
      this.velocityX *= -1;
    } else if(x < (0 + this.radius)) {
      this.velocityX *= -1;
    }
    if(y > this.yLimit()) {
      this.velocityY *= -1;
    } else if(y < (0 + this.radius)) {
      this.velocityY *= -1;
    }

    this.path.push([this.xPos + this.velocityX, this.yPos + this.velocityY]);
    if(this.path.length > 2) {
      this.path.shift();
    }
  }

  move() {
    this.setPath();
    this.xPos = this.path[1][0];
    this.yPos = this.path[1][1];
    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#FF5A36';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#FF5A36';
    ctx.stroke();
  }
}
