let xstart, ystart;
let canvas;
let backAlpha = 2
let height;

function setup() {
    height = windowHeight / 8;

    smooth();
    canvas = createCanvas(windowWidth, height);
    frameRate(24);

    xstart = random(10);
    ystart = random(10);

    strokeWeight(0.3);
}


function draw() {
    alph = Math.log(backAlpha += 0.002)
    background(color(0, 0, 0, alph));

    var ynoise = ystart += 0.05;
    xstart += 0.01;

    const space = 75;
    for (var y = 0; y < windowHeight + space; y += space) {
        ynoise += 0.05;
        var xnoise = xstart;
        for (var x = 0; x < windowWidth + space; x += space) {
            xnoise += 0.1;
            drawPoint(x, y, noise(xnoise, ynoise), sin(frameCount/200) ** 4);
        }
    }
}

function drawPoint(x, y, noiseFactor, secondaryNoiseFactor) {
    rotation = (noiseFactor * TWO_PI);
//    stroke(40, 140  * (1 - noiseFactor) + 60, 70  * noiseFactor + 20, 220);
    stroke(255, 255, 255, 50 + (120 * secondaryNoiseFactor));

    var r = 100 + (80 * secondaryNoiseFactor);
    var x2 = x + r * cos(rotation);
    var y2 = y + r * sin(rotation)

    line(x, y, x2, y2);
}

function windowResized() {
  resizeCanvas(windowWidth, height);
}