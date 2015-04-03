function Point () {
	this.name = "point" + countPoints++;
	points[this.name] = this;
	var self = this;

	this.g = descart.append("g")
		.attr("id", this.name)
		.classed("point", true);

	var cx = widthSVGdescart / 2 + 20,
		cy = heightSVGdescart / 2 - 20;

	this.x = 20;
	this.y = 20;
	this.point = this.g.append("circle")
		.attr("id", "zero")
		.attr("cx", cx)
		.attr("cy", cy)
		.attr("r", 1.5)
		.style({
			"stroke": "red"
		});

	this.g.append("circle")
		.attr("id", "zero")
		.attr("cx", cx)
		.attr("cy", cy)
		.attr("r", 20)
		.style({
			"stroke": "red",
			"opacity": 0
		});

}


Point.prototype.calc = function () {
	/*if ((this.value * this.quantity) < 0) {
	 this.resolveConflict (true, 'Масштаб не может быть отрицательным')
	 } else {
	 this.resolveConflict (false)
	 }*/

//		console.log(this.value / this.quantity);
};


Point.prototype.eng = function (event) {
	this.x += event.dx;
	this.y -= event.dy;
	this.calc();
};