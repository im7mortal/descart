function MarkX() {
	this.init('X');
}

MarkX.prototype = Object.create(Mark.prototype);

MarkX.prototype.axes = 'X';
MarkX.prototype.array = marks_X;
MarkX.prototype.rangeArray = range.x;
MarkX.prototype.origin = origin.x;

MarkX.prototype.render = function () {
	var y1, y2, cy, x;

	y1 = centrHSVGdescart - 50;
	y2 = centrHSVGdescart + 50;
	cy = centrHSVGdescart;

	this.g = descart.append("g")
		.attr("id", this.name)
		.classed("pointx", true);

	if (this.array.length > 0) {
		this.quantity = this.ratiy();
		x = centrWSVGdescart + this.quantity;
	} else {
		this.quantity = 100;
		x = centrWSVGdescart + 100;
	}

	this.g.append("line")
		.attr("x1", x)
		.attr("y1", y1)
		.attr("x2", x)
		.attr("y2", y2)
		.style({
			"stroke": "red",
			"stroke-width": 1
		});

	this.g.append("line")
		.attr("x1", x)
		.attr("y1", centrHSVGdescart + 2000)
		.attr("x2", x)
		.attr("y2", centrHSVGdescart - 2000)
		.style({
			"stroke": "red",
			"opacity": 0.5,
			"stroke-width": 0.5
		});

	this.g.append("line")
		.attr("id", "area")
		.attr("x1", x)
		.attr("y1", y1)
		.attr("x2", x)
		.attr("y2", y2)
		.style({
			"stroke": "red",
			"opacity": 0,
			"stroke-width": 30
		});

	this.g.append("circle")
		.attr("id", "zero")
		.attr("cx", x)
		.attr("cy", cy)
		.attr("r", 1)
		.style({
			"stroke": "black",
			"stroke-width": 2
		});

	this.g.append("text")
		.attr("x", x)
		.attr("y", y1 - 15)
		.text(this.value);

	this.array.push(this);
};

interact('.pointx')
	.draggable({
		onmove: function (event) {
			var target = event.target;

			var mark = getMark(target.id, marks_X);
			if(!mark) return;

			event.dx = 1 * sign(event.dx);
			if (event.dx === 0) return;
			event.dx = mark.accelerator(event.dx);
			mark.quantity += event.dx;
			mark.calc();


			var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
				y = 0;
			target.style.webkitTransform =
				target.style.transform =
					'translate(' + x + 'px, ' + y + 'px)';
			mark.eng(event);

			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		},
		onend: function (event) {}
	});
