export default class Decoration {
	// _parent;
	// _x;
	// _y;
	// _image;
	constructor(parent, x, y, image) {
		this._parent = parent;
		this._x = x;
		this._y = y;
		this._image = image;
	}
	update({delta, goTo, goBack}) {}
	render({canvasContext}, dy) {
		canvasContext.drawImage(this._image, this._x, this._parent.height / 2 + this._y - dy); // BUG: needs more parameters
	}
};
