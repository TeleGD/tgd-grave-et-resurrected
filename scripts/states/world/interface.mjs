export default class Interface {
	constructor(parent, player) {
		this._parent = parent;
		this._player = player;
	}
	update({delta, goTo, goBack}) {}
	render({canvasContext}) {
		canvasContext.fillStyle = "#ffffff";
		canvasContext.fillText("Score de " + this._player.name + " : " + this._player.score, 399, 10);
		canvasContext.fillText("Nombre de points de gravité restants à " + this._player.name + " : " + this._player.gravityPoint, 700, 10);
	}
};
