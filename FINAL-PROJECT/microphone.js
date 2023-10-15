// SETTING UP THE MICROPHONE
class Microphone {
    constructor(){
        this.initialized = false; // keeps track of if the microphone is ready, when it is ready it sets to true.
        navigator.mediaDevices.getUserMedia({audio: true}) // Request access to the user's microphone
        .then(function(stream){
            this.audioContext = new AudioContext(); // Create an AudioContext for audio processing
            this.microphone = this.audioContext.createMediaStreamSource(stream); // Create a media stream source from the microphone stream
            this.analyser = this.audioContext.createAnalyser(); // Create an audio analyser for processing audio data
            this.analyser.fftSize = 512; // Set the Fast Fourier Transform (FFT) size for the analyser
            const bufferLength = this.analyser.frequencyBinCount; // Get the number of frequency bins from the analyser
            this.dataArray = new Uint8Array(bufferLength); // Create an array to store audio data
            this.microphone.connect(this.analyser); // Connect the microphone source to the analyser
            this.initialized = true; // Set the initialization flag to true once everything is set up
        }.bind(this)).catch(function(err){
            alert(err); // Display an alert with an error message if there is a problem accessing the microphone
        });
    }

    // Get normalized audio samples from the microphone
    getSamples(){
        this.analyser.getByteTimeDomainData(this.dataArray); // Get audio data in the time domain
        let normSamples = [...this.dataArray].map(e => e / 128 - 1); // Normalize the audio data to the range [-1, 1]
        return normSamples; // Return the normalized audio samples
    } 

    // Get the volume (amplitude) of the audio from the microphone
    getVolume(){
        this.analyser.getByteTimeDomainData(this.dataArray); // Get audio data in the time domain
        let normSamples = [...this.dataArray].map(e => e / 128 - 1); // Normalize the audio data to the range [-1, 1]
        let sum = 0;
        for(let i = 0; i < normSamples.length; i++){
            sum += normSamples[i] * normSamples[i]; // Calculate the sum of squared values of normalized samples
        }
        let volume = Math.sqrt(sum / normSamples.length); // Calculate the root mean square (RMS) of the audio samples to get the volume
        return volume; // Return the calculated volume
    }
}


//This microphone setup was inspired and some lines were taken from the youtube video: https://www.youtube.com/watch?v=qNEb9of714U&t=28s


/*EXPLAINATIONS:
Line 4: Setting this.initialized = false means initially assuming the microphone isn't ready. 
        This flag helps keep track of whether the microphone setup is done. When it's ready, the code will 
        change this.initialized to true.
-----------

Line 7: This line of code prepares the computer to understand and work with sounds in apps and websites. 
        It's like getting the right tools ready to play and mess around with sounds.
-----------

Line 8: This line creates a connection to your microphone and makes it ready to use in the program. 
        It's like plugging in a microphone so your computer can listen to it.
-----------


Line 9: This line sets up a tool that helps the computer understand and work with the sound from the microphone. 
        It's like giving the computer ears to listen to and analyze the sound.
-----------

Line 10:The fftSize is a built in property of AnalyserNode.
        In this code, `this.analyser.fftSize` is setting the size for analyzing audio. It's like deciding how detailed a picture you want. 
        A larger size gives you more detail but requires more computer power. In this case, `512` is chosen for a balance between detail and speed.
-----------

Line 11: This line figures out how many pieces the computer will use to understand sound. Think of it like counting how many 
         little parts the computer will use to analyze the sound.
-----------

Line 12: Here, we're creating a place to put all the information about the sound. 
         It's like having a box to store all the details of what the computer hears. 
         The Uint8Array is like a special container for storing numbers that are between 0 and 255. 
         In the code, I'm creating a container called dataArray with a specific size, and it will be 
         used to hold audio data. Each slot in this container can hold a number from 0 to 255, 
         which is useful for representing sound data.
-----------

Line 13: This line connects the microphone to the tool we set up earlier. It's like plugging the 
         microphone into the computer's listening tool so that the computer can start hearing what the microphone hears.
-----------

Line 14: This line tells the computer that everything is ready to go. 
        It's like flipping a switch to say, "Okay, we're all set up and can start listening to and analyzing the sound now."
-----------

Line 15-18: `}.bind(this))`: This is a way of making sure that the function inside the `.then` block has the correct context or "this." 
            It connects the function to the current instance of the `Microphone` class. In simple terms, it's like saying, 
            "Hey, when you run the code inside `.then`, make sure it knows it belongs to this microphone."

            `.catch(function(err){`: This is a part of a promise in JavaScript. If something goes wrong while trying 
            to access the microphone, the code inside the `.catch` block runs. It's like a backup plan for handling problems.

            `alert(err);`: If there's an error, this line displays a pop-up message on the screen with the error message. 
            It's like showing a message to the user that says, "Oops, something went wrong, and here's what it is.
            
            So, in simple terms, this code is all about setting things up to use the microphone, and if there's a problem, it lets you know what went wrong.

SO IN SUMMARY...
The microphone class takes audio data from Microphone, it gives us options to get these audio samples as an array of values using public getsamples method. 
OR we can get a total volume as a single number with getVolume method.
*/







/*Line: 4 - navigator.mediaDevices.getUserMedia({audio:true}) = This promises 
that the UserMedia will use either audio, video or camera, this case, audio. Each
promise waits for the next one to complete before it runs its code.

Web Audio API = a set of methods and properties that allow us to generate,
play and analyze audio. Canvas is for graphics, this is for sound.

createAnalyser - creates analyser node, which can be used to expose
audio time and frequency data to create visualisations.

fftSize (Line 9) Stands for fast Fourier transform, used to slize audio into equal
number of samples. Must be a power of 2 between 2^5 and 2^15. #2, 64, 128, 
256, 512, 1024, 2048, 4096, 8192, 16384 and 32768. If value is 
not declared, it defaults to 2048.

frequencyBinCount is ready only property and it's always equal to alf of 
fttSize value. So in this case, 512 = 256, so my vizualiser will have 256 bars.
(line 10)

connect allows us to direct data from one audio node to another (line 12)
*/

/*
I'm collecting microphone data, converting it to a suitiable format
creating analyzer node, setting it up and feeding my microphone data into
analyzer node so that it's ready to be used for audio visualizations. Then we
initialize it (line 13)

If user clicks that it's okay for the system to use their microphone, it will run
.then, otherwise it will be rejected and not run the code & show error message 
calling the function .alert(err)

if i run the code without using the built in bind method, the code will not understand
what .this means. It is like a reminder so that the code remember that this keyword
refers to this microphone object.

Uint8Array can only hold elements that are 8 bit unasigned integers between values
of 0 and 255.

Line 20 ... will spread the array iinto this new array literal I just created. It 
transforms the Unit8Array into a regular type of arrary so that i can call
built-in map method

Dataarray is values between 0-255, declaring them as e and then dividing them
by 128 will give me a set of values between 0-2. by putting -1, we get a range 
-1 to +1
*/