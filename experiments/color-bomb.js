let numLayers = 6;
let numShapes = 12;

function setup() {
  createCanvas(1000, 1000);
  noLoop();
  background(255);
  drawMandala(width / 2, height / 2, 200, numLayers, numShapes);
}

function draw() {
  // No need for a draw loop since "the mandala" is drawn in setup
}

function drawMandala(x, y, radius, layers, shapes) {
  let angleIncrement = TWO_PI / shapes;
  for (let layer = 0; layer < layers; layer++) {
    let layerRadius = radius * ((layer + 5) / layers);
    for (let shape = 0; shape < shapes; shape++) {
      let angle = angleIncrement * shape;
      let x1 = x + cos(angle) * layerRadius;
      let y1 = y + sin(angle) * layerRadius;
      let x2 = x + cos(angle + PI) * layerRadius;
      let y2 = y + sin(angle + PI) * layerRadius;
      
      // Generate a random fill color
      let fillColor = color(random(255), random(255), random(255), 150); // Random color with transparency
      
      // Draw the shape with the random color
      fill(fillColor);
      noStroke(); // Remove outline
      beginShape();
      let numPoints = int(random(3, 9));
      for (let i = 0; i < numPoints; i++) {
        let angle = angleIncrement * i;
        let x = lerp(x1, x2, cos(angle));
        let y = lerp(y1, y2, sin(angle));
        vertex(x, y);
      }
      endShape(CLOSE);
    }
  }
}