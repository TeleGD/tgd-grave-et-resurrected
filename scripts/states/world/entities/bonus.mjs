import {Ellipse} from "/tgd-grave-et-resurrected/scripts/utils/shapes.mjs";
import Entity from "/tgd-grave-et-resurrected/scripts/states/world/entity.mjs";
export default class Bonus extends Entity {
	constructor(parent, posX, posY, radius, colorOrImage) {
		super(parent, posX, posY, 1 / 3);
		this._radius = radius,
		this._shape = new Ellipse(this.posX + this._radius, this.posY + this._radius, this._radius);
		this._color = typeof colorOrImage === "string" ? colorOrImage : "#ff0000";
		this._image = typeof colorOrImage === "string" ? null : colorOrImage;
		this.gravity = -this.parent.parent.player.gravity;
	}
	update({delta, goTo, goBack}) {
		super.update({delta, goTo, goBack});
		if (this.posX > this.parent.parent.width) {
			this.teleport(this._radius * -2, this.posY);
		} else if (this.posX < this._radius * -2) {
			this.teleport(this.parent.parent.width, this.posY);
		}
		this._shape.locationX = this.posX;
		this._shape.locationY = this.posY;
		if (this.parent.parent.player.gravity != -this.gravity) {
			this.gravity = -this.parent.parent.player.gravity;
		}
	}
	render({canvasContext}) {
		if (this._image === null) {
			// canvasContext.setColor(this._color);
			// canvasContext.fillOval(this.posX, this.parent.parent.height / 2 + this.posY - this.parent.parent.player.posY, this._radius * 2, this._radius * 2);
		} else {
			canvasContext.drawImage(this._image, 0, 0, this._image.width, this._image.height, this.posX, this.parent.parent.height / 2 + this.posY - this.parent.parent.player.posY, this._radius * 2, this.parent.parent.height / 2 + this._radius * 2);
		}
	}
	get shape() {
		return this._shape;
	}
	get radius() {
		return this._radius;
	}
	apply(player) {}
	isApplied() {}
};
