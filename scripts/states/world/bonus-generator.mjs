import Weightlessness from "/tgd-grave-et-resurrected/scripts/states/world/entities/bonuses/weightlessness.mjs";
export default class BonusGenerator {
	constructor(parent) {
		this._parent = parent;
		this._count = 0;
	}
	update({delta, goTo, goBack}) {
		if (this._count < Math.max(this._parent.player.score, 0)) {
			this._parent.addBonus(new Weightlessness(this, Math.floor(Math.random() * this._parent.width), -this._count, 30));
		}
	}
	get parent() {
		return this._parent;
	}
};
