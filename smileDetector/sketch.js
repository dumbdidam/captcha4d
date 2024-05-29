// this code is adapted from https://www.youtube.com/watch?v=3yqANLRWGLo&list=LL&index=14

let faceapi;
let detections = [];
let video;
let canvas;
let smileLevel = 0; // Initialize smile level
const maxSmileWidth = 400; // Set a maximum smile bar width (adjust as needed)
let successMessage = ''; // Initialize an empty success message


function preload() {
    img = loadImage('data/cheese2.png'); // Load your image here
    img2 = loadImage('data/complete.png'); // Load your image here
}

function setup() {
    canvas = createCanvas(480, 360);
    canvas.id('canvas');
    video = createCapture(VIDEO);
    video.id('video');
    video.size(width, height);

    const faceOptions = {
        withLandmarks: true,
        withExpressions: true,
        withDescriptors: false,
        minConfidence: 0.5
    };

    faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

function faceReady() {
    faceapi.detect(gotFaces);
}

function gotFaces(error, result) {
    if (error) {
        console.log(error);
        return;
    }

    detections = result;
    faceapi.detect(gotFaces);
}

function draw() {
    clear();
    drawBoxes(detections);
    drawLandmarks(detections);
    updateSmileLevel(); 
    drawSmileBar();
    displaySuccessMessage();
}

function drawBoxes(detections) {
    if (detections.length > 0) {
        for (let f = 0; f < detections.length; f++) {
            let { _x, _y, _width, _height } = detections[f].alignedRect._box;

            stroke(44, 169, 225);
            strokeWeight(1);
            noFill();
            rect(_x, _y, _width, _height);
        }
    }
}

function drawLandmarks(detections) {
    if (detections.length > 0) {
        for (let f = 0; f < detections.length; f++) {
            let points = detections[f].landmarks.positions;
            for (let i = 0; i < points.length; i++) {
                stroke(44, 169, 225);
                strokeWeight(3);
                point(points[i]._x, points[i]._y);
            }
        }
    }
}

function drawSmileBar() {
    if (detections.length > 0) {
        let { neutral, happy } = detections[0].expressions;

        // Set a custom threshold for smile detection
        const smileThreshold = 0.999999999999998; // Adjust this value (0 to 1) as needed

        // Only consider it a smile if happiness expression exceeds the threshold
        if (happy > smileThreshold) {
            smileLevel = map(happy, smileThreshold, 1, 0, maxSmileWidth);
        } else {
            smileLevel = 0; // Not smiling wide enough
        }
    } else {
        smileLevel = 0; // No smile detected
    }

     // Define colors for neutral (red) and happy (green)
     let neutralColor = color(255, 0, 0); // Red
     let happyColor = color(0, 255, 0); // Green
 
     // Interpolate between colors based on smile level
     let smileColor = lerpColor(neutralColor, happyColor, smileLevel / maxSmileWidth);
 
     // Draw the smile bar with the interpolated color
     fill(smileColor);
     rect(20, 300, smileLevel, 30); // Adjust position and size as needed
}

function updateSmileLevel() {
    // ... (same as before)
}

function displaySuccessMessage() {
    if (smileLevel >= maxSmileWidth) {
        // successMessage = 'WHAT A BEAUTIFUL SMILE!';
        image(img2, 97, 20, 300, 60);
    } else {
        // successMessage = 'SAYYY CHEESEE!'; // Reset the message
        image(img, 85, 15, 300, 60);
    }

    // Display the success message
    fill(255);
    textSize(18);
    textAlign(CENTER);
    text(successMessage, width / 2, 30); // Adjust position as needed
}
