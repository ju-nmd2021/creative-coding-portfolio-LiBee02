let mic; // Represents the microphone source
let canvas; // Represents the HTML canvas element
let audioContext; // Manages audio processing
let analyser; // Analyzes audio data
let bufferLength; // Stores the number of frequency bins
let dataArray; // Stores audio data
let threshold = 45; // Adjust this threshold as needed; it determines audio level sensitivity.
let shapes = []; // Array to store information about the shapes

// Function to set up the microphone
function setupMicrophone() {
  // Create an audio context for audio processing (works in various browsers)
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Request access to the user's microphone
  navigator.mediaDevices
    .getUserMedia({ audio: true }) // Request microphone access from the user
    .then(function (stream) {
      mic = audioContext.createMediaStreamSource(stream); // Connect the microphone source
      analyser = audioContext.createAnalyser(); // Create an audio analyzer
      analyser.fftSize = 512; // Set the FFT size for analyzing audio
      bufferLength = analyser.frequencyBinCount; // Determine the number of frequency bins
      dataArray = new Uint8Array(bufferLength); // Create an array to store audio data
      mic.connect(analyser);
    })
    .catch(function (err) {
      alert(err); // Show an error message if microphone access fails
    });
}

// Function to set up the HTML canvas
function setupCanvas() {
  canvas = document.getElementById('myCanvas'); // Get the canvas element from the HTML
  canvas.width = window.innerWidth; // Set canvas width to the window width
  canvas.height = window.innerHeight; // Set canvas height to the window height
}

// Initialize the application
function setup() {
  setupCanvas(); // Set up the canvas
  setupMicrophone(); // Set up the microphone

  // Get the drawing context and set the background color
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with a black background

  // Start the animation
  requestAnimationFrame(animate);
}

// Function to create generative art based on audio input
function draw() {
  if (mic && analyser) {
    analyser.getByteFrequencyData(dataArray); // Get frequency data

    // Calculate the average audio level
    let sum = dataArray.reduce((acc, val) => acc + val, 0);
    let average = sum / bufferLength;

    // Determine shape size based on the audio level
    const shapeSize = average;

    // Determine shape color based on the audio level
    let shapeColor;
    if (average > threshold) {
      shapeColor = 'red';
    } else {
      shapeColor = 'blue';
    }

    // Clear the canvas
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get the current time
    const currentTime = new Date().getTime();

    // Remove shapes that have been on the screen for more than 10 seconds
    shapes = shapes.filter(shape => currentTime - shape.time < 10000);

    // Generate random position
    const posX = Math.random() * canvas.width;
    const posY = Math.random() * canvas.height;

    // Track the creation time of each shape
    const shapeTime = currentTime;

    // Add shape information to the shapes array
    shapes.push({ posX, posY, size: shapeSize, color: shapeColor, time: shapeTime });

    // Draw a random shape (rectangle or circle)
    ctx.fillStyle = shapeColor; // Set shape color

    shapes.forEach(shape => {
      if (Math.random() < 0.5) {
        // Draw a rectangle
        ctx.fillRect(shape.posX, shape.posY, shape.size, shape.size);
      } else {
        // Draw a circle
        ctx.beginPath();
        ctx.arc(shape.posX, shape.posY, shape.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }
}

// Animation loop using requestAnimationFrame
function animate() {
  draw(); // Call the draw function to create generative art
  requestAnimationFrame(animate); // Request the next animation frame
}

// Resize the canvas when the window is resized
function windowResized() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black'; // Set background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Start the generative art when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  setup(); // Initialize the app
});
