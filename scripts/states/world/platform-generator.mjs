import MovingPlatform from "/tgd-grave-et-resurrected/scripts/states/world/platforms/moving-platform.mjs";
import NormalPlatform from "/tgd-grave-et-resurrected/scripts/states/world/platforms/normal-platform.mjs";
import Portal from "/tgd-grave-et-resurrected/scripts/states/world/platforms/portal.mjs";
const staticCache = {};
staticCache.plateformeH1 = document.createElement("img");
staticCache.plateformeH1.src = "/tgd-grave-et-resurrected/images/states/world/platforms/plateformeH1.png";
staticCache.plateformeH2 = document.createElement("img");
staticCache.plateformeH2.src = "/tgd-grave-et-resurrected/images/states/world/platforms/plateformeH2.png";
staticCache.plateformeV1 = document.createElement("img");
staticCache.plateformeV1.src = "/tgd-grave-et-resurrected/images/states/world/platforms/plateformeV1.png";
staticCache.plateformeV2 = document.createElement("img");
staticCache.plateformeV2.src = "/tgd-grave-et-resurrected/images/states/world/platforms/plateformeV2.png";
staticCache.portalO = document.createElement("img");
staticCache.portalO.src = "/tgd-grave-et-resurrected/images/states/world/platforms/orangePortal.png";
staticCache.portalB = document.createElement("img");
staticCache.portalB.src = "/tgd-grave-et-resurrected/images/states/world/platforms/bluePortal.png";
export default class PlatformGenerator {
	constructor(parent) {
		this._parent = parent;
		this._count = Math.floor(Math.random() * 6);
		this._totalCount = 1;
		this._parent.addPlatform(new NormalPlatform(this, this._parent.width / 2 - 65, 90, 200, 30, true, staticCache.plateformeH1));
	}
	update({delta, goTo, goBack}) {
		if (500 * this._totalCount < this._parent.player.score + 1200) {
			this._totalCount += 1;
			if (this._count == 0) {
				this.createPlatform(Math.floor(Math.random() * 4) > 0, true);
				this._count = Math.floor(Math.random() * 6);
			} else {
				this.createPlatform(Math.floor(Math.random() * 4) > 0, false);
				this._count--;
			}
		}
	}
	get parent() {
		return this._parent;
	}
	createPlatform(normal, horizontal) {
		if (horizontal) {
			const image = Math.floor(Math.random() * 2) ? staticCache.plateformeH1 : staticCache.plateformeH2;
			if (normal) {
				this._parent.addPlatform(new NormalPlatform(this, Math.floor(Math.random() * (this._parent.width - 400)) + 100, this._parent.height / 2 - 500 * this._totalCount, 200, 30, horizontal, image));
			} else {
				this._parent.addPlatform(new MovingPlatform(this, Math.floor(Math.random() * (this._parent.width - 800)) + 200, this._parent.height / 2 - 500 * this._totalCount, 200, 30, horizontal, image));
			}
		} else {
			const image = Math.floor(Math.random() * 2) ? staticCache.plateformeV1 : staticCache.plateformeV2;
			if (normal) {
				const i = Math.floor(Math.random() * 16);
				if (i == 1 || i == 2) {
					const image1 = i == 1 ? staticCache.portalB : staticCache.portalO;
					const image2 = i == 2 ? staticCache.portalB : staticCache.portalO;
					const p1 = new Portal(this, 50, this._parent.height / 2 - 500 * this._totalCount - (Math.floor(Math.random() * this._parent.height / 2) - this._parent.height / 4), image1);
					const p2 = new Portal(this, this._parent.width - 190, this._parent.height / 2 - 500 * this._totalCount -(Math.floor(Math.random() * this._parent.height / 2) - this._parent.height / 4), image2);
					p1.couple = p2;
					p2.couple = p1;
					this._parent.addPlatform(p1);
					this._parent.addPlatform(p2);
				} else {
					this._parent.addPlatform(new NormalPlatform(this, Math.floor(Math.random() * 2) * (this._parent.width - 130) + 50, this._parent.height / 2 - 500 * this._parent.totalCount, 200, 30, horizontal, image));
				}
			} else {
				this._totalCount++;
				this._parent.addPlatform(new MovingPlatform(this, Math.floor(Math.random() * 2) * (this._parent.width - 130) + 50, this._parent.height / 2 - 500 * this._parent.totalCount, 200, 30, horizontal, image));
			}
		}
	}
};
