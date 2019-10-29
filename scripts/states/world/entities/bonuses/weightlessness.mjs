import Bonus from "/tgd-grave-et-resurrected/scripts/states/world/entities/bonus.mjs";
import Player from "/tgd-grave-et-resurrected/scripts/states/world/entities/player.mjs";
const staticCache = {};
staticCache.image = document.createElement("img");
staticCache.image.src = "/tgd-grave-et-resurrected/images/states/world/entities/bonuses/weightlessness.png";
export default class Weightlessness extends Bonus {
	// static _image;
	// _applied;
	// _count;
	// _player;
	constructor(parent, posX, posY, radius) {
		super(parent, posX, posY, radius, staticCache.image);
		// super.freeze();
		this._applied = false;
		this._count = 2000;
		this._player = null;
	}
	update({delta, goTo, goBack}) {
		super.update({delta, goTo, goBack});
		if (this._player != null && !this._applied) {
			if (!this._player.isFrozen()) {
				this._applied = true;
			} else {
				this._count -= delta;
				if (this._count <= 0) {
					this._applied = true;
					this._player.unFreeze();
				}
			}
		}
	}
	render({canvasContext}) {
		if (this._player == null) {
			super.render({canvasContext});
		}
	}
	apply(player) {
		if (player != null && this._player == null) {
			this._player = player;
			this._player.freeze();
		}
	}
	isApplied() {
		return this._applied;
	}
};
