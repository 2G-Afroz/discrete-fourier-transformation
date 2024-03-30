/**
 * Represents a complex number.
 * @class
 */
class Complex {
	/**
	 * Creates a new Complex instance.
	 * @constructor
	 * @param {number} re - The real part of the complex number.
	 * @param {number} im - The imaginary part of the complex number.
	 */
	constructor(re, im) {
		this.re = re;
		this.im = im;
	}

	/**
	 * Adds a complex number to the current complex number.
	 * @param {Complex} c - The complex number to be added.
	 */
	add(c) {
		this.re += c.re;
		this.im += c.im;
	}

	/**
	 * Multiplies the current complex number with another complex number.
	 * @param {Complex} c - The complex number to be multiplied with.
	 * @returns {Complex} The result of the multiplication.
	 */
	mult(c) {
		let re = this.re * c.re - this.im * c.im;
		let im = this.re * c.im + this.im * c.re;
		return new Complex(re, im);
	}
}