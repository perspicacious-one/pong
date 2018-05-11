
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
    var min = Math.floor(this.vactorMax * -1);

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

  xRange() {
    return Array.from(range(this.posX - this.radius, this.posX + this.radius));
  }
  yRange() {
    return Array.from(range(this.posY - this.radius, this.posY + this.radius));
  }

  xLimit() {
    return ctx.width - this.radius;
  }

  yLimit() {
    return ctx.height - this.radius;
  }

  setPath() {
    var x = this.posX + this.velocityX;
    var y = this.posY + this.velocityY;

    if(x > this.xLimit() || collisionDetected()) {
      this.velocityX *= -1;
    } else if(x < (0 + this.radius)) {
      this.velocityX *= -1;
    }
    if(y > this.yLimit()) {
      this.velocityY *= -1;
    } else if(y < (0 + this.radius)) {
      this.velocityY *= -1;
    }

    this.path.push([this.posX + this.velocityX, this.posY + this.velocityY]);
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
    ctx.fillStyle = '#FF5A36';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#FF5A36';
    ctx.stroke();
  }
}
