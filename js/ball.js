


class Ball {
  constructor() {
    this.yPos = (ctx.height / 2);
    this.xPos = (ctx.width / 2);
    this.draw();
  };



  draw() {
    ctx.beginPath();
    ctx.arc(this.xPos, this.yPos, 15, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#FF5A36';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#FF5A36';
    ctx.stroke();
  }
}
