var countMarkY = 0;
var marks_Y = [];
var range = {};

function getMarkY (name) {
	var mark;
	marks_Y.some(function(object, i, array) {
		if (object.name === name) {
			mark = object;
			return true
		}
	});
	return mark;
}

function MarkY() {
	this.name = "markY" + countMarkY++;
	marks_Y.push(this);
	this.input = d3.select("#mark")
		.append("input")
		.attr("name", this.name)
		.attr("type", "text")[0][0];
	this.input.onchange = this.init.bind(this);
}

MarkY.prototype.init = function () {
	var number = parseFloat(this.input.value);
	var orig = origin.y.value;
	if (isFinite(number) && orig) {
		this.value = number;
		this.g = descart.append("g")
			.attr("id", this.name);

		var x1, x2, y1, y2, cx, cy, inf1, inf2;
		marks_Y = marks_Y.sort(function (object1, object2) {
			if (object1.value > object2.value) {
				return 1;
			} else {
				return -1;
			}
		});
		this.x = 0;
		this.y = -100;
		if (marks_Y.length > 1) {
			marks_Y.forEach(function (mark, index, currentArray) {
				if (mark.value === number) {
					if (index === currentArray.length - 1) {

						cy = centrHSVGdescart - currentArray[index - 1].quantity - 50;
						mark.quantity = currentArray[index - 1].quantity + 50;

					} else {
						console.log(centrHSVGdescart, currentArray[index + 1].quantity);
						cy = centrHSVGdescart - currentArray[index + 1].quantity + 50;
						mark.quantity = currentArray[index + 1].quantity - 50;
						console.log(cy);
					}
				}
			});
		} else {
			cy = centrHSVGdescart - 100;
			this.quantity = this.y + 200;
		}


		x1 = centrWSVGdescart - 50;
		x2 = centrWSVGdescart + 50;
		cx = centrWSVGdescart;
		y1 = y2 = cy;

		this.g.classed("pointy", true);


		this.g.append("line")
			.attr("x1", x1)
			.attr("y1", y1)
			.attr("x2", x2)
			.attr("y2", y2)
			.style({
				"stroke": "red",
				"stroke-width": 1
			});

		this.g.append("line")
		 .attr("x1", centrWSVGdescart - 2000)
		 .attr("y1", y1)
		 .attr("x2", centrWSVGdescart + 2000)
		 .attr("y2", y2)
		 .style({
		 "stroke": "red",
		 "opacity": 0.5,
		 "stroke-width": 0.7
		 });

		this.g.append("line")
			.attr("id", "area")
			.attr("x1", x1)
			.attr("y1", y1)
			.attr("x2", x2)
			.attr("y2", y2)
			.style({
				"stroke": "red",
				"opacity": 0,
				"stroke-width": 30
			});

		this.g.append("circle")
			.attr("id", "zero")
			.attr("cx", cx)
			.attr("cy", cy)
			.attr("r", 1)
			.style({
				"stroke": "black",
				"stroke-width": 2
			});


		if (!this.text) {
			this.text = this.g.append("text")
				.attr("x", centrWSVGdescart - 65)
				.attr("y", centrHSVGdescart - 105)
		}
		this.text.text(this.value);


	} else {
		this.value = null;
		this.quantity = null;
		this.g.remove();
		this.g = null;
		this.text.remove();
		this.text = null;
	}
	this.calc();
};

MarkY.prototype.eng = function (event) {
	this.quantity -= event.dy;
	this.calc();
};

MarkY.prototype.calc = function () {
	this.prepareArray();
	this.fillRange();
};


MarkY.prototype.prepareArray = function () {
	marks_Y.sort(function (object1, object2) {
		if (object1.value > object2.value) {
			return 1;
		} else {
			return -1;
		}
	})
};

MarkY.prototype.minElementArray = function () {
	var minElement = Infinity;
	marks_Y.forEach(function (o) {
		if (o.quantity < minElement) minElement = o.quantity;
	});
	return minElement;
};

MarkY.prototype.fillRange = function () {
	var minElement = this.minElementArray();
	range.y = [];
	marks_Y.forEach(function (mark, index, currentArray) {
		var quantity, value;
		if (index !== 0) {
			value = mark.value - currentArray[index - 1].value;
			quantity = mark.quantity - currentArray[index - 1].quantity;
		} else {
			value = mark.value - +origin.y.value;
			quantity = mark.quantity;
		}
		var object = {
			"originalQuantity": mark.quantity,
			"quantity": quantity,
			"value": value,
			"ratio": value / quantity
		};
		mark.dQuantity = quantity;
		if (mark.quantity === minElement) object.offset = +origin.y.value;
		range.y.push(object)
	})
};






MarkY.prototype.accelerator = function (arr, event) {
	arr.forEach(function(object, i, array) {
		if(object.name === event.target.id) {
			if (event.dy < 0) {
				if (i !== array.length - 1) {
					if (array[i + 1].dQuantity + event.dy <= 15) {
						event.dy = 0;
					}
				}
			} else {
				console.log(object.dQuantity + event.dy);
				if (object.dQuantity + event.dy  <= 15) {
					event.dy = 0;
				}
			}
		}
	})
}


interact('.pointy')
	.draggable({
		onmove: function (event) {
			var target = event.target;
			var mark = getMarkY(target.id);
			event.dy = 1 * sign(event.dy);
			if (event.dy === 0) return;
			mark.accelerator(marksYarr, event);

			var x = 0,
				y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
			target.style.webkitTransform =
				target.style.transform =
					'translate(' + x + 'px, ' + y + 'px)';
			mark.eng(event);

			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		},
		onend: function (event) {
			var mark = getMarkY(event.target.id);
		}

	});
