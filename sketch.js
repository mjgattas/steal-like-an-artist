let img;  // Declare variable 'img'.
let colorCircles = [];
let symbolAcceleration = 0.01;

let pixelBlockDimension = 5;

function preload() {
  img = loadImage('VVG05.png');
}

function setup() {
  createCanvas(img.width, img.height, {willReadFrequently: true});  // Load the image.
  noStroke();
  smooth();
  frameRate(30);
}

function draw() {
  if (frameCount === 1){

    // capturer.start();
    // Calculate the average color for every 5x5 square of pixels:
    image(img, 0, 0);  // Display the image.
    for (let x = 0; x < floor(width / pixelBlockDimension) * pixelBlockDimension; x += pixelBlockDimension) {
      for (let y = 0; y < floor(height / pixelBlockDimension) * pixelBlockDimension; y += pixelBlockDimension) {
        let r = 0, g = 0, b = 0;  // Declare variables for the red, green, and blue components of the color.
        for (let i = 0; i < pixelBlockDimension; i++) {
          for (let j = 0; j < pixelBlockDimension; j++) {
            let c = get(x + i, y + j);  // Get the color at (x + i, y + j).
            r += red(c);  // Add the red component of c2 to the running total for the red component.
            g += green(c);  // Add the green component of c2 to the running total for the green component.
            b += blue(c);  // Add the blue component of c2 to the running total for the blue component.
          }
        }
        r /= pixelBlockDimension*pixelBlockDimension;  // Divide the running total for the red component by the size of our sample square to get the average.
        g /= pixelBlockDimension*pixelBlockDimension;  // Divide the running total for the green component by the size of our sample square to get the average.
        b /= pixelBlockDimension*pixelBlockDimension;  // Divide the running total for the blue component by the size of our sample square to get the average.

        colorCircles.push(new colorCircle(r, g, b, x + pixelBlockDimension/2, y + pixelBlockDimension/2));  // Draw an ellipse with the average color.
      }
    }
    background(255);

  } else if (frameCount > 1 && frameCount < 60 ){
    for (let cc of colorCircles){
      cc.display();
    }
  } else if (frameCount > 60 && frameCount < 500 ){
    for (let cc of colorCircles){
      cc.display();
      cc.update(frameCount);
    }
  } else if (frameCount === 501) {
    for (let cc of colorCircles){
      cc.display();
    }
    // capturer.save();
    // capturer.stop();
  }
}
class colorCircle {
  constructor(r, g, b, x, y) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.x = x;
    this.y = y;
    this.rand = random(-1,1);
    this.symbolSpeed = 2 + 2 * Math.floor(Math.random(0,1));
    this.tooLow = false;
  }

  update(f) {
    if (this.rand < 0){
      this.y += Math.cos(f/8);
    } else if (this.rand >= 0) {
      this.y += Math.sin(f/8);
    }


    // if (this.y > height) this.tooLow = true;
  }

  // Display the symbol
  display() {
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, pixelBlockDimension);
  }
}
