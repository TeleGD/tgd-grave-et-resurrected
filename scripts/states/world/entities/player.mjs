import {Ellipse} from "/tgd-grave-et-resurrected/scripts/utils/shapes.mjs";
import Entity from "/tgd-grave-et-resurrected/scripts/states/world/entity.mjs";
const staticCache = {};
staticCache.imageB = document.createElement("img");
staticCache.imageB.src = "/tgd-grave-et-resurrected/images/states/world/entities/player/monster.png";
staticCache.leftArrow = document.createElement("img");
staticCache.leftArrow.src = "/tgd-grave-et-resurrected/images/states/world/entities/player/leftArrow.png";
staticCache.rightArrow = document.createElement("img");
staticCache.rightArrow.src = "/tgd-grave-et-resurrected/images/states/world/entities/player/rightArrow.png";
staticCache.downArrow = document.createElement("img");
staticCache.downArrow.src = "/tgd-grave-et-resurrected/images/states/world/entities/player/downArrow.png";
export default class Player extends Entity {
	constructor(parent, posX, posY, name) {
		super(parent, posX, posY, 1);
		this._gravityPoint = 8;
		this._score = 0;
		this._portalCooldown = 0;
		this._width = 70;
		this._height = 70;
		this._baseSpeed = .4;
		this._jumpSpeed = .64;
		this._widthRelation = this._width / staticCache.imageB.width;
		this._heightRelation = this._height / staticCache.imageB.height;
		this._shapeWidth = this._widthRelation * 1675;
		this._shapeHeight = this._heightRelation * 1567;
		this._shapeStartHeight = this._heightRelation * 161;
		this._name = name;
		this._platform = null;
		this._shapeL = new Ellipse(this.posX + (this._height - this._shapeStartHeight) / 2, this.posY + this._height / 2, this._shapeHeight / 2, this._shapeWidth / 2);
		this._shapeD = new Ellipse(this.posX + this._width / 2, this.posY + this._shapeStartHeight + (this._height - this._shapeStartHeight) / 2, this._shapeWidth / 2, this._shapeHeight / 2);
		this._shapeR = new Ellipse(this.posX + this._shapeStartHeight + (this._height - this._shapeStartHeight) / 2, this.posY + this._height / 2, this._shapeHeight / 2, this._shapeWidth / 2);
		this._currentShape = this._shapeD;
		this._background = new Ellipse(this.posX + this._width / 2, this.posY + this._width / 2, this._width * 1.5);
		this._image = staticCache.imageB;
		this._BUTTON_SPACE = false;
		this._BUTTON_LEFT = false;
		this._BUTTON_DOWN = false;
		this._BUTTON_RIGHT = false;
	}
	get name() {
		return this._name;
	}
	listen({emulatedGamepads}) {
		for (const emulatedGamepad of emulatedGamepads) {
			if (emulatedGamepad === null) {
				continue;
			}
			if (emulatedGamepad.buttons[5].pressed) {
				this._BUTTON_SPACE = true;
			} else if (emulatedGamepad.buttons[2].pressed) {
				this._BUTTON_LEFT = true;
			} else if (emulatedGamepad.buttons[0].pressed) {
				this._BUTTON_DOWN = true;
			} else if (emulatedGamepad.buttons[1].pressed) {
				this._BUTTON_RIGHT = true;
			} else if (emulatedGamepad.buttons[12].pressed) {
				this._BUTTON_W = true;
			} else if (emulatedGamepad.buttons[14].pressed) {
				this._BUTTON_A = true;
			} else if (emulatedGamepad.buttons[13].pressed) {
				this._BUTTON_S = true;
			} else if (emulatedGamepad.buttons[15].pressed) {
				this._BUTTON_D = true;
			}
			break;
		}
	}
	update({delta, goTo, goBack}) {
		if (this._BUTTON_SPACE) {
			this._BUTTON_SPACE = false;
			if (this._platform != null) {
				this._platform.destroyed = true;
				this._platform = null;
				this._gravityPoint += this.gravity == 0 ? 2 : 1;
				this.jump(this._jumpSpeed * ((this.gravity + 1) % 2 + 1));
			} else if (this.isFrozen()) {
				this.unFreeze();
			}
		}
		if (!this.isFrozen()) {
			this.changeGravity();
		}
		this.changeDirection();
		super.update({delta, goTo, goBack});
		this._shapeD.locationX = this.posX;
		this._shapeD.locationY = this.posY + this._shapeStartHeight;
		this._shapeL.locationX = this.posX;
		this._shapeL.locationY = this.posY;
		this._shapeR.locationX = this.posX + this._shapeStartHeight;
		this._shapeR.locationY = this.posY;
		this._background.centerX = this.posX + this._width / 2;
		this._background.centerY = this.parent.height / 2 + this._height / 2;
		this._score = -this.posY > this._score ? -this.posY : this._score;
		this._portalCooldown = this._portalCooldown > 0 ? this._portalCooldown - delta : 0;
	}
	render({canvasContext}) {
		canvasContext.save();
		canvasContext.beginPath();
		switch (this.gravity) {
			case -1: {
				canvasContext.fillStyle = canvasContext.createPattern(staticCache.leftArrow, "repeat");
				break;
			}
			case 0: {
				canvasContext.fillStyle = canvasContext.createPattern(staticCache.downArrow, "repeat");
				break;
			}
			case 1: {
				canvasContext.fillStyle = canvasContext.createPattern(staticCache.rightArrow, "repeat");
				break;
			}
		}
		canvasContext.ellipse(this._background.centerX, this._background.centerY, this._background.radiusX, this._background.radiusY, 0, 0, Math.PI * 2);
		canvasContext.closePath();
		canvasContext.fill();
		canvasContext.beginPath();
		canvasContext.translate(this.posX + this._width / 2, this.parent.height / 2 + this._height / 2);
		canvasContext.rotate(-this.gravity * Math.PI / 2);
		canvasContext.drawImage(this._image, 0, 0, this._image.width, this._image.height, -this._width / 2, -this._height / 2, this._width, this._height);
		canvasContext.restore();
	}
	changeGravity() {
		const left = this._BUTTON_LEFT && !this._BUTTON_DOWN && !this._BUTTON_RIGHT && this.gravity != -1;
		const down = this._BUTTON_DOWN && !this._BUTTON_LEFT && !this._BUTTON_RIGHT && this.gravity != 0;
		const right = this._BUTTON_RIGHT && !this._BUTTON_LEFT && !this._BUTTON_DOWN && this.gravity != 1;
		if (this._gravityPoint > 0) {
			if (left) {
				this._BUTTON_LEFT = false;
				this.gravity = -1;
				this._currentShape = this._shapeL;
				this._gravityPoint--;
			} else if (down) {
				this._BUTTON_DOWN = false;
				this.gravity = 0;
				this._currentShape = this._shapeD;
				this._gravityPoint--;
			} else if (right) {
				this._BUTTON_RIGHT = false;
				this.gravity = 1;
				this._currentShape = this._shapeR;
				this._gravityPoint--;
			}
		}
	}
	changeDirection() {
		const d = this._BUTTON_D && !this._BUTTON_A && this.gravity == 0;
		const q = this._BUTTON_A && this._BUTTON_D && this.gravity == 0;
		const z = this._BUTTON_W && !this._BUTTON_S && this.gravity != 0;
		const s = this._BUTTON_S && this._BUTTON_W && this.gravity != 0;
		this.dirX = 0;
		this.dirY = 0;
		if (this._platform != null) {
			this.dirX += this._platform.speedX;
			this.dirY += this._platform.speedY;
		} else if (q) {
			this.dirX = -baseSpeed;
			this._BUTTON_A = false;
		} else if (d) {
			this.dirX = baseSpeed;
			this._BUTTON_D = false;
		} else if (s) {
			this.dirY = baseSpeed;
			this._BUTTON_S = false;
		} else if (z) {
			this.dirY = -baseSpeed;
			this._BUTTON_W = false;
		}
	}
	get score() {
		return this._score;
	}
	get gravityPoint() {
		return this._gravityPoint;
	}
	get shape() {
		return this._currentShape;
	}
	get width() {
		return this._width;
	}
	set platform(platform) {
		this._platform = platform;
	}
	set portalCooldown(portalCooldown) {
		this._portalCooldown = portalCooldown;
	}
	get portalCooldown() {
		return this._portalCooldown;
	}
};
