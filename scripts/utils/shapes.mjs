export class Ellipse {
	// _centerX;
	// _centerY;
	// _radiusX;
	// _radiusY;
	constructor(centerX, centerY, radiusX, radiusY = radiusX) {
		this._centerX = centerX;
		this._centerY = centerY;
		this._radiusX = radiusX;
		this._radiusY = radiusY;
	}
	set locationX(locationX) {
		this._centerX = locationX + this._radiusX;
	}
	get locationX() {
		return this._centerX - this._radiusX;
	}
	set locationY(locationY) {
		this._centerY = locationY + this._radiusY;
	}
	get locationY() {
		return this._centerY - this._radiusY;
	}
	set sizeX(sizeX) {
		this._centerX += sizeX / 2 - this._radiusX;
	}
	get sizeX() {
		return this._radiusX * 2;
	}
	set sizeY(sizeY) {
		this._centerY += sizeY / 2 - this._radiusY;
	}
	get sizeY() {
		return this._radiusY * 2;
	}
	set centerX(centerX) {
		this._centerX = centerX;
	}
	get centerX() {
		return this._centerX;
	}
	set centerY(centerY) {
		this._centerY = centerY;
	}
	get centerY() {
		return this._centerY;
	}
	set radiusX(radiusX) {
		this._radiusX = radiusX;
	}
	get radiusX() {
		return this._radiusX;
	}
	set radiusY(radiusY) {
		this._radiusY = radiusY;
	}
	get radiusY() {
		return this._radiusY;
	}
};
export class Rectangle {
	// _locationX;
	// _locationY;
	// _sizeX;
	// _sizeY;
	constructor(locationX, locationY, sizeX, sizeY) {
		this._locationX = locationX;
		this._locationY = locationY;
		this._sizeX = sizeX;
		this._sizeY = sizeY;
	}
	set locationX(locationX) {
		this._locationX = locationX;
	}
	get locationX() {
		return this._locationX;
	}
	set locationY(locationY) {
		this._locationY = locationY;
	}
	get locationY() {
		return this._locationY;
	}
	set sizeX(sizeX) {
		this._sizeX += sizeX;
	}
	get sizeX() {
		return this._sizeX;
	}
	set sizeY(sizeY) {
		this._sizeY += sizeY;
	}
	get sizeY() {
		return this._sizeY;
	}
};
