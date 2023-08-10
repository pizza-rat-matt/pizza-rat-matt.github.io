const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 30 + 5;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Ball collision with walls
        if (this.size + this.x > canvas.width || this.x - this.size < 0) {
            this.speedX = -this.speedX;
        }

        if (this.size + this.y > canvas.height || this.y - this.size < 0) {
            this.speedY = -this.speedY;
        }

        this.draw();
    }
}

function populateInitialBalls() {
    for (let i = 0; i < 5; i++) { // Creates 5 balls. Change the number if needed.
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const ball = new Ball(x, y);

        // Optional: Set properties like name and effortLevel
        ball.name = "Ball " + (i + 1);
        ball.effortLevel = "medium"; // Or randomize this, if you'd like

        balls.push(ball);
    }
}

let clickX, clickY; // Variables to store click position

canvas.addEventListener('click', (e) => {
    clickX = e.clientX;
    clickY = e.clientY;
    $('#ballForm').modal('show'); // Using jQuery to show the modal
});


function addBall() {
    const ballName = document.getElementById('ballName').value;
    const effortLevel = document.getElementById('effortLevel').value;
    
    const ball = new Ball(clickX, clickY);
    ball.name = ballName;
    ball.effortLevel = effortLevel;

    // You can add logic here to change the ball's behavior based on the "effortLevel" if desired

    balls.push(ball);

    // Clear the form and hide it
    document.getElementById('ballName').value = "";
    document.getElementById('ballForm').style.display = 'none';
    
    // Hide the modal
    $('#ballForm').modal('hide');
}

// Update canvas
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        ball.update();
    });
    requestAnimationFrame(animate);
}

populateInitialBalls();
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});