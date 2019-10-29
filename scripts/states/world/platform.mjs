import {Rectangle} from "/tgd-grave-et-resurrected/scripts/utils/shapes.mjs";
const staticCache = {};
staticCache.piqueH = document.createElement("img");
staticCache.piqueH.src = "/tgd-grave-et-resurrected/images/states/world/platforms/spikesH.png";
staticCache.piqueV = document.createElement("img");
staticCache.piqueV.src = "/tgd-grave-et-resurrected/images/states/world/platforms/spikesV.png";
export default class Plateform extends Rectangle {
	// static _piqueH;
	// static _piqueV;
	// _parent;
	// _posX;
	// _posY;
	// _sens;
	// _image;
	// _destroyed;
	constructor(parent, posX, posY, lengthiness, thickness, sens, image) {
		super(posX, posY, sens ? lengthiness : thickness, sens ? thickness : lengthiness);
		this._parent = parent;
		this._posX = posX;
		this._posY = posY;
		this._sens = sens;
		this._image = image;
		this._destroyed = false;
	}
	update({delta, goTo, goBack}) {}
	render({canvasContext}, dy) {
		if (this._sens) {
			if (this._parent.parent.player.gravity == 0) {
				canvasContext.drawImage(this._image, this._posX, this._parent.parent.width / 2 + this._posY - dy); // BUG: needs more parameters
			} else {
				canvasContext.drawImage(staticCache.piqueH, this._posX, this._parent.parent.height / 2 + this._posY - dy); // BUG: needs more parameters
			}
		} else if (this._parent.parent.player.gravity == 0) {
			canvasContext.drawImage(staticCache.piqueV, this._posX, this._parent.parent.height / 2 + this._posY - dy); // BUG: needs more parameters
		} else {
			canvasContext.drawImage(this._image, this._posX, this._parent.parent.height / 2 + this._posY - dy); // BUG: needs more parameters
		}
	}
	get parent() {
		return this._parent;
	}
	get sens() {
		return this._sens;
	}
	set posX(posX) {
		this._posX = posX;
	}
	get posX() {
		return this._posX;
	}
	set posY(posY) {
		this._posY = posY;
	}
	get posY() {
		return this._posX;
	}
	get speedX() {
		return 0;
	}
	get speedY() {
		return 0;
	}
	set destroyed(destroyed) {
		this._destroyed = destroyed;
	}
	get destroyed() {
		return this._destroyed;
	}
};
