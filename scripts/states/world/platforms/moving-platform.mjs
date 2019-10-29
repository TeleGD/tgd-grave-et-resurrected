import Platform from "/tgd-grave-et-resurrected/scripts/states/world/platform.mjs";
export default class MovingPlatform extends Platform {
	// _countDown;
	// _speed;
	// _sens;
	constructor(parent, posX, posY, longueur, epaisseur, sens, image) {
		super(parent, posX, posY, longueur, epaisseur, sens, image);
		this._countDown = 3000;
		this._speed = .2;
		this._sens = sens; // BUG: conflict with parent instance field _sens
	}
	update({delta, goTo, goBack}) {
		super.update({delta, goTo, goBack});
		this._countDown -= delta;
		if (this._sens) {
			if (this._countDown < 0) {
				this._speed = -this._speed;
				this._countDown = 3000;
			}
			this.posX += this._speed * delta;
		} else {
			if (this._countDown < 0) {
				this._speed = -this._speed;
				this._countDown = 3000;
			}
			this.posY += this._speed * delta;
		}
	}
	get speedX() {
		return this._sens ? this._speed : 0;
	}
	get speedY() {
		return this._sens ? 0 : this._speed;
	}
};
