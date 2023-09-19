function setup() {
  createCanvas(1000, 1000);
  noLoop();
  background(100,70,100);
  draw();
}

function draw() {
  // Sets random color to lines betwen 1-255
  let r = random(255);
  let g = random(255);
  let b = random(255);
  stroke(r, g, b); // Set the random color to lines

  let weight = random(1,10); // Random stroke weight between 1 and 10
  strokeWeight(weight); 

  // Create a random pattern of lines
  for (let i = 0; i < 200; i++) { //Generate 200 lines

    // Generate a random starting point for the line within the canvas width
    let x1 = random(width);
    let y1 = random(height);

    // Create a random variation from the starting point for the end point of the line
    // This adds randomness to the line's direction and length
    let x2 = x1 + random(-30, 30);
    let y2 = y1 + random(-30, 30);

    // Draw the line using the random start and end points
    line(x1, y1, x2, y2);
    
  }
}




















