let img
let img2
let img3
let img4
let svg

function preload() {
  img = loadImage('data/touchtest.png'); // Load your image here
  img2 = loadImage('data/hand.png'); // Load your image here
  img3 = loadImage('data/05.png'); // Load your image here
  img4 = loadImage('data/pngbg.png'); // Load your image here
  svg = loadImage('data/fingerprint.svg');
}

function setup() {
createCanvas(800, 500);
}

function draw() {
  background(200)

image(img4, 0, 0, width, height); // Draw img4 to cover the entire canvas


image(img3, -70, 180, 450, 600); // Draw the image at the calculated position 
image(img2, 300, 30, 550, 550); // Draw the image at the calculated position  
image(img, 45, 20, 700, 170); // Draw the image at the calculated position
image(svg, 55, 250, 200, 200)
}
