function MarkY() {
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

	this.g = descart.append('g')
		.attr('id', this.name)
		.classed('pointy', true);

	if (this.array.length > 0) {
		this.quantity = this.ratiy();
		y = centrHSVGdescart - this.quantity;
	} else {
		this.quantity = 100;
		y = centrHSVGdescart - 100;
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


interact('.pointy')
	.draggable({
		onmove: function (event) {
			var target = event.target;

			var mark = getMark(target.id, marks_Y);
			if (!mark) return;
			event.dy = 1 * sign(event.dy);
			if (event.dy === 0) return;
			event.dy = mark.accelerator(event.dy);
			mark.quantity -= event.dy;
			mark.calc();

			var x = 0,
				y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
			target.style.webkitTransform =
				target.style.transform =
					'translate(' + x + 'px, ' + y + 'px)';
			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		},
		onend: function (event) {
		}
	});
