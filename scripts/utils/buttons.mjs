export function initButton(state) {
	const down = state;
	const pressed = false;
	const released = false;
	return {
		down,
		pressed,
		released
	};
};
export function listenButton(currentState, nextState) {
	const down = nextState;
	const pressed = nextState && !currentState;
	const released = !nextState && currentState;
	return {
		down,
		pressed,
		released
	};
};
