function MarkY(value, quantity) {
	this.value = value;
	this.quantity = quantity;
	this.init('Y');
}

MarkY.prototype = Object.create(Mark.prototype);

MarkY.prototype.axes = 'Y';
MarkY.prototype.array = marks_Y;
MarkY.prototype.rangeArray = range.y;
MarkY.prototype.origin = origin.y;

MarkY.prototype.render = function () {
	var x1, x2, cx, y;
	x1 = centrWSVGdescart - 50;
	x2 = centrWSVGdescart + 50;
	cx = centrWSVGdescart;

	var drag = d3.behavior.drag()
		.on("dragstart", stopPropagation)
		.on('drag', function (d) {
			var mark = getMark(this.id, marks_Y);
			if (!mark) return;

			d3.event.dy = 1 * sign(d3.event.dy);
			d3.event.dy = mark.accelerator(d3.event.dy);
			if (d3.event.dy === 0) return;
			d.y += d3.event.dy;
			mark.quantity -= d3.event.dy;
			mark.calc();
			d3.select(this).attr("transform", function () {
				return "translate(" + [0, d.y] + ")"
			});
		});

	this.g = descart.append('g')
		.attr('id', this.name)
		.data([{x : 1, y: 1}]) // smock заглушка
		.call(drag)
		.classed('pointy', true);

	if (this.array.length > 0) {
		this.quantity = this.quantity || this.ratiy();
		y = centrHSVGdescart - this.quantity;
	} else {
		this.quantity = this.quantity || 30;
		y = centrHSVGdescart - this.quantity;
	}

	this.g.append('line')
		.attr('x1', x1)
		.attr('y1', y)
		.attr('x2', x2)
		.attr('y2', y)
		.style({
			'stroke': 'red',
			'stroke-width': 1
		});

	this.g.append('line')
		.attr('x1', centrWSVGdescart - 2000)
		.attr('y1', y)
		.attr('x2', centrWSVGdescart + 2000)
		.attr('y2', y)
		.style({
			'stroke': 'red',
			'opacity': 0.5,
			'stroke-width': 0.7
		});

	this.g.append('line')
		.attr('id', 'area')
		.attr('x1', x1)
		.attr('y1', y)
		.attr('x2', x2)
		.attr('y2', y)
		.style({
			'stroke': 'red',
			'opacity': 0,
			'stroke-width': 30
		});

	this.g.append('circle')
		.attr('id', 'zero')
		.attr('cx', cx)
		.attr('cy', y)
		.attr('r', 1)
		.style({
			'stroke': 'black',
			'stroke-width': 2
		});

	this.g.append('text')
		.attr('x', x1 - 15)
		.attr('y', y - 15)
		.text(this.value);

	this.array.push(this);
};

MarkY.prototype.accelerator = function (quantity) {
	this.array.forEach(function (object, i, array) {
		if (object.name === this.name) {
			if (quantity < 0) {
				if (i !== array.length - 1) {
					if (array[i + 1].dQuantity + quantity <= 5) {
						quantity = 0;
					}
				}
			} else {
				if (object.dQuantity + quantity <= 5) {
					quantity = 0;
				}
			}
		}
	}, this);
	return quantity;
};