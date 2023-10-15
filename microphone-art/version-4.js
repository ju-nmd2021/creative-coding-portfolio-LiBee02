let mic; // Represents the microphone source
let canvas; // Represents the HTML canvas element
let audioContext; // Manages audio processing
let analyser; // Analyzes audio data
let bufferLength; // Stores the number of frequency bins
let dataArray; // Stores audio data
let threshold = 55; // Adjust this threshold as needed; it determines audio level sensitivity.

// Array of random edge counts
const randomEdges = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// Function to set up the microphone
function setupMicrophone() {
  // Create an audio context for audio processing (works in various browsers)
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Request access to the user's microphone
  navigator.mediaDevices
    .getUserMedia({ audio: true }) // Request microphone access
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

    // Determine stroke color based on the audio level
    let strokeColor;
    if (average > threshold) {
      strokeColor = 'red';
    } else {
      strokeColor = 'blue';
    }

    // Generate random position
    const posX = Math.random() * canvas.width;
    const posY = Math.random() * canvas.height;

    // Get a random number of edges from the array
    const randomEdgeCount = randomEdges[Math.floor(Math.random() * randomEdges.length)];

    // Generate a random stroke weight (line thickness)
    const randomStrokeWeight = Math.random() * 5 + 1; // Random value between 1 and 6

    // Draw a shape with the random number of edges and random stroke weight
    drawRandomShape(posX, posY, shapeSize, randomEdgeCount, strokeColor, randomStrokeWeight);
  }
}

// Helper function to draw a shape with a random number of edges and random stroke weight
function drawRandomShape(x, y, size, edgeCount, strokeColor, strokeWeight) {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = strokeColor; // Set stroke color
  ctx.lineWidth = strokeWeight; // Set stroke weight
  const angle = (Math.PI * 2) / edgeCount;
  ctx.beginPath();
  ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
  for (let i = 1; i <= edgeCount; i++) {
    ctx.lineTo(x + size * Math.cos(angle * i), y + size * Math.sin(angle * i));
  }
  ctx.closePath();
  ctx.stroke();
}

// Resize the canvas when the window is resized
function windowResized() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black'; // Set background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Start the generative
// Start the generative art when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  setup(); // Initialize the app
  setInterval(draw, 100); // Call the draw function at a fixed interval to create generative art
});
