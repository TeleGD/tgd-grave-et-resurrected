import {State} from "/tgd-grave-et-resurrected/node_modules/noyo/state.mjs";
import {initButton, listenButton} from "/tgd-grave-et-resurrected/scripts/utils/buttons.mjs";
export default class Rules extends State {
	// _select;
	// _start;
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
		if (this._select.pressed) {
			goBack();
			return;
		}
		if (this._start.pressed && this.successors.length > 0) {
			goTo(this.successors[0]);
			return;
		}
	}
};
