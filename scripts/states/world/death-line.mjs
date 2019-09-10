const staticCache = {};
staticCache.souls = document.createElement("img");
staticCache.souls.src = "/tgd-grave-et-resurrected/images/states/world/souls.png";
export default class DeathLine {
	constructor(parent) {
		this._parent = parent;
		this._posY = parent.height * 3;
		this._speed = -.32;
	}
	update({delta, goTo, goBack}) {
		this._posY += this._speed * delta;
	}
	render({canvasContext}, dy) {
		canvasContext.drawImage(staticCache.souls, 0, 0, staticCache.souls.width, staticCache.souls.height, 0, this._parent.height / 2 + this._posY - dy, this._parent.width, staticCache.souls.height);
	}
	set posY(posY) {
		this._posY = posY;
	}
	get posY() {
		return this._posY;
	}
	set speed(speed) {
		this._speed = speed;
	}
	get speed() {
		return this._speed;
	}
};
