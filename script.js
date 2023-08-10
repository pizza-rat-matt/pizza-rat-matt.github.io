const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const initBalls = [
    {'name' : 'freedom',
        impact: 1,
        urgency: 0.21,
        effort: 0.21,
        comments: 'aosindaosidnjasoidn'
    },
    {'name' : 'lonelyu',
        impact: 1,
        urgency: 0.5,
        effort: 0.1,
        comments: 'aosindaosidnjasoidn'
    },
]

const balls = [];

class Ball {
    constructor(name, x, y, impact=1, urgency=1, effort=1, comments="") {
        this.x = x;
        this.y = y;
        this.size = impact * 30 + 5;
        this.speedX = urgency * 3 - 1.5;
        this.speedY = effort * 3 - 1.5;
        this.color = `rgb(${impact*255}, ${urgency*255}, ${effort*255})`;
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initBalls.forEach(ball => {
        const bally = new Ball(ball.name, canvas.width/2, canvas.height/2, ball.impact, ball.urgency, ball.effort, ball.comments);
        console.log(ball.name)
        balls.push(bally);
    });

    for (let i = 0; i < 5; i++) { // Creates 5 balls. Change the number if needed.
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const impact = Math.random()
        const ball = new Ball("Slim Shady", x, y, impact);

        // Optional: Set properties like name and effortLevel

        ball.effortLevel = "medium"; // Or randomize this, if you'd like

        balls.push(ball);
    }

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const impact = Math.random()
    const ball = new Ball(x, y, impact);

    // Optional: Set properties like name and effortLevel
    ball.name = "asd";
    ball.effortLevel = "high"; // Or randomize this, if you'd like

    balls.push(ball);


}

let clickX, clickY; // Variables to store click position

canvas.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Check if any ball is clicked
    const clickedBall = balls.find(ball => {
        const distance = Math.sqrt((ball.x - x) ** 2 + (ball.y - y) ** 2);
        return distance < ball.radius;
    });

    if (clickedBall) {
        displayBallInfo(clickedBall);
    }
});

function displayBallInfo(ball) {
    document.getElementById('ballInfoName').textContent = ball.name;
    document.getElementById('ballInfoEffort').textContent = ball.effortLevel;

    $('#ballInfoModal').modal('show'); // Using jQuery to show the modal
}

function addBall() {
    const ballName = document.getElementById('ballInfoName').value;
    const effortLevel = document.getElementById('effortLevel').value;
    const impact = Math.rand()
    const ball = new Ball(clickX, clickY, impact);
    ball.name = ballName;
    ball.effortLevel = effortLevel;

    // You can add logic here to change the ball's behavior based on the "effortLevel" if desired

    balls.push(ball);

    // Clear the form and hide it
    document.getElementById('ballInfoName').value = "";
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