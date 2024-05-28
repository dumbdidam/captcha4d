let mic;
let greenColor;
let redColor;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create an Audio input
  mic = new p5.AudioIn();

  // Start the Audio Input.
  mic.start();

  greenColor = color(0, 255, 0); // Green
  redColor = color(255, 0, 0); // Red
}

function draw() {
  background(255);

  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel();

  // Calculate ellipse size based on volume
  let baseSize = 50;
  let maxSize = baseSize + vol * 200; // Adjust the range as needed

  let interpColor = lerpColor(greenColor, redColor, vol);

  // Draw the bubble shape at the center of the canvas
  drawBubble(width / 2, height / 2, maxSize, interpColor);
}

function drawBubble(x, y, size, col) {
  let noiseMax = 2; // Control the variation of the shape

  fill(col);
  stroke(0);
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let xoff = map(cos(angle), -1, 1, 0, noiseMax);
    let yoff = map(sin(angle), -1, 1, 0, noiseMax);
    let r = map(noise(xoff, yoff), 0, 1, size * 0.8, size);
    let px = x + r * cos(angle);
    let py = y + r * sin(angle);
    vertex(px, py);
  }
  endShape(CLOSE);
}
