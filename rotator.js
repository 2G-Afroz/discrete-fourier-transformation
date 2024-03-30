/**
 * Represents a Rotator object.
 */
class Rotator {
	/**
	 * Creates a new Rotator.
	 * @param {p5.Vector} pos - The position of the Rotator.
	 * @param {number} length - The length of the Rotator.
	 * @param {number} rps - The rotation speed in revolutions per second.
	 * @param {number} startAtAngle - The starting angle of the Rotator in radians.
	 */
	constructor(pos, length, rps, startAtAngle) {
		this.pos = pos;
		this.length = length;
		this.rps = rps;
		this.startAtAngle = startAtAngle;
		this.t = 0.0;
		this.tail = createVector(this.pos.x + this.length, this.pos.y);
	}

	/**
	 * Updates the Rotator's position based on the elapsed time.
	 * @param {number} dt - The elapsed time in seconds.
	 */
	update(dt) {
		let angle = this.t * this.rps + this.startAtAngle;
		this.tail.x = cos(angle) * this.length + this.pos.x;
		this.tail.y = sin(angle) * this.length + this.pos.y;
		this.t += dt;
	}

	/**
	 * Draws the Rotator on the canvas.
	 */
	draw() {
		stroke(255, 255, 255, 80);
		line(this.pos.x, this.pos.y, this.tail.x, this.tail.y);
		noFill();
		ellipse(this.pos.x, this.pos.y, this.length * 2);
	}

	/**
	 * Sets the position of the Rotator.
	 * @param {p5.Vector} pos - The new position of the Rotator.
	 */
	setPos(pos) {
		this.pos = pos;
	}

	/**
	 * Returns the tail position of the Rotator.
	 * @returns {p5.Vector} - The tail position of the Rotator.
	 */
	getTail() {
		return this.tail;
	}
}