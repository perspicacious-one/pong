


![Pong logo](https://github.com/perspicacious-one/pong/blob/master/assets/title.PNG)

#### Recreating pong from scratch using only html5 canvas, javascript, and css.


### General
- Each object has it's own `draw()` and `move()` function for repositioning from the animation frame.
- `posX, posY` - Each object has a posX & posY that is the x & y coordinate used in the draw function. Drawing is always based off of this value.

### The Paddle

**Args:**
- _x (int)_ - The starting draw position on the canvas.
- _speed (int)_ - The maximum velocity the paddle can move in the y direction.
- _inverted (bool)_ - For logical operations associated with computer controlled components. Could be interpolated but this was simpler.

**Methods**
 - `update()` - If it is a computer controlled paddle, this method is used for animation movement instead of the `move` method.

### The Ball

**Methods**

- `move()` - This method just adjusts the path matrix, resets the posX & posY properties, and calls the draw.


### Collision Detection

Collisions are detected through a series of methods. If within a general range, the program will begin more detailed collision detection and redirection.

`edgeRedirect()` - Simple edge detection using the canvas boundaries. Also triggers scoring when necessary.

`paddleRedirect()` - Rough collision detection followed by more accurate collision detection (below). When necessary, it triggers the trajectory adjustment for the ball.


Fine grain collision detection:
```javascript
var collision = function(paddle) {
  var dx = ball.posX - paddle.collisionAreaX();
  return paddle.collisionAreaY().some( y => {
    var dy = ball.posY - y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if(distance < ball.radius) {
      return true;
    }
  })
}
```
