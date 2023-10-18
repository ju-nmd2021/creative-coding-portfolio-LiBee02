let gridSize = 30; // Number of shapes in each row and column
let randomSeedValue = 1; // Change this value to get different patterns

function setup() {
  createCanvas(1000, 1000);
  noLoop(); // Makes the artwork static by preventing automatic redraws
  randomSeed(randomSeedValue); // Set the random seed
  draw();
}

function draw() {
  // Generate random colors for background
  let bgColor = color(random(255), random(255), random(255));
  background(bgColor);

  // Create a grid of shapes
  for (let i = 0; i < gridSize; i++) { // Horizontal placement of shapes in grid
    for (let j = 0; j < gridSize; j++) { // Vertical placement of shapes in grid

      // Generate random colors for each shape
      let shapeColor = color(random(255), random(255), random(255));
      fill(shapeColor); // Set the fill color of shape to random color

      // Generate a random number of edges (between 1 and 10)
      let numEdges = int(random(1, 11));

      // Calculate the position and size of the polygon
      let x = map(i, 0, gridSize, 0, width);
      let y = map(j, 0, gridSize, 0, height);
      let radius = random(20, 40);

      // Draw the polygon with the random number of edges
      drawPolygon(x, y, radius, numEdges);
    }
  }
}

function drawPolygon(x, y, radius, numEdges) {
  beginShape(); // Begin defining a shape
  for (let i = 0; i < numEdges; i++) { // Loop to create each vertex of the polygon
    let angle = TWO_PI / numEdges * i; // Calculate the angle for each vertex
    let xPos = x + cos(angle) * radius; // Calculate the x-coordinate of the vertex
    let yPos = y + sin(angle) * radius; // Calculate the y-coordinate of the vertex
    vertex(xPos, yPos); // Add the vertex to the shape
  }
  endShape(CLOSE); // End the shape, connecting the last vertex to the first to close the polygon
}
