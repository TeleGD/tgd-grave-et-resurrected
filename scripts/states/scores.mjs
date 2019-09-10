import {State} from "/tgd-grave-et-resurrected/node_modules/noyo/state.mjs";
import {initButton, listenButton} from "/tgd-grave-et-resurrected/scripts/utils/buttons.mjs";
export default class Scores extends State {
	play() {
		this._select = initButton(true);
		this._start = initButton(true);
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
	}
	update({delta, goTo, goBack}) {
		if ((this._select.pressed || this._start.pressed)) {
			goBack();
			goBack();
			goBack();
			return;
		}
	}
	render({canvasContext}) {
		canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
	}
};