import Decoration from "/tgd-grave-et-resurrected/scripts/states/world/decoration.mjs";
const staticCache = {};
staticCache.decorations = [
	"/tgd-grave-et-resurrected/images/states/world/decorations/Tree.png",
	"/tgd-grave-et-resurrected/images/states/world/decorations/Skeleton.png",
	"/tgd-grave-et-resurrected/images/states/world/decorations/DeadBush.png",
	...Array.from({
		length: 24
	}, (value, key) => {
		return "/tgd-grave-et-resurrected/images/states/world/decorations/TombStone" + String(key + 1) + ".png";
	})
].map ((value) => {
	const image = document.createElement("img");
	image.src = value;
	return image;
});
export default class DecorationGenerator {
	constructor(parent) {
		this._parent = parent;
		this._count = -3 * this._parent.height;
		while (this._count < this._parent.height) {
			this._count += Math.floor(Math.random() * 100);
			this._parent.addDecoration(new Decoration(this, Math.floor(Math.random() * (this._parent.width - 50)), -this._count, staticCache.decorations[Math.floor(Math.random() * staticCache.decorations.length)]));
		}
	}
	update({delta, goTo, goBack}) {
		if (this._count < Math.max(this._parent.player.score, 0) + 2000) {
			this._count += Math.floor(Math.random() * 100);
			this._parent.addDecoration(new Decoration(this, Math.floor(Math.random() * (this._parent.width - 50)), -this._count, staticCache.decorations[Math.floor(Math.random() * staticCache.decorations.length)]));
		}
	}
};
