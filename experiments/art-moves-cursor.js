let circles = [];

function setup() {
  createCanvas(400, 400);
  noStroke();
  
  // Create a random static artwork (in this case, circles)
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(10, 50);
    circles.push(new Circle(x, y, size));
  }
}

function draw() {
  background(220);

  // Display and update the circles
  for (let i = 0; i < circles.length; i++) {
    circles[i].move();
    circles[i].display();
  }
}

function mouseMoved() {
  // Move the circles randomly when the cursor goes over the canvas
  for (let i = 0; i < circles.length; i++) {
    circles[i].moveRandomly();
  }
}

class Circle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(-1, 1);
  }

  move() {
    // Update the position based on speed
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Bounce off the canvas edges
    if (this.x > width - this.size / 2 || this.x < this.size / 2) {
      this.xSpeed *= -1;
    }
    if (this.y > height - this.size / 2 || this.y < this.size / 2) {
      this.ySpeed *= -1;
    }
  }

  moveRandomly() {
    // Move the circle to a random position within the canvas
    this.x = random(width);
    this.y = random(height);
  }

  display() {
    // Draw the circle
    fill(255, 0, 0); // Red color
    ellipse(this.x, this.y, this.size);
  }
}
