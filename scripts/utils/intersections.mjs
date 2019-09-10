export function rectangleIntersectsEllipse(rectangle, ellipse) {
	const dx = Math.abs(ellipse.locationX - rectangle.locationX);
	const dy = Math.abs(ellipse.locationY - rectangle.locationY);
	const {sizeX: rectangleX, sizeY: rectangleY} = rectangle;
	const {sizeX: ellipseX, sizeY: ellipseY} = ellipse;
	if (dx * 2 > ellipseX + rectangleX) {
		return false;
	}
	if (dy * 2 > ellipseY + rectangleY) {
		return false;
	}
	if (dx * 2 <= rectangleX) {
		return true;
	}
	if (dy * 2 <= rectangleY) {
		return true;
	}
	return ((dx - rectangleX / 2) * ellipseY) ** 2 + ((dy - rectangleY / 2) * ellipseX) ** 2 <= (ellipseX * ellipseY) ** 2;
};
export function ellipseIntersectsEllipse(ellipse1, ellipse2) {
	// TODO
};
export function rectangleContainsEllipse(rectangle, ellipse) {
	const dx = Math.abs(ellipse.locationX - rectangle.locationX);
	const dy = Math.abs(ellipse.locationY - rectangle.locationY);
	return dx * 2 <= rectangle.sizeX && dy * 2<= rectangle.sizeY;
};
