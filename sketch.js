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