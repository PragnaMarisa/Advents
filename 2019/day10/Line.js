export class Line {
  #x1Axis;
  #y1Axis;
  #x2Axis;
  #y2Axis;
  #a;
  #b;
  #c;

  constructor(x1, y1, x2, y2) {
    this.#x1Axis = x1;
    this.#x2Axis = x2;
    this.#y1Axis = y1;
    this.#y2Axis = y2;
    this.#a = this.#y2Axis - this.#y1Axis;
    this.#b = this.#x1Axis - this.#x2Axis;
    this.#c = this.#x2Axis * this.#y1Axis - this.#x1Axis * this.#y2Axis;
  }

  onLine(x, y) {
    return Math.abs(this.#a * x + this.#b * y + this.#c) <= 0;
  }
}
