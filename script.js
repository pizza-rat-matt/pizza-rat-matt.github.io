const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// TODO: http://sketch.paperjs.org/#V/0.12.7/S/rVhfb9s2EP8qnIHVUmzLdtMOhT1ngDvsacUCZOhL6gdaom0msiRQlBOv8HffkRRlUqTiLJ2AIPLx7nh/fnc86nsvw3vSm/XuHgmPd71hL84T8XtTZTGneYaWOE0DNkTFEB2GSHCH6Ps39i1D8PAdLSOGE1qVaIHY3KIXOc04kAubfCAxzxnQDzZ9j5+/khjo04/2Qlbt78h2T6SyL5jvok2a5yxgaIyu0QC9D23+dV5lyV+bTUmEwP2qc3VZbTYejpIm5FbYXp4X9d/ZObADljPyhG7hNWhCIp4NTdPPeZqzGbLo4tlVZKa8YDhL8n0Qoit0/ctk2GYsMa8YFjmYoamzumZ0u+MZKUtYNRdPFus6JVnyBVI6Q/1USBDW1+uncG66NR6jz4xgThBGnDxzRDnZI56jhJZFio/gN5H5j6xASNY6ECJof8NvOxpxnnFI3kwKW9Y9VCWnGxrXXvZjYPMbqEkbQE5wwAxR2HMyh3+/tkECxMEgtAPfznxUVOUuMNB7hlAXUF4jIkAR4SQJmmgEoYftDDCl9MztoAVn2xRyB/gAsLer4QpRBxeQ7y3ftTFhWHESLycdU1HdUcFynvNjQSCmjQWQfUAf7K07QeCLabwj8eMyZwlhZWC7SjcoMAo+UpahG7PaQ7c+PCILU8Ta4+SmQDadwcLU42agKhLw7W6HC2JYrUpH/zJd646CwGJJ/xGhO1DyFIl3fxikZdEzAHZkoqgjApp7IbVHTzSBQAzMhtsdCGfLm04ll7cfvWXL43/y8qi93BHRot7o5lG76dNy2YDLftrwMCB0AR2qWksNY9kkNNHa6Y3NTTxa3z1dNeeuFN0SfqfbTUBD1zN/Eyv3eQ6nWvh/2dfkyuiqYKtWUI8QY/TBI9tY1pJdtGXnbclTmyCMz9SBFVBAyDREPzsu+IQKRg5K6AZNQvQb+D5CUzRzejJQvQpyPY94PHEEamboYuaBA7rVQgjOGkOSR8qNtfB6pWvCXBCerYTG95b+a0e971A00uAkR+l6GXAwc9ymOCZytpCTBObyXU0CoEP+kpB0gCr4AewllXOqWV2a2NHZYcqJuVG0a0/VwtDTZEs1Caik34GIs5gEa0VzDzwpZoN6gNb69d07pfenhQCRA3SJkwNhKS5a4DZ0jKQKL8YSyuQAbXRFYNe2RlnO9jiFDhnoTa7QJJpMP4b+XNeDOuBJKnaY1ppjZHJ4VcU4jZcCICUE26PIWBf8HQapllvz+dS8wNDRxSGpyzNwL2JC3hfs6M7bXHJkE1kQ7JH6BZ3m00T0GhjkLAFGYMjP3AoyrjlKw1jOgFfuJKtmpHDVgfVzZF9w7gcau5DixWtOG829/pOIal1HduwDXvj5eSK0F5frTzzynEnAfLHLK88S3cgAxoE0bgR7yo748oHSDakmBkbMaZaQ55ZFZvbrwbV9Q7iXcitP5uuVjrybpdA9n/xA4l84kd3YdpSivIo0XWM8HvketMcUcuJ7tKSEFdxkjAu7POmr/bKmTj9Jqs9fzdV2VB7759NFpsO8s7vjvpBovm50XOqMC92V/RnAusrpa1z7Q8F00roc632bjzBtCdhogIyuI+N0vneqzztSeNi4O6zdGKK+WEd9UKHGJbVpc443X4ny7A8Gt3sTX75Yq83ra50YlTzgauQeQE7uOodXWxYoXlBKHjEDyyM+UD8fVl1Hgd/UIUpFf7K2E8anPmubHev7cuC7afeGvTVY9ChrvOzN7lenfwE=

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const initBalls = [
    {'name' : 'Greencard',
        impact: 1,
        urgency: 0.21,
        effort: 0.21,
        comments: 'aosindaosidnjasoidn'
    },
    {'name' : 'Walk steps!',
        impact: 1,
        urgency: 0.5,
        effort: 0.1,
        comments: 'aosindaosidnjasoidn'
    },
    {'name' : 'EC paper',
        impact: 1,
        urgency: 0.5,
        effort: 0.1,
        comments: 'aosindaosidnjasoidn'
    },
    {'name' : 'Testing',
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
        this.size = impact * 60 + 5;
        this.speedX = urgency * 3 - 1.5;
        this.speedY = effort * 3 - 1.5;
        this.color = `rgb(${impact*255}, ${urgency*255}, ${effort*255})`;
        // this.text = new PointText({
        //     content: name,
        //     justification: 'center'
        // });
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fillText(this.name, this.x, this.y);
        console.log('I drew')
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