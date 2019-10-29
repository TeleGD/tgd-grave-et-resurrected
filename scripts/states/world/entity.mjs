const staticCache = {}
staticCache.gravity = .00144;
export default class Entity {
	// static _gravity; // BUG: conflict with instance field _gravity
	// _parent;
	// _frozen;
	// _gravity;
	// _dilation;
	// _dirX;
	// _dirY;
	// _posX;
	// _posY;
	// _speedX;
	// _speedY;
	// _accX;
	// _accY;
	// _maxSpeed;
	constructor(parent, posX, posY, dilation) {
		this._parent = parent;
		this._frozen = false;
		this._gravity = 0;
		this._dilation = dilation;
		this._dirX = 0;
		this._dirY = 0;
		this._posX = posX;
		this._posY = posY;
		this._speedX = 0;
		this._speedY = 0;
		this._accX = 0;
		this._accY = staticCache.gravity * dilation;
		this._maxSpeed = .96;
	}
	update({delta, goTo, goBack}) {
		if (!this._frozen) {
			this._speedX += this._accX * delta / 2;
			this._speedY += this._accY * delta / 2;
		}
		const modSpeed = Math.hypot(this._speedX, this._speedY);
		if (modSpeed > this._maxSpeed) {
			this._speedX *= this._maxSpeed / modSpeed;
			this._speedY *= this._maxSpeed / modSpeed;
		}
		this._posX += (this._speedX + this._dirX) * delta;
		this._posY += (this._speedY + this._dirY) * delta;
	}
	render({canvasContext}) {}
	isFrozen() {
		return this._frozen;
	}
	freeze() {
		if (!this._frozen) {
			this._frozen = true;
			this._speedX = 0;
			this._speedY = 0;
		}
	}
	unFreeze() {
		if (this._frozen) {
			this._frozen = false;
		}
	}
	jump(dir) {
		if (this._frozen) {
			this._frozen = false;
			switch (this._gravity) {
				case -1: {
					this._speedX += dir;
					break;
				}
				case 0: {
					this._speedY -= dir;
					break;
				}
				case 1: {
					this._speedX -= dir;
				}
			}
		}
	}
	teleport(posX, posY) {
		this._posX = posX;
		this._posY = posY;
	}
	get parent() {
		return this._parent;
	}
	set gravity(gravity) {
		this._gravity = gravity;
		switch (gravity) {
			case -1:
				this._accX = -staticCache.gravity * this._dilation;
				this._accY = 0;
				break;
			case 0:
				this._accX = 0;
				this._accY = staticCache.gravity * this._dilation;
				break;
			case 1:
				this._accX = staticCache.gravity * this._dilation;
				this._accY = 0;
		}
	}
	get gravity() {
		return this._gravity;
	}
	set dirX(dirX) {
		this._dirX = dirX;
	}
	get dirX() {
		return this._dirX;
	}
	set dirY(dirY) {
		this._dirY = dirY;
	}
	get dirY() {
		return this._dirY;
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
		return this._posY;
	}
};
