function setup() {
  createCanvas(1000, 1000);
  noLoop(); // Makes the artwork static by preventing automatic redraws
}

function draw() {
  background(0); // Set the background to black

  // Draw the trunk
  stroke(100, 0, 100); // Brown color for the trunk
  strokeWeight(5);
  line(width / 2, height, width / 2, height - 100);

  // Recursively draw branches starting from the top of the trunk
  drawBranch(width / 2, height - 100, 100, PI / 2, 5);
}

function drawBranch(x, y, length, angle, thickness) {
  if (length < 1) {
    return; // Stop drawing when the branch is very short
  }

  // Calculate the endpoint of the branch
  let endX = x + cos(angle) * length;
  let endY = y - sin(angle) * length;

  // Draw the branch
  stroke(255, 255, 255); // Green color for branches
  strokeWeight(thickness);
  line(x, y, endX, endY);

  // Recursively draw two new branches from the endpoint with slight angle variations
  drawBranch(endX, endY, length * 0.7, angle + random(-PI / 100, PI / 6), thickness * 0.5);
  drawBranch(endX, endY, length * 0.7, angle - random(-PI / 120, PI / 6), thickness * 0.5);
}