var canvas = document.querySelector("#pong");
var ctx = canvas.getContext('2d');

canvas.height = document.getElementById('container').clientHeight;
canvas.width = document.getElementById('container').clientWidth;

ctx.width = canvas.width - 20;
ctx.height = canvas.height - 20;


window.document.onload = new Game();
