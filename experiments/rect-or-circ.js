function setup() {
  createCanvas(1000, 1000);
  noLoop(); // Makes the artwork static by preventing automatic redraws
  draw();
}

function draw() {
  // Generate random colors for background
  let r = random(255);
  let g = random(255);
  let b = random(255);

  background(r,g,b); // Random background color


// Create a 30x30 grid of shapes
  for (let i = 0; i < 30; i++) { //horizontal placement of shapes in grid
    for (let j = 0; j < 30; j++) { //vertical placement of shapes in grid

      // Generate random colors for each shape
      let r = random(255);
      let g = random(255);
      let b = random(255);
      fill(r, g, b); // Set the fill color of shape to random color

      // Determine the shape (circle or rectangle) based on a 50/50 chance
      let shapeType = random(1);
      if (shapeType > 0.5) { //CREATE CIRCLE

        // Draw a circle
          // Calculate the x-coordinate for the circle's center
          let x = i * 50 + 30;

          // Calculate the y-coordinate for the circle's center
          let y = j * 40 + 30;

          // Generate a random diameter for the circle between 20 and 40 pixels
          let diameter = random(20, 40);

          // Draw a circle at the calculated (x, y) center with the generated diameter
          ellipse(x, y, diameter, diameter);

      } else { //CREATE RECTANGLE

          // Calculate the x-coordinate for the top-left corner of the rectangle
          let x = i * 40 + 20;

          // Calculate the y-coordinate for the top-left corner of the rectangle
          let y = j * 40 + 20;

          // Generate a random width for the rectangle between 20 and 40 pixels
          let width = random(20, 40);

          // Generate a random height for the rectangle between 20 and 40 pixels
          let height = random(20, 40);

          // Draw a rectangle with its top-left corner at (x, y), using the generated width and height
          rect(x, y, width, height);
      }
    }
  }
}