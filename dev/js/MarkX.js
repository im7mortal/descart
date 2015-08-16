function MarkX(value, quantity) {
	this.value = value;
	this.quantity = quantity;
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

	var drag = d3.behavior.drag()
		.on("dragstart", function() {
			d3.event.sourceEvent.stopPropagation(); // silence other listeners
		})
		.on('drag', function (d) {
			var mark = getMark(this.id, marks_X);
			if (!mark) return;

			d3.event.dx = 1 * sign(d3.event.dx);
			d3.event.dx = mark.accelerator(d3.event.dx);
			if (d3.event.dx === 0) return;
			d.x += d3.event.dx;
			mark.quantity += d3.event.dx;
			mark.calc();
			d3.select(this).attr("transform", function () {
				return "translate(" + [d.x, 0] + ")"
			});
		});

	this.g = descart.append('g')
		.attr('id', this.name)
		.data([{x : 1, y: 1}]) // smock заглушка
		.call(drag)
		.classed('pointx', true);

	if (this.array.length > 0) {
		this.quantity = this.quantity || this.ratiy();
		x = centrWSVGdescart + this.quantity;
	} else {
		this.quantity = this.quantity || 100;
		x = centrWSVGdescart + this.quantity;
	}

	this.g.append('line')
		.attr('x1', x)
		.attr('y1', y1)
		.attr('x2', x)
		.attr('y2', y2)
		.style({
			'stroke': 'red',
			'stroke-width': 1
		});

	this.g.append('line')
		.attr('x1', x)
		.attr('y1', centrHSVGdescart + 2000)
		.attr('x2', x)
		.attr('y2', centrHSVGdescart - 2000)
		.style({
			'stroke': 'red',
			'opacity': 0.5,
			'stroke-width': 0.5
		});

	this.g.append('line')
		.attr('id', 'area')
		.attr('x1', x)
		.attr('y1', y1)
		.attr('x2', x)
		.attr('y2', y2)
		.style({
			'stroke': 'red',
			'opacity': 0,
			'stroke-width': 30
		});

	this.g.append('circle')
		.attr('id', 'zero')
		.attr('cx', x)
		.attr('cy', cy)
		.attr('r', 1)
		.style({
			'stroke': 'black',
			'stroke-width': 2
		});

	this.g.append('text')
		.attr('x', x)
		.attr('y', y1 - 15)
		.text(this.value);

	this.array.push(this);
};

MarkX.prototype.accelerator = function (quantity) {
	this.array.forEach(function (object, i, array) {
		if (object.name === this.name) {
			if (quantity < 0) {
				if (object.dQuantity + quantity <= 5) {
					quantity = 0;
				}
			} else {
				if (i !== array.length - 1) {
					if (array[i + 1].dQuantity + quantity <= 5) {
						quantity = 0;
					}
				}
			}
		}
	}, this);
	return quantity;
};
