let r;

function setup() {
	createCanvas(800,800);

	r = new Rotator(createVector(400, 400), 100, 4, 1);
}
   
function draw() {
	background(0);
	r.update(0.01);
	r.draw();
}


   