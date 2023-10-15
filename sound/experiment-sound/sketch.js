function setup() {
  createCanvas(800, 800);
  background(0);

  // Initialize Tone.js
  Tone.start();

  // Set up a p5.js draw loop
  const loop = new Tone.Loop((time) => {
    // Create a synth with a sine wave or square wave oscillator (50/50 chance)
    let synthtype;
    if (random() > 0.5) {
      synthtype = "sine";
    } else {
      synthtype = "square";
    }

    const synth = new Tone.Synth({
      oscillator: {
        type: synthtype
      }
    }).toDestination();

    // Generate a random point
    const x = random(width);
    const y = random(height);

    // Generate a random pitch
    const note = random(["C1", "C2", "C3", "A3", "A4", "A1", "A4"]);

    // Play the note
    synth.triggerAttackRelease(note, "8n", time);

    // Draw a circle at the random point
    fill(random(100), random(0), random(100));
    ellipse(x, y, 50, 50);
  }, "4n").start(0);

  // Start the Tone.js loop
  Tone.Transport.start();
}