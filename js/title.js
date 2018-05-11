const dark = "#363636";
const primary = "#00D1B2";
const secondary = "#FF3860";
const darkInvert = "#F5F5F5";

function drawTitle(ctx) {

  // draw P with box
  ctx.fillStyle = dark;
  ctx.fillRect(0, 0, 72, 80);

  ctx.fillStyle = primary;
  ctx.fillRect(10, 10, 16, 60);

  ctx.arc(46, 27, 17, 0, 2 * Math.PI, false);
  ctx.fillStyle = primary;
  ctx.fill();

  // draw rest of title text
  ctx.font = "bold 48px sans-serif";
  ctx.fillStyle = dark;
  ctx.fillText("ONG", 75, 72);

  // border outline

  // ctx.beginPath();
  // ctx.lineWidth="4";
  // ctx.strokeStyle=dark;
  // ctx.rect(0, 0, 190, 80);
  // ctx.stroke();

}

var title = (function() {
  const canvas = document.querySelector("#title");
  const ctx = canvas.getContext('2d');

  canvas.height = 90;
  canvas.width = 190;

  ctx.width = canvas.width;
  ctx.height = canvas.height;

  drawTitle(ctx);
})();
