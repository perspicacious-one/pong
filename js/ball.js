
class Ball {
  constructor() {
    this.posY = (ctx.height / 2);
    this.posX = (ctx.width / 2);
    this.radius = 15;
    this.vectorMax = 8;
    this.velocityY = 0;
    this.velocityX = 0;
    this.path = [];
    this.reset = function() {
      this.posY = (ctx.height / 2);
      this.posX = (ctx.width / 2);
      this.velocityY = 0;
      this.velocityX = 0;
      this.path = [];
      this.init();
      this.draw();
    }
    this.init();
    this.draw();
  };

  init() {
    var max = Math.ceil(this.vectorMax);
    var min = Math.floor(this.vectorMax * -1);

    this.velocityY = Math.floor(Math.random() * max);
    this.velocityX = Math.floor(this.vectorMax - this.velocityY);
    console.log(this.velocityX + ", " + this.velocityY)
    this.path.push([this.posX, this.posY])
  }

  isMovingDown() {
    if(this.path[0][1] < this.path[1][1]) {
      return true;
    } else {
      return false;
    }
  }

  isMovingRight() {
    if(this.path[0][0] < this.path[1][0]) {
      return true;
    } else {
      return false;
    }
  }

  xRange() {
    return Array.from(range(this.posX - this.radius, this.posX + this.radius));
  }

  yRange(val = 0) {
    if(val = 0) {
      return Array.from(range(this.posY - this.radius, this.posY + this.radius));
    } else if (val = 1) {
      return Array.from(range(this.posY - this.radius, this.posY));
    } else if (val = 2) {
      return Array.from(range(this.posY + this.radius, this.posY));
    }
  }

  adjustVelocity(x, y) {
    this.velocityX *= x;
    this.velocityY *= y;
    console.log([this.velocityY, this.velocityX, y, x]);
  }

  setPath() {
    var x = this.posX + this.velocityX;
    var y = this.posY + this.velocityY;
    this.path.push([x,y]);
    if(this.path.length > 2) {
      this.path.shift();
    }
  }

  move() {
    this.setPath();
    this.posX = Math.round(this.path[1][0]);
    this.posY = Math.round(this.path[1][1]);
    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = secondary;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = secondary;
    ctx.stroke();
  }
}
