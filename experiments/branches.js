function setup() {
  createCanvas(1000, 1000);
  noLoop(); // Makes it static
}

function draw() {
  background(0);

  // Draw the trunk
  stroke(100, 0, 100); // Brown color for the trunk
  strokeWeight(5);
  line(width / 2, height, width / 2, height - 100);

  // Recursively draw branches
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

  // Recursively draw two new branches
  drawBranch(endX, endY, length * 0.7, angle + random(-PI / 100, PI / 6), thickness * 0.5);
  drawBranch(endX, endY, length * 0.7, angle - random(-PI / 120, PI / 6), thickness * 0.5);
}
