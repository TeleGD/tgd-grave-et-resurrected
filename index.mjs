import {runLoop} from "/tgd-grave-et-resurrected/node_modules/noyo/noyo.mjs";
import {getKeyboard} from "/tgd-grave-et-resurrected/node_modules/noyo/keyboard.mjs";
import {connectEmulatedGamepad} from "/tgd-grave-et-resurrected/node_modules/noyo/gamepad.mjs";
import Welcome from "/tgd-grave-et-resurrected/scripts/states/welcome.mjs";
import Rules from "/tgd-grave-et-resurrected/scripts/states/rules.mjs";
import World from "/tgd-grave-et-resurrected/scripts/states/world.mjs";
import Pause from "/tgd-grave-et-resurrected/scripts/states/pause.mjs";
import Scores from "/tgd-grave-et-resurrected/scripts/states/scores.mjs";
runLoop({
	"welcome": [Welcome],
	"rules": [Rules],
	"world": [World],
	"pause": [Pause],
	"scores": [Scores]
}, "welcome");
const keyboard = getKeyboard({
	"ArrowDown": 0,
	"ArrowRight": 1,
	"ArrowLeft": 2,
	"ArrowUp": 3,
	"ShiftLeft": 4,
	"ShiftRight": 5,
	"Space": 5,
	"Escape": 8,
	"Enter": 9,
	"KeyW": 12,
	"KeyS": 13,
	"KeyA": 14,
	"KeyD": 15
});
connectEmulatedGamepad(keyboard);
