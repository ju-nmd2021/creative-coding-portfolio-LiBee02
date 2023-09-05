function setup() {
  createCanvas(1000, 1000);
  noLoop(); // Makes it static
}

function draw() {
  background(0);

  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 30; j++) {

      // Generate random colors
      let r = random(255);
      let g = random(255);
      let b = random(255);
      fill(r, g, b);

      // Determine the shape (circle or rectangle) (0.5 means there is a 50/50 chance for rec or circle)
      let shapeType = random(1);
      if (shapeType > 0.5) {

        // Draw a circle
        let x = i * 50 + 50;
        let y = j * 40 + 30;
        let diameter = random(20, 40);
        ellipse(x, y, diameter, diameter);
      } else {

        // Draw a rectangle
        let x = i * 40 + 20;
        let y = j * 40 + 20;
        let width = random(20, 40);
        let height = random(20, 40);
        rect(x, y, width, height);
      }
    }
  }
}