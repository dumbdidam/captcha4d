let img;
let img2;
let img3;
let img4;
let img5; 
let lastDrawTimeImg1 = 40;
let lastDrawTimeImg2 = 60;
let lastDrawTimeImg3 = 20;
let lastDrawTimeImg4 = 10;
let lastDrawTimeImg5 = 0;
let intervalImg1 = 1500; // Set the interval between each appearance of img1 in milliseconds
let intervalImg2 = 1700; // Set the interval between each appearance of img2 in milliseconds
let intervalImg3 = 1000; // Set the interval between each appearance of img2 in milliseconds
let intervalImg4 = 1300; // Set the interval between each appearance of img2 in milliseconds
let intervalImg5 = 2400; // Set the interval between each appearance of img2 in milliseconds

function preload() {
  img = loadImage('data/ad1final.png'); // Load your image here
  img2 = loadImage('data/ad3final3.png'); // Load your image here
  img3 = loadImage('data/ad2final2.png'); // Load your image here
  img4 = loadImage('data/ad4final.png'); // Load your image here
  img5 = loadImage('data/ad5final.png'); // Load your image here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(5)
}

function draw() {
  // Check if it's time to draw img1
  if (millis() - lastDrawTimeImg1 > intervalImg1) {
    drawImage(img);
    lastDrawTimeImg1 = millis();
  }
  
  // Check if it's time to draw img2
  if (millis() - lastDrawTimeImg2 > intervalImg2) {
    drawImage(img2);
    lastDrawTimeImg2 = millis();
  }
  
  // Check if it's time to draw img3
  if (millis() - lastDrawTimeImg3 > intervalImg3) {
    drawImage(img3);
    lastDrawTimeImg3 = millis();
  }
  
  // Check if it's time to draw img4
  if (millis() - lastDrawTimeImg4 > intervalImg4) {
    drawImage(img4);
    lastDrawTimeImg4 = millis();
  }
  // Check if it's time to draw img5
  if (millis() - lastDrawTimeImg5 > intervalImg5) {
    drawImage(img5);
    lastDrawTimeImg5 = millis();
  }
}

function drawImage(imageToDraw) {
  let x = random(width - imageToDraw.width);
  let y = random(height - imageToDraw.height);
  image(imageToDraw, x, y);
}
