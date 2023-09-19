//Step 1: Oscillators. Create sound source,  Creates a tone. Generates audio waveforms, which serve as the raw sound source for creating music and sound effects.
Tone.Oscillator 
//Sine wave, Square wave, Triangle wave, Sawtooth wave

/* You can control the Gate = Closes the signal (in tone.js you dont really need to program the gate) Pitch & Volume*/


//Step 2: Filters. Shaping the timbre and character of sound by selectively attenuating or boosting specific frequency components within an audio signal. 
Tone.Filter
//Lowpass & Highpass (What low and high frequentcies should be passed and not), Bandpass, Notch

//Project idea: The user can control the painting by creating certain sounds.

//Cutoff, this control allows you to specify at what point in the frequency spectrum the filter's effect begins.

/*Resonance, Emphasizes frequencies near the cutoff point. Increasing resonance can lead to a more pronounced and sometimes self-oscillating effect, where
the filter produces a pure sine wave at its resonant frequency*/


/*Step 3: Envelope. Used to shape the amplitude or loudness of a sound over time. Envelopes are essential for creating dynamic and expressive musical sounds by controlling how quickly a
sound evolves from its initial attack to its sustained level, and then how it decays or releases.*/
Tone.Envelope


//EFFECTS//
//Chorus, fakes doubling the sound. Creates a thicker, richer and more spacious sound.
Tone.Chorus

//Distortion. Intentionally altering the audio signal to introduce harmonic content and create a gritty, edgy or aggressive sound.
Tone.Distortion

/*Reverb. Fundamental audio effect used to simulate the reflection and diffusion of sound in acoustic spaces. Enhances the sense of space, 
depth and realism in audio recordings by adding a natural or artufucak sense of ambience.*/
// tonejs.github.io/docs/14.7.77/Reverb.html

/*Delay. An audio effect that creates one or more delayed copies of an original sound source. These delayed copies are then played
back at a specified time interval after the ori ginal sound, creatinga sense of space, depth, and rhythmic interest in a mix.*/
// tonejs.github.io/docs/14.7.58/Delay

