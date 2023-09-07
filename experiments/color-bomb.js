function setup() {
  createCanvas(1000, 1000);
  noLoop();
  background(255); // Set the background to white
  drawMandala(width / 2, height / 2, 200, 6, 12); // Call drawMandala to create the mandala
}

function drawMandala(x, y, radius, layers, shapes) {
  // Calculate the angular increment for each shape
  let angleIncrement = TWO_PI / shapes;

  // Loop through layers
  for (let layer = 0; layer < layers; layer++) {
    // Calculate the radius for the current layer
    let layerRadius = radius * ((layer + 5) / layers);

    // Loop through shapes
    for (let shape = 0; shape < shapes; shape++) {
      // Calculate the angle for the current shape
      let angle = angleIncrement * shape;

      // Calculate the coordinates of the first point of the shape
      let x1 = x + cos(angle) * layerRadius;
      let y1 = y + sin(angle) * layerRadius;

      // Calculate the coordinates of the second point of the shape
      let x2 = x + cos(angle + PI) * layerRadius;
      let y2 = y + sin(angle + PI) * layerRadius;
      
      // Generate a random fill color with transparency
      let fillColor = color(random(255), random(255), random(255), 150);
      
      // Set the fill color and remove stroke (outline)
      fill(fillColor);
      noStroke();

      // Begin drawing a shape
      beginShape();

      // Determine the number of points in the shape (between 3 and 8)
      let numPoints = int(random(3, 9));

      // Loop through points in the shape
      for (let i = 0; i < numPoints; i++) {
        // Calculate the angle for the current point
        let pointAngle = angleIncrement * i;

        // Interpolate the point coordinates between x1, y1, and x2, y2
        let px = lerp(x1, x2, cos(pointAngle));
        let py = lerp(y1, y2, sin(pointAngle));

        // Add the point to the shape
        vertex(px, py);
      }

      // End the shape
      endShape(CLOSE);
    }
  }
}





