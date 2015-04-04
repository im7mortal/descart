var countMarkX = 0;
var marks_X = [];
range.x = [];
function getMarkX(name) {
	var mark;
	marks_X.some(function (object, i, array) {
		if (object.name === name) {
			mark = object;
			return true
		}
	});
	return mark;
}

function MarkX() {
	this.name = "markX" + countMarkX++;
	marks_X.push(this);
	this.input = d3.select("#mark")
		.append("input")
		.attr("name", this.name)
		.attr("type", "text")[0][0];
	this.input.onchange = this.init.bind(this);
}

MarkX.prototype.ratiy = function () {

	var X = 0;
	var arrx = range.x.filter(function (o, i, a) {
		if (!i) return true;
		if (this.value > o.originalValue) {
			return true;
		} else if (this.value > a[i - 1].originalValue) {
			return true;
		}
		return false;
	}, this);


	var tValue = 0;
	arrx.forEach(function (object, i, array) {
		var offset = object.offset ? object.offset : 0;
		var value;
		if (i === (array.length - 1)) {
			value = this.value - tValue;
		} else {
			value = object.value;
		}
		tValue += object.value;
		console.log(value, tValue);
		X += (value - offset) * (1 / object.ratio);

	}, this);
	return X;
};

MarkX.prototype.init = function () {
	var number = parseFloat(this.input.value);
	var orig = origin.x.value;
	if (isFinite(number) && orig) {
		this.value = number;
		this.g = descart.append("g")
			.attr("id", this.name);

		var x1, x2, y1, y2, cx, cy, inf1, inf2, x;
		marks_X = marks_X.sort(function (object1, object2) {
			if (object1.value > object2.value) {
				return 1;
			} else {
				return -1;
			}
		});
		this.x = 100;
		this.y = 0;
		if (marks_X.length > 1) {
			var dq = this.ratiy();

			marks_X.forEach(function (mark, index, currentArray) {
				if (mark.value === number) {
					x = centrWSVGdescart + dq;
					mark.quantity = dq;
				}
			}, this);
		} else {
			x = centrWSVGdescart + 100;
			this.quantity = this.x;
		}

		y1 = centrHSVGdescart - 50;
		y2 = centrHSVGdescart + 50;
		cy = centrHSVGdescart;


		this.g.classed("pointx", true);


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


		if (!this.text) {
			this.text = this.g.append("text")
				.attr("x", x)
				.attr("y", y1 - 15)
		}
		this.text.text(this.value);


	} else if (this.g) {
		this.value = null;
		this.quantity = null;
		this.g.remove();
		this.g = null;
		this.text.remove();
		this.text = null;
	}
	this.calc();
};

MarkX.prototype.eng = function (event) {
	this.quantity += event.dx;
	this.calc();
};

MarkX.prototype.calc = function () {
	this.prepareArray();
	this.fillRange();
};


MarkX.prototype.prepareArray = function () {
	marks_X.sort(function (object1, object2) {
		if (object1.value > object2.value) {
			return 1;
		} else {
			return -1;
		}
	})
};

MarkX.prototype.minElementArray = function () {
	var minElement = Infinity;
	marks_X.forEach(function (o) {
		if (o.quantity < minElement) minElement = o.quantity;
	});
	return minElement;
};

MarkX.prototype.fillRange = function () {
	var minElement = this.minElementArray();
	range.x = [];
	marks_X.forEach(function (mark, index, currentArray) {
		var quantity, value;
		if (index !== 0) {
			value = mark.value - currentArray[index - 1].value;
			quantity = mark.quantity - currentArray[index - 1].quantity;
		} else {
			value = mark.value - +origin.x.value;
			quantity = mark.quantity;
		}
		var object = {
			"originalQuantity": mark.quantity,
			"originalValue": mark.value,
			"quantity": quantity,
			"value": value,
			"ratio": value / quantity
		};
		mark.dQuantity = quantity;
		if (mark.quantity === minElement) object.offset = +origin.x.value;
		console.log(object);
		range.x.push(object)
	})
};


MarkX.prototype.accelerator = function (arr, event) {
	arr.forEach(function (object, i, array) {
		if (object.name === event.target.id) {
			if (event.dx < 0) {
				if (i !== array.length - 1) {
					if (array[i + 1].dQuantity + event.dx <= 5) {
						event.dx = 0;
					}
				}
			} else {
				if (object.dQuantity + event.dx <= 5) {
					event.dx = 0;
				}
			}
		}
	})
};


interact('.pointx')
	.draggable({
		onmove: function (event) {
			var target = event.target;
			var mark = getMarkX(target.id);
			event.dx = 1 * sign(event.dx);
			if (event.dx === 0) return;
			mark.accelerator(marks_X, event);

			var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
				y = 0;
			target.style.webkitTransform =
				target.style.transform =
					'translate(' + x + 'px, ' + y + 'px)';
			mark.eng(event);

			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		},
		onend: function (event) {
			var mark = getMarkX(event.target.id);
		}

	});
