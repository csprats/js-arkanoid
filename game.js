const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//points
let score = 0;
//ball
const ballimage = new Image();
ballimage.src = "./ballBlue.png"
let ballx = canvas.width / 2;
let bally = canvas.height - 30;
let bx = 0.25;
let by = -3;
let ballRadius = 22;
//paddle
const paddleimage = new Image();
paddleimage.src = "./paddleRed.png";
const paddleWidth = 104;
const paddleHeight = 24;
let paddlex = (canvas.width - paddleWidth) / 2;

let right = false;
let left = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.keyCode == 68) {
		right = true;
	}
	if (e.keyCode == 65) {
		left = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 68) {
		right = false;
	} else if (e.keyCode == 65) {
		left = false;
	}
}

//bricks
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 64;
const brickHeight = 32;
const brickImage = new Image();
brickImage.src = "./brick.png";
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 22.5;

let bricks = [];
for (c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (r = 0; r < brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1};
  }
}


function ballCollisions()
{
	
    if (ballx + bx > canvas.width - ballRadius || ballx + bx < 0) {
		bx = -bx;
	}
	if (bally + by < 0) {
		by = -by;
	}
	else if (bally + by > canvas.height - ballRadius - paddleHeight) {
		if (ballx > paddlex && ballx < paddlex + paddleWidth) {
			by = -by + -0.5;
			bx += 0.5;
		}
		else if (bally + by > canvas.height){
			alert(`Game over! Score: ${score}`);
			document.location.reload();
		}
	}
	for (c = 0; c < brickColumnCount; c++) {
		for (r = 0; r < brickRowCount; r++) {
			const b = bricks[c][r];
			if (b.status > 0) {
				if (
				  ballx > b.x &&
				  ballx < b.x + brickWidth &&
				  bally > b.y &&
				  bally < b.y + brickHeight
				) {
					  by = -by;
					  b.status -= 1;
					  score += 10;
				}
      }
		}
	}
}

function movePaddle() {
	
	  ctx.beginPath();
	  ctx.drawImage(paddleimage, paddlex,
	  canvas.height - paddleHeight);
	  ctx.fill();
	  ctx.closePath();
	  if (right && paddlex < canvas.width - paddleWidth) {
		paddlex += 18;
	} 
	  if (left && paddlex > 0) {
		paddlex -= 18;
	}
	//console.log(a);
	//console.log(d);

}

function moveBall() {
	
	  ctx.beginPath();
	  //ctx.arc(ballx, bally, ballRadius, 0, Math.PI * 2);
	  ctx.drawImage(ballimage, ballx, bally);
	  ctx.closePath();
	  ballx += bx;
	  bally += by;
	  ballCollisions();
}

function drawScore() {
  ctx.font = "16px Sans";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 8, canvas.height);
  if (score / 10 == brickRowCount * brickColumnCount)
  {
	  alert("You win!");
	  window.location.reload();
  }
}

function drawBricks()
{
	for (c = 0; c < brickColumnCount; c++) {
		for (r = 0; r < brickRowCount; r++) {
			if (bricks[c][r].status > 0)
			{
				const brickX = c * (brickWidth + brickPadding + brickOffsetLeft);
				const brickY = r * (brickHeight + brickPadding + brickOffsetTop);
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.drawImage(brickImage, brickX, brickY);
				ctx.closePath();
			}
		}
  }
}

function draw() {
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawScore();
	movePaddle();
	moveBall();
	requestAnimationFrame(draw); 
}
draw();
