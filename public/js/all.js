"use strict";

var widthSVGdescart = document.body.clientWidth;
var heightSVGdescart = screen.height * 0.75;
var centrHSVGdescart = screen.height * 0.75 / 2;
var centrWSVGdescart = document.body.clientWidth / 2;
var fastenFlag = {
	"graph": true,
	"descart": true
};
var graph;
var countPoints = 0;
var countMark = {
	"x": 0,
	"y": 0
};

var trumen = false;
var marks = {};
var points = {};

var marksYarr = [];
var marksXarr = [];

//Create SVG element
var svg = d3.select("body").append("svg").attr("width", widthSVGdescart).attr("height", heightSVGdescart);

function increaseCanvas() {
	svg.attr("height", parseInt(svg.attr("height")) + 100);
}

var zoom = d3.behavior.zoom();

var descartDrag = d3.behavior.drag().on("dragstart", stopPropagation).on('drag', function (d) {
	d.x += d3.event.dx;
	d.y += d3.event.dy;
	d3.select(this).attr("transform", function () {
		return "translate(" + [d.x, d.y] + ")";
	});
	origin.x.x += d3.event.dx;
	origin.y.y -= d3.event.dy;
});

var descart = svg.append("g").attr("id", "descart").data([{ x: 1, y: 1 }]) // smock заглушка
.call(descartDrag).classed("descart", true);

descart.append("line").attr("id", "axisY").attr("x1", widthSVGdescart / 2).attr("y1", heightSVGdescart * -10).attr("x2", widthSVGdescart / 2).attr("y2", heightSVGdescart * 10).style({
	"stroke": "red",
	"stroke-width": 1
});

descart.append("line").attr("x1", widthSVGdescart / 2).attr("y1", heightSVGdescart * -10).attr("x2", widthSVGdescart / 2).attr("y2", heightSVGdescart * 10).style({
	"stroke": "red",
	"opacity": 0,
	"stroke-width": 30
});

descart.append("line").attr("id", "axisX").attr("x1", widthSVGdescart * -10).attr("y1", heightSVGdescart / 2).attr("x2", widthSVGdescart * 10).attr("y2", heightSVGdescart / 2).style({
	"stroke": "red",
	"stroke-width": 1
});

descart.append("line").attr("x1", widthSVGdescart * -10).attr("y1", heightSVGdescart / 2).attr("x2", widthSVGdescart * 10).attr("y2", heightSVGdescart / 2).style({
	"stroke": "red",
	"opacity": 0,
	"stroke-width": 30
});

var flag1;
svg.on('mousedown', function () {
	flag1 = 1;
});
svg.on('mousemove', function () {
	flag1 = 0;
});
svg.on('mouseup', addPoint);

function addPoint() {
	if (flag1 === 1 && trumen) {
		var coordinates = d3.mouse(this);
		var x = coordinates[0] - origin.x.x;
		var y = centrHSVGdescart - coordinates[1] + centrHSVGdescart - origin.y.y;
		var ty = true;
		var arr = d3.map(points).values();
		if (arr.length) {
			ty = !arr.some(function (object1) {
				console.log(object1.x === x);
				console.log(x);
				console.log(object1.x);
				if (object1.x === x) {
					return true;
				}
			});
		}

		if (ty) {
			new Point(x, y);
		}
	}
	flag1 = 0;
}

var zero = descart.append("circle").attr("id", "zero").attr("cx", centrWSVGdescart).attr("cy", centrHSVGdescart).attr("r", 2).style({
	"stroke": "black",
	"stroke-width": 2
});

var marksGroup = descart.append("g").attr("id", "marksGroup");

function fasten(name) {
	if (name === "descart") descart.classed("descart", fastenFlag[name] = !fastenFlag[name]);
	if (name === "graph") graph.classed("descart", fastenFlag[name] = !fastenFlag[name]);
}
function sign(value) {
	if (value > 0) {
		return 1;
	} else if (value < 0) {
		return -1;
	} else {
		return 0;
	}
}
function stopPropagation() {
	d3.event.sourceEvent.stopPropagation(); // silence other listeners
}
"use strict";

var origin = {
	"x": {},
	"y": {}
};
origin.x.x = centrWSVGdescart;
origin.y.y = centrHSVGdescart;
origin.x.originInput = document.getElementById('originX');
origin.y.originInput = document.getElementById('originY');
origin.x.tip = document.getElementById('tipX');
origin.y.tip = document.getElementById('tipY');
origin.x.origin = descart.append('text').attr('x', centrWSVGdescart - 30).attr('y', centrHSVGdescart + 30).text('');
origin.y.origin = descart.append('text').attr('x', centrWSVGdescart - 30).attr('y', centrHSVGdescart - 30).text('');

var validateAxisInput = function validateAxisInput(object, axis) {
	return function () {
		if (this.value && isFinite(this.value)) {
			object.tip.style.display = 'none';
			object.origin.text(this.value);
			object.value = this.value;
		} else {
			object.tip.style.display = 'block';
			object.tip.style.color = 'red';
			object.tip.innerHTML = 'Задайте корректное начало отсчета по ' + axis;
			object.origin.text('');
			object.value = null;
		}
	};
};
origin.x.originInput.onchange = validateAxisInput(origin.x, 'x');
origin.y.originInput.onchange = validateAxisInput(origin.y, 'y');

origin.x.originInput.value = 0;
origin.x.originInput.onchange();
origin.y.originInput.value = 0;
origin.y.originInput.onchange();
"use strict";

var fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", function () {
	if (this.files.length) {
		var gapDrag = d3.behavior.drag().on("dragstart", stopPropagation).on('drag', function (d) {
			d.x += d3.event.dx;
			d.y += d3.event.dy;
			d3.select(this).attr("transform", function () {
				return "translate(" + [d.x, d.y] + ")";
			});
		});
		graph = svg.insert("image", 'g#descart').classed("gap", true).data([{ x: 1, y: 1 }]) // smock заглушка
		.call(gapDrag).attr("xlink:href", this.files[0].name).attr("x", 0).attr("y", 0);
		if (FileReader) {
			var reader = new FileReader();
			reader.onloadend = function () {
				var img = document.createElement('img');
				img.onload = function () {
					graph.attr("width", this.width).attr("height", this.height);
				};
				img.src = reader.result;
			};
			reader.readAsDataURL(this.files[0]);
		} else {
			graph.attr("height", 956).attr("width", 606);
		}
	}
});
'use strict';

var countMark = 0;
var marks_Y = [];
var marks_X = [];
var range = {
	'x': [],
	'y': []
};

function getMark(name, array) {
	var mark;
	array.some(function (object, i, array) {
		if (object.name === name) {
			mark = object;
			return true;
		}
	});
	return mark;
}
function removeMark(name, array) {
	var index;
	array.some(function (object, i, array) {
		if (object.name === name) {
			index = i;
			return true;
		}
	});
	array.splice(index, 1);
}

function Mark() {}

Mark.prototype.handler = function () {
	var number = parseFloat(this.input.value);
	var flag;
	this.array.some(function (object) {
		if (object.value === number) {
			flag = true;
			return true;
		}
	});
	if (this.g) {
		this.value = null;
		this.quantity = null;
		this.g.remove();
		removeMark(this.name, this.array);
	}
	if (isFinite(number) && this.origin && !flag) {
		this.value = number;
		this.render();
	}
	this.calc();
};

Mark.prototype.init = function () {
	this.name = 'mark' + this.axes + countMark++;
	this.inputGroup = d3.select('#input' + this.axes).append('div').classed('input-group', true);
	this.inputGroup.append('span').classed('input-group-btn', true).append('button').on('click', this.remove.bind(this)).attr('type', 'button').classed('btn btn-default', true).append('span').attr('aria-hidden', 'true').classed('glyphicon glyphicon-remove', true);

	this.input = this.inputGroup.append('input').classed('form-control', true).attr('type', 'text').attr('name', this.name).attr('placeholder', 'Search for...')[0][0];

	this.input.onchange = this.handler.bind(this);
	if (this.value && this.quantity) {
		this.input.value = this.value;
		this.render();
	}
};

Mark.prototype.remove = function () {
	if (this.g) this.g.remove();
	if (this.inputGroup) this.inputGroup.remove();
	removeMark(this.name, this.array);
};

Mark.prototype.prepareArray = function () {
	this.array.sort(function (object1, object2) {
		if (object1.value > object2.value) {
			return 1;
		} else {
			return -1;
		}
	});
};

Mark.prototype.minElementArray = function () {
	var minElement = Infinity;
	this.array.forEach(function (o) {
		if (o.quantity < minElement) minElement = o.quantity;
	});
	return minElement;
};

Mark.prototype.ratiy = function () {
	var Y = 0;
	var tValue = 0;
	this.rangeArray.filter(function (o, i, a) {
		if (!i) return true;
		if (this.value > o.originalValue) {
			return true;
		} else if (this.value > a[i - 1].originalValue) {
			return true;
		}
		return false;
	}, this).forEach(function (object, i, array) {
		var offset = object.offset ? object.offset : 0;
		var value;
		if (i === array.length - 1) {
			value = this.value - tValue;
		} else {
			value = object.value;
		}
		tValue += object.value;
		Y += (value - offset) * (1 / object.ratio);
	}, this);
	return Y;
};

Mark.prototype.calc = function () {
	this.prepareArray();
	this.fillRange();
};

Mark.prototype.fillRange = function () {
	var minElement = this.minElementArray();
	this.rangeArray.splice(0, this.rangeArray.length);
	this.array.forEach(function (mark, index, currentArray) {
		var quantity, value;
		if (index !== 0) {
			value = mark.value - currentArray[index - 1].value;
			quantity = mark.quantity - currentArray[index - 1].quantity;
		} else {
			value = mark.value - +this.origin.value;
			quantity = mark.quantity;
		}
		var object = {
			'originalQuantity': mark.quantity,
			'originalValue': mark.value,
			'quantity': quantity,
			'value': value,
			'ratio': value / quantity
		};
		mark.dQuantity = quantity;
		if (mark.quantity === minElement) object.offset = +this.origin.value;
		this.rangeArray.push(object);
	}, this);
};

Mark.prototype.accelerator = function (quantity) {
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

/*Mark.prototype.resolveConflict = function (flag, textError) {
	var self = this;
	if (flag) {
		if (!this.conflict || !this.conflict.interval) {
			this.conflict = {};
			this.conflict.flag = true;
			this.conflict.interval = setInterval(function () {
				self.g.select("line#area")
					.transition()
					.duration(500)
					.style({
						"opacity": (function (flag) {
							self.conflict.flag = !flag;
							return flag?1:0;
						})(self.conflict.flag)
					})
			}, 500);
			this.conflict.textError = this.g.append("text")
				.attr("id", "textError")
				.attr("x", centrWSVGdescart + 100)
				.attr("y", centrHSVGdescart - 60)
				.text(textError);
		}
	} else {
		if (this.conflict && this.conflict.interval) {
			clearInterval(this.conflict.interval);
			this.conflict.interval = 0;
			this.g.select("#textError")
				.remove();
			this.g.select("line#area")
				.transition()
				.duration(500)
				.style({
					"opacity": 0
				})
		}
	}
}*/;
'use strict';

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

	var drag = d3.behavior.drag().on("dragstart", stopPropagation).on('drag', function (d) {
		var mark = getMark(this.id, marks_Y);
		if (!mark) return;

		d3.event.dy = 1 * sign(d3.event.dy);
		d3.event.dy = mark.accelerator(d3.event.dy);
		if (d3.event.dy === 0) return;
		d.y += d3.event.dy;
		mark.quantity -= d3.event.dy;
		mark.calc();
		d3.select(this).attr("transform", function () {
			return "translate(" + [0, d.y] + ")";
		});
	});

	this.g = descart.append('g').attr('id', this.name).data([{ x: 1, y: 1 }]) // smock заглушка
	.call(drag).classed('pointy', true);

	if (this.array.length > 0) {
		this.quantity = this.quantity || this.ratiy();
		y = centrHSVGdescart - this.quantity;
	} else {
		this.quantity = this.quantity || 30;
		y = centrHSVGdescart - this.quantity;
	}

	this.g.append('line').attr('x1', x1).attr('y1', y).attr('x2', x2).attr('y2', y).style({
		'stroke': 'red',
		'stroke-width': 1
	});

	this.g.append('line').attr('x1', centrWSVGdescart - 2000).attr('y1', y).attr('x2', centrWSVGdescart + 2000).attr('y2', y).style({
		'stroke': 'red',
		'opacity': 0.5,
		'stroke-width': 0.7
	});

	this.g.append('line').attr('id', 'area').attr('x1', x1).attr('y1', y).attr('x2', x2).attr('y2', y).style({
		'stroke': 'red',
		'opacity': 0,
		'stroke-width': 30
	});

	this.g.append('circle').attr('id', 'zero').attr('cx', cx).attr('cy', y).attr('r', 1).style({
		'stroke': 'black',
		'stroke-width': 2
	});

	this.g.append('text').attr('x', x1 - 15).attr('y', y - 15).text(this.value);

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
'use strict';

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

	var drag = d3.behavior.drag().on("dragstart", stopPropagation).on('drag', function (d) {
		var mark = getMark(this.id, marks_X);
		if (!mark) return;

		d3.event.dx = 1 * sign(d3.event.dx);
		d3.event.dx = mark.accelerator(d3.event.dx);
		if (d3.event.dx === 0) return;
		d.x += d3.event.dx;
		mark.quantity += d3.event.dx;
		mark.calc();
		d3.select(this).attr("transform", function () {
			return "translate(" + [d.x, 0] + ")";
		});
	});

	this.g = descart.append('g').attr('id', this.name).data([{ x: 1, y: 1 }]) // smock заглушка
	.call(drag).classed('pointx', true);

	if (this.array.length > 0) {
		this.quantity = this.quantity || this.ratiy();
		x = centrWSVGdescart + this.quantity;
	} else {
		this.quantity = this.quantity || 100;
		x = centrWSVGdescart + this.quantity;
	}

	this.g.append('line').attr('x1', x).attr('y1', y1).attr('x2', x).attr('y2', y2).style({
		'stroke': 'red',
		'stroke-width': 1
	});

	this.g.append('line').attr('x1', x).attr('y1', centrHSVGdescart + 2000).attr('x2', x).attr('y2', centrHSVGdescart - 2000).style({
		'stroke': 'red',
		'opacity': 0.5,
		'stroke-width': 0.5
	});

	this.g.append('line').attr('id', 'area').attr('x1', x).attr('y1', y1).attr('x2', x).attr('y2', y2).style({
		'stroke': 'red',
		'opacity': 0,
		'stroke-width': 30
	});

	this.g.append('circle').attr('id', 'zero').attr('cx', x).attr('cy', cy).attr('r', 1).style({
		'stroke': 'black',
		'stroke-width': 2
	});

	this.g.append('text').attr('x', x).attr('y', y1 - 15).text(this.value);

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
"use strict";

function Point(x, y) {
	this.name = "point" + countPoints++;
	points[this.name] = this;
	var self = this;

	this.x = x || 20;
	this.y = y || 20;

	var drag = d3.behavior.drag().on("dragstart", stopPropagation).on('drag', function (d) {
		d.x += d3.event.dx;
		d.y += d3.event.dy;
		d3.select(this).attr("transform", function () {
			return "translate(" + [d.x, d.y] + ")";
		});
		points[this.id].eng(d3.event);
		autoRender();
	});

	this.g = descart.append("g").attr("id", this.name).data([{ x: 1, y: 1 }]) // smock заглушка
	.call(drag).classed("point", true);

	var cx = widthSVGdescart / 2 + this.x,
	    cy = heightSVGdescart / 2 - this.y;

	this.point = this.g.append("circle").attr("id", "zero").attr("cx", cx).attr("cy", cy).attr("r", 1.5).style({
		"stroke": "red"
	});

	this.g.append("circle").attr("id", "zero").attr("cx", cx).attr("cy", cy).attr("r", 3).style({
		"stroke": "red",
		"opacity": 0
	});
}

Point.prototype.eng = function (event) {
	this.x += event.dx;
	this.y -= event.dy;
	this.rationer();
};

Point.prototype.rationer = function () {
	var X = 0;
	var quantityX = 0;

	var arrx = range.x.filter(function (o, i, a) {
		if (!i) return true;
		if (this.x > o.originalQuantity) {
			return true;
		} else if (this.x > a[i - 1].originalQuantity) {
			return true;
		}
		return false;
	}, this);
	arrx.forEach(function (object, i, array) {
		var offset = object.offset ? object.offset : 0;
		if (i === array.length - 1) {
			X += (this.x - quantityX) * object.ratio + offset;
		} else {
			quantityX += object.quantity;
			X += object.quantity * object.ratio + offset;
		}
	}, this);

	var Y = 0;
	var quantityY = 0;
	var arry = range.y.filter(function (o, i, a) {
		if (!i) return true;

		if (this.y > o.originalQuantity) {
			return true;
		} else if (this.y > a[i - 1].originalQuantity) {
			return true;
		}
		return false;
	}, this);
	console.log(arry);
	arry.forEach(function (object, i, array) {
		var offset = object.offset ? object.offset : 0;
		if (i === array.length - 1) {
			Y += (this.y - quantityY) * object.ratio + offset;
		} else {
			quantityY += object.quantity;
			Y += object.quantity * object.ratio + offset;
		}
	}, this);

	this.valueX = X;
	this.valueY = Y;
	console.log({
		"x": X,
		"y": Y
	});
	return {
		"x": X,
		"y": Y
	};
};
"use strict";

var path;
function rush() {
	var data = getDataPath();
	var line = d3.svg.line().x(function (d) {
		return d.x + centrWSVGdescart;
	}).y(function (d) {
		return centrHSVGdescart - d.y;
	});
	if (path) {
		path.remove();
	}

	path = descart.append("path").datum(data).attr("d", line).style({
		"fill": "none",
		"stroke": "steelblue",
		"stroke-width": 1.5
	});
}

function buildDataPath() {
	return d3.map(points).values().map(function (object) {
		return {
			"x": object.x,
			"y": object.y
		};
	}).sort(function (object1, object2) {
		if (object1.x > object2.x) {
			return 1;
		} else {
			return -1;
		}
	});
}

var globalData;

function getDataPath() {
	var data = buildDataPath();
	globalData = data;
	var csv = "";
	d3.map(points).values().sort(function (object1, object2) {
		if (object1.x > object2.x) {
			return 1;
		} else {
			return -1;
		}
	}).forEach(function (o, i) {
		var b = o.rationer();
		csv += b.x + "; " + Math.pow(10, b.x) + "; " + b.y + "<br>";
	});

	while (csv.indexOf('.') + 1) {
		csv = csv.replace('.', ',');
	}
	//console.log(csv);
	document.getElementById('csv').innerHTML = csv;
	return data;
}

function autoRender() {
	if (path) {
		path.remove();
		var data = getDataPath();
		var line = d3.svg.line().x(function (d) {
			return d.x + centrWSVGdescart;
		}).y(function (d) {
			return centrHSVGdescart - d.y;
		});
		path = descart.append("path").datum(data).attr("d", line).style({
			"fill": "none",
			"stroke": "steelblue",
			"stroke-width": 1.5
		});
	}
}

var svgGraph;

function renderGraph() {
	/*var svgGraph = d3.select("body")
  .append("svg")
  .attr("width", widthSVGdescart)
  .attr("height", heightSVGdescart);*/

	var margin = { top: 20, right: 20, bottom: 30, left: 50 },
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

	//		var parseDate = d3.time.format("%d-%b-%y").parse;

	var x = d3.scale.linear().range([0, width]);

	var y = d3.scale.linear().range([height, 0]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	var yAxis = d3.svg.axis().scale(y).orient("left");

	var line = d3.svg.line().x(function (d) {
		return d.x;
	}).y(function (d) {
		return 130 - d.y;
	});
	function converter(array) {
		return array.map(function (d) {
			return {
				'x': d.x,
				"y": d.y
			};
		});
	}
	var svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	var data = converter(globalData);

	x.domain(d3.extent(data, function (d) {
		return d.x;
	}));
	y.domain(d3.extent(data, function (d) {
		return d.y;
	}));

	svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

	svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Price ($)");

	svg.append("path").datum(data).style({
		"fill": "none",
		"stroke": "steelblue",
		"stroke-width": 1.5
	}).attr("d", line);
}
"use strict";

function test() {
	origin.x.originInput.value = 0.3;
	origin.y.originInput.value = 7;
	origin.x.originInput.onchange();
	origin.y.originInput.onchange();
	var testArray = [{ "val": 8, "q": 36 }, { "val": 9, "q": 74 }, { "val": 10, "q": 102 }, { "val": 20, "q": 310 }, { "val": 30, "q": 427.79999999999995 }, { "val": 40, "q": 513.0599999999998 }, { "val": 50, "q": 576.0019999999995 }, { "val": 60, "q": 629.3033999999989 }, { "val": 70, "q": 673.150668833331 }, { "val": 80, "q": 714.6910258499955 }, { "val": 90, "q": 748.6096327783251 }, { "val": 100, "q": 779.6712645564854 }, { "val": 150, "q": 900.022565691999 }, { "val": 180, "q": 953.082528532279 }];
	testArray.forEach(function (a) {
		new MarkY(a.val, a.q);
	});
	testArray = [{ "val": 0.4, "q": 82 }, { "val": 0.5, "q": 145.99999999999997 }, { "val": 0.6, "q": 198 }, { "val": 0.7, "q": 233.00000000000023 }, { "val": 0.8, "q": 280.00000000000136 }, { "val": 0.9, "q": 314.00000000000546 }, { "val": 1, "q": 343.00000000002206 }, { "val": 2, "q": 544.0000000002381 }, { "val": 2.5, "q": 608.8000000004108 }];
	testArray.forEach(function (a) {
		new MarkX(a.val, a.q);
	});
	svg.attr("height", parseInt(svg.attr("height")) + 700);
}
function test2() {
	var string = [];
	marks_Y.forEach(function (o) {
		string.push({
			val: o.value,
			q: o.quantity
		});
	});
	console.log(JSON.stringify(string));

	string = [];
	marks_X.forEach(function (o) {
		string.push({
			val: o.value,
			q: o.quantity
		});
	});
	console.log(JSON.stringify(string));
}