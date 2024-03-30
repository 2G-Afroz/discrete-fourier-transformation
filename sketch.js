let x =[];
let fouriers;
let rotators = [];
let path;

function setup() {
	createCanvas(800,800);

	let data = rabbitPath;
	let skip = 1;

	if(skip < 1)
		return;

	for(let i = 0; i < data.length; i+=skip) {
        x.push(new Complex(data[i][0]-425, data[i][1]-400));
    }

	fouriers = dft(x);
	// Sordting the four
    fouriers.sort((a, b) => b.radius - a.radius);
    rotators = getRotators(fouriers);

	path = [];
}
   
function draw() {
	background(0);

    for (let i = 0; i < rotators.length; i++) {
        rotators[i].update(TWO_PI/rotators.length);
        if (i < rotators.length - 1) {
            rotators[i + 1].setPos(rotators[i].getTail());
        }
        rotators[i].draw();
    }

    let tail = rotators[rotators.length-1].getTail();
    path.unshift(createVector(tail.x, tail.y));

    beginShape();
    noFill();
    stroke(255);
    for(let i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
    }
    endShape();

    noStroke();
    fill(255);
    text("Rotators: " + rotators.length, 10, 30);
}

/**
 * Performs the Discrete Fourier Transformation (DFT) on an array of complex numbers.
 *
 * @param {Complex[]} x - The input array of complex numbers.
 * @returns {Object[]} - An array of objects representing the Fourier transform results.
 */
function dft(x) {
    let X = [];
    let N = x.length;

    for (let k = 0; k < N; k++) {
        let sum = new Complex(0, 0);
        for (let n = 0; n < N; n++) {
            let phi = (2.0 * PI * k * n) / N;
            let c = new Complex(cos(phi), -sin(phi));
            sum.add(x[n].mult(c));
        }
        sum.re = sum.re / N;
        sum.im = sum.im / N;

        let rps = k;
        let radius = sqrt(sum.re * sum.re + sum.im * sum.im);
        let startAtAngle = atan2(sum.im, sum.re);

        let f = {
            rel: sum.re,
            img: sum.im,
            radius: radius,
            rps: rps,
            startAtAngle: startAtAngle
        };

        X.push(f);
    }

    return X;
}

/**
 * Creates an array of Rotator objects based on the given parameters.
 *
 * @param {Array} f - An array of objects representing the properties of each Rotator.
 * @returns {Array} - An array of Rotator objects.
 */
function getRotators(f) {
    let rotators = [];
    let centre = createVector(425, 425);

    for (let i = 0; i < f.length; i++) {
        let r = new Rotator(centre, f[i].radius, f[i].rps, f[i].startAtAngle, TWO_PI / f.length);
        centre = r.getTail();
        rotators.push(r);
    }

    return rotators;
}