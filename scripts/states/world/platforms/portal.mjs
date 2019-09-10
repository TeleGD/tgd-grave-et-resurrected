import Platform from "/tgd-grave-et-resurrected/scripts/states/world/platform.mjs";
export default class Portal extends Platform {
	constructor(parent, posX, posY, image) {
		super(parent, posX, posY, 200, 140, false, image);
		this._couple = this;
	}
	render({canvasContext}, dy) {
		canvasContext.drawImage(this._image, this.posX, this.parent.parent.height / 2 + this.posY - dy); // BUG: needs more parameters
	}
	set couple(couple) {
		this._couple = couple;
	}
	get couple() {
		return this._couple;
	}
};
