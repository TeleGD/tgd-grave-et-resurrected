import {State} from "/tgd-grave-et-resurrected/node_modules/noyo/state.mjs";
import {initButton, listenButton} from "/tgd-grave-et-resurrected/scripts/utils/buttons.mjs";
import {rectangleIntersectsEllipse, rectangleContainsEllipse} from "/tgd-grave-et-resurrected/scripts/utils/intersections.mjs";
import BonusGenerator from "/tgd-grave-et-resurrected/scripts/states/world/bonus-generator.mjs";
import DeathLine from "/tgd-grave-et-resurrected/scripts/states/world/death-line.mjs";
import DecorationGenerator from "/tgd-grave-et-resurrected/scripts/states/world/decoration-generator.mjs";
import Interface from "/tgd-grave-et-resurrected/scripts/states/world/interface.mjs";
// import Platform from "/tgd-grave-et-resurrected/scripts/states/world/platform.mjs";
import Player from "/tgd-grave-et-resurrected/scripts/states/world/entities/player.mjs";
import PlatformGenerator from "/tgd-grave-et-resurrected/scripts/states/world/platform-generator.mjs";
import Portal from "/tgd-grave-et-resurrected/scripts/states/world/platforms/portal.mjs";
const defouloir = document.createElement("audio");
defouloir.src = "/tgd-grave-et-resurrected/musics/defouloir.ogg";
defouloir.loop = true;
defouloir.volume = .4;
const trash = document.createElement("audio");
trash.src = "/tgd-grave-et-resurrected/sounds/trash.ogg";
trash.volume = .4;
export default class World extends State {
	play() {
		defouloir.play();
		this._width = 1280; // TODO: remove
		this._height = 720; // TODO: remove
		this._player = new Player(this, this._width / 2, 0, "Amos");
		this._interface = new Interface(this, this._player);
		this._line = new DeathLine(this);
		this._platforms = [];
		this._bonuses = [];
		this._decorations = [];
		this._platformGenerator = new PlatformGenerator(this, this._player);
		this._bonusGenerator = new BonusGenerator(this);
		this._decorationGenerator = new DecorationGenerator(this, this._player);
		this._color = "#1e3514";
		this._select = initButton(true);
		this._start = initButton(true);
	}
	pause() {
		defouloir.pause();
	}
	resume() {
		defouloir.play();
		this._select = initButton(true);
		this._start = initButton(true);
	}
	stop() {
		defouloir.pause();
	}
	listen({emulatedGamepads}) {
		for (const emulatedGamepad of emulatedGamepads) {
			if (emulatedGamepad === null) {
				continue;
			}
			this._select = listenButton(this._select.down, emulatedGamepad.buttons[8].pressed);
			this._start = listenButton(this._start.down, emulatedGamepad.buttons[9].pressed);
			break;
		}
		this._player.listen({emulatedGamepads});
	}
	update({delta, goTo, goBack}) {
		if ((this._select.pressed || this._start.pressed) && this.successors.length > 0) {
			goTo(this.successors[0]);
			return;
		}
		this._line.update({delta, goTo, goBack});
		for (const platform of this._platforms) {
			platform.update({delta, goTo, goBack});
		}
		for (const bonus of this._bonuses) {
			bonus.update({delta, goTo, goBack});
		}
		for (let i = this._platforms.length - 1; i >= 0; i--) {
			const platform = this._platforms[i];
			if (platform.posY >= this._line.posY || platform.destroyed) {
				this._platforms.splice(i, 1);
				trash.play(1);
			}
		}
		for (let i = this._bonuses.length - 1; i >= 0; i--) {
			const bonus = this._bonuses[i];
			if (bonus.isApplied() || bonus.posY >= this._line.posY) {
				this._bonuses.splice(i, 1);
				trash.play(1);
			}
		}
		this._platformGenerator.update({delta, goTo, goBack});
		this._bonusGenerator.update({delta, goTo, goBack});
		this._decorationGenerator.update({delta, goTo, goBack});
		this._player.update({delta, goTo, goBack});
		for (const platform of this._platforms) {
			if (!(platform instanceof Portal) && rectangleIntersectsEllipse(platform, this._player.shape)) {
				if ((this._player.gravity == 0) == platform.sens) {
					this._player.freeze();
					this._player.platform = platform;
				} else {
					// this._state = 3;
					// ((DeathPage) game.getState(7)).score = this._player.score;
					// game.enterState(7, new FadeOutTransition(), new FadeInTransition());
				}
			} else if (platform instanceof Portal && rectangleContainsEllipse(platform, this._player.shape) && this._player.portalCooldown <= 0) {
				// this._player.teleport(((Portal) platform).couple.x + 15, ((Portalform) platform).couple.y + 65);
				this._player.portalCooldown = 500;
			}
		}
		for (const bonus of this._bonuses) {
			// if (this._player.shape.intersects(bonus.shape)) {
			// 	bonus.apply(this._player);
			// }
		}
		if (this._player.posY > this._line.posY || this._player.posX + this._player.width < 0 || this._player.posX > this._width) {
			goTo(this.successors[1], this._player.score);
		}
	}
	render({canvasContext}) {
		canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
		canvasContext.fillStyle = this._color;
		canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
		canvasContext.fillStyle = "#ffffff";
		canvasContext.strokeStyle = "#ffffff";
		for (const decoration of this._decorations) {
			decoration.render({canvasContext}, this._player.posY);
		}
		for (const bonus of this._bonuses) {
			bonus.render({canvasContext});
		}
		for (const platform of this._platforms) {
			platform.render({canvasContext}, this._player.posY);
		}
		this._player.render({canvasContext});
		this._interface.render({canvasContext});
		this._line.render({canvasContext}, this._player.posY);
	}
	addPlatform(platform) {
		this._platforms.push(platform);
	}
	addBonus(bonus) {
		this._bonuses.push(bonus);
	}
	addDecoration(decoration) {
		this._decorations.unshift(decoration);
	}
	get width() {
		return this._width;
	}
	get height() {
		return this._height;
	}
	get player() {
		return this._player;
	}
};
