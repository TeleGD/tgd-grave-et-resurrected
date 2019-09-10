import Platform from "/tgd-grave-et-resurrected/scripts/states/world/platform.mjs";
export default class NormalPlatform extends Platform {
	constructor(parent, posX, posY, longueur, epaisseur, sens, image) {
		super(parent, posX, posY, longueur, epaisseur, sens, image);
	}
};
