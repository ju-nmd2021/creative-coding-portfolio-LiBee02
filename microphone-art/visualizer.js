function main(){
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Bar{
        constructor(x, y, width, height, color){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
        }
        update(micInput){
            this.height = micInput * 1000;
        } 
        draw(context){ 
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    const microphone = new Microphone();
    let bars = [];
    let barWidth = canvas.width/256;
    function createBars(){
        for (let i = 0; i < 256; i++){
            let color = 'hsl('+ i * 2 +', 100%, 50%';
            bars.push(new Bar(i * barWidth, canvas.height/2, 1, 20, color));
        }
    }
    createBars();
    console.log(bars);
    
    function animate(){
        if(microphone.initialized){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // generates audio samples from microphone
            const samples = microphone.getSamples();
            // animate bars based on microphone data
            bars.forEach(function(bar, i){
                bar.update(samples[i]);
                bar.draw(ctx);
            });
        }
        requestAnimationFrame(animate);
    }
    animate();
}

/*putting global variables directly to classes is a bad practise, 
that's why it's better to pass global variables as arguments to our public methods 
(ctx) as I'm passing ctx to draw on line 29 bar1:draw(ctx);*/

/*Inside of the createBars function I will create a for loop that will
run 256 times. On my Microphone class I set fft size to 512, that gives
me 256 audio sample slices
The bar class constructor has 5 attributes, so I define them here as,
x = i, y = 0, width = 10, height = 100, color = gold.
*/