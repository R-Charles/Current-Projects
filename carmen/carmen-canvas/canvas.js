var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//squares -------------------------------

// c.fillStyle = 'rgba(255, 0, 0, 0.1)'
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 200, 0.1)'
// c.fillRect(200, 400, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.1)'
// c.fillRect(300, 200, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.7)'
// c.fillRect(50, 300, 100, 100);
// console.log(canvas);

// Line -----------

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(200,100);
// c.lineTo(200, 400);
// c.lineTo(50, 300);
// c.strokeStyle = "blue"
// c.stroke();

//Creating an arch for a circle -------

//n,n,n, start angle: Float, drawCounterClockwise
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'red';
// c.stroke();

function randomColor(){
    return("#" + (Math.floor(Math.random()*16777215).toString(16)));
}; //function for randomizing colors(or anything else)

// for (var i = 0; i < 300; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = randomColor('purple');
//     c.stroke();
// }

function Circle() {
    this.x = x;
    this.y = y;

    this.draw = function(){
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'purple';
        c.stroke();
    }
}

var circle = new Circle(200, 200);
// circle.draw();
    
var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = (Math.random() -0.5) *10;
var dy = (Math.random() -0.5) *10;
var radius = 30;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
    c.strokeStyle = randomColor('purple');
    c.stroke();

    if (x + radius > innerWidth || x - radius < 0) {
        dx = -dx;
    }
    if (y + radius > innerHeight || y - radius < 0) {
        dy = -dy;
    }

    x += dx;
    y += dy;
}

 animate();

