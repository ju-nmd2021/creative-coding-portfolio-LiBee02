let mic; // Represents the microphone source
let canvas; // Represents the HTML canvas element
let audioContext; // Manages audio processing
let analyser; // Analyzes audio data
let bufferLength; // Stores the number of frequency bins
let dataArray; // Stores audio data
let threshold = 45; // Adjust this threshold as needed, it determines audio level sensitivity.

// Function to set up the microphone
function setupMicrophone() {
  // Create an audio context for audio processing (works in various browsers)
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Request access to the user's microphone
  navigator.mediaDevices
    .getUserMedia({ audio: true }) //is a request for microphone access from the user.
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

    // Determine shape color based on the audio level
    let shapeColor;
    if (average > threshold) {
      shapeColor = 'red';
    } else {
      shapeColor = 'blue';
    }

    // Generate random position
    const posX = Math.random() * canvas.width;
    const posY = Math.random() * canvas.height;

    // Draw a random shape (rectangle or circle)
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = shapeColor; // Set shape color

    if (Math.random() < 0.5) {
      // Draw a rectangle
      ctx.fillRect(posX, posY, shapeSize, shapeSize);
    } else {
      // Draw a circle
      ctx.beginPath();
      ctx.arc(posX, posY, shapeSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
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
  setInterval(draw, 100); // Call the draw function at a fixed interval to create generative art
});


/* 
ctx is an abbreviation for "context." It typically refers to a drawing context in the HTML5 <canvas> element. 
The context provides a set of methods and properties that allow you to draw and manipulate graphics on the canvas.

So in simple terms... ctx is like a virtual paintbrush that you use to draw on the canvas. It has commands to change colors, 
draw shapes, and more. By using ctx, you can create and modify visual elements on the canvas, such as rectangles, circles, and colors.

SOURCES OF INSPIRATION:
https://www.youtube.com/watch?v=q2IDNkUws-A
https://www.youtube.com/watch?v=wCpxmvaf_FQ 
https://medium.com/hackernoon/creative-coding-using-the-microphone-to-make-sound-reactive-art-part1-164fd3d972f3 
https://www.youtube.com/watch?v=qNEb9of714U&t=28s 

*/