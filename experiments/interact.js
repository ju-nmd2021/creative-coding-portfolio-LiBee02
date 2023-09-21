let dots = [];
let numDots = 2000;

function setup() {
  createCanvas(800, 800);
  noStroke();
  
  // Initialize the dots with random positions and velocities
  for (let i = 0; i < numDots; i++) {
    let dot = {
      x: random(width),
      y: random(height),
      vx: random(-2, 2),
      vy: random(-2, 2)
    };
    dots.push(dot);
  }
}

function draw() {
  background(220);
  
  for (let i = 0; i < numDots; i++) {
    let dot = dots[i];
    
    // Calculate the distance between the dot and the mouse
    let dx = mouseX - dot.x;
    let dy = mouseY - dot.y;
    let distance = sqrt(dx * dx + dy * dy);
    
    // If the dot is too close to the mouse, avoid it
    if (distance <100) {
      let angle = atan2(dy, dx);
      dot.vx -= cos(angle) * 0.2;
      dot.vy -= sin(angle) * 0.2;
    }
    
    // Update the dot's position
    dot.x += dot.vx;
    dot.y += dot.vy;
    
    // Draw the dot
    fill(255, 0, 0); // Red color
    ellipse(dot.x, dot.y, 10, 10);
    
    // Wrap the dots around the canvas
    if (dot.x < 0) dot.x = width;
    if (dot.x > width) dot.x = 0;
    if (dot.y < 0) dot.y = height;
    if (dot.y > height) dot.y = 0;
  }
}
