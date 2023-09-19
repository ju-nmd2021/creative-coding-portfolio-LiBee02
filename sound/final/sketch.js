let colors = [];
let shapes = [];
let images = [];
let mic, fft;
let isSpeaking = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  // Generate random colors, shapes, and images
  for (let i = 0; i < 5; i++) {
    colors.push(color(random(255), random(255), random(255)));
    shapes.push(new Shape(random(width), random(height)));
    // Load your images here
    images.push(loadImage('image' + i + '.jpg'));
  }
}

function draw() {
  background(220);

  // Analyze microphone input
  let spectrum = fft.analyze();
  let pitch = getPitch(spectrum);
  let loudness = mic.getLevel();

  // Modify art based on microphone input
  let redness = map(pitch, 100, 1000, 0, 255);
  let blueness = map(loudness, 0, 0.5, 0, 255);

  // Display shapes and images with modified colors
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].display(colors[i]);
    tint(redness, 0, blueness);
    image(images[i], random(width), random(height), 200, 200);
  }
}

class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 100);
    this.rotation = random(TWO_PI);
  }

  display(col) {
    push();
    fill(col);
    translate(this.x, this.y);
    rotate(this.rotation);
    rect(0, 0, this.size, this.size);
    pop();
  }
}

function getPitch(spectrum) {
  let maxAmp = 0;
  let dominantFreq = 0;

  for (let i = 100; i < spectrum.length; i++) {
    if (spectrum[i] > maxAmp) {
      maxAmp = spectrum[i];
      dominantFreq = i;
    }
  }

  return map(dominantFreq, 0, spectrum.length, 100, 1000);
}

// Detect when the user speaks
function keyPressed() {
  if (key === ' ') {
    isSpeaking = true;
  }
}

function keyReleased() {
  if (key === ' ') {
    isSpeaking = false;
  }
}
