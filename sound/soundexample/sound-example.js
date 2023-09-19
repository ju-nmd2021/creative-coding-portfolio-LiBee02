let ball;
let synth;

function setup() {
    createCanvas(400, 400);
    ball = new Ball();
    synth = new Tone.Synth().toDestination();
}

function draw() {
    background(220);

    ball.move();
    ball.display();

    // Check if the ball hits the canvas boundaries
    if (ball.isAtEdge()) {
        // Trigger a sound when the ball hits the boundary
        synth.triggerAttackRelease("C4", "8n");
    }
}

class Ball {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.xSpeed = random(1, 3);
        this.ySpeed = random(1, 3);
        this.radius = 20;
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x > width - this.radius || this.x < this.radius) {
            this.xSpeed *= -1;
        }

        if (this.y > height - this.radius || this.y < this.radius) {
            this.ySpeed *= -1;
        }
    }

    display() {
        fill(255, 0, 0);
        noStroke();
        ellipse(this.x, this.y, this.radius * 2);
    }

    isAtEdge() {
        return (
            this.x >= width - this.radius ||
            this.x <= this.radius ||
            this.y >= height - this.radius ||
            this.y <= this.radius
        );
    }
}