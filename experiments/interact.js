function setup() {
    createCanvas(1000, 1000);
    background(255);
  }
  
  function draw() {
    // Empty draw function for now
  }
  
  function mouseDragged() {
    // Draw colorful shapes shapes when the mouse is dragged
    let randomColor = color(random(255), random(255), random(255));
    fill(randomColor);
    noStroke();
    // Create random circle size
    ellipse(mouseX, mouseY, random(20, 50));
  }
  
  function keyPressed() {
    // Clear the canvas when the "C" key is pressed
    if (key === 'c' || key === 'C') {
      background(220);
    }
  }
  