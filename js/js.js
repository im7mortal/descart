

function Graph () {

}

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

//    var originX = 0;
var marks = {};
var points = {};


//Create SVG element






function increaseCanvas () {
	svg.attr("height", parseInt(svg.attr("height")) + 100)
}


var zoom = d3.behavior.zoom()
	.scaleExtent([0, 100])
	.on("zoom", zoomed);

var svg = d3.select("body")
	.append("svg")
	.attr("width", widthSVGdescart)
	.attr("height", heightSVGdescart)
	.call(zoom);

var descart = svg.append("g")
	.attr("id", "descart")
	.classed("descart", true);

function zoomed() {
	descart.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

descart.append("line")
	.attr("id", "axisY")
	.attr("x1", widthSVGdescart / 2)
	.attr("y1", heightSVGdescart * -10)
	.attr("x2", widthSVGdescart / 2)
	.attr("y2", heightSVGdescart * 10)
	.style({
		"stroke": "red",
		"stroke-width": 1
	});

descart.append("line")
	.attr("x1", widthSVGdescart / 2)
	.attr("y1", heightSVGdescart * -10)
	.attr("x2", widthSVGdescart / 2)
	.attr("y2", heightSVGdescart * 10)
	.style({
		"stroke": "red",
		"opacity": 0,
		"stroke-width": 30
	});

descart.append("line")
	.attr("id", "axisX")
	.attr("x1", widthSVGdescart * -10)
	.attr("y1", heightSVGdescart / 2)
	.attr("x2", widthSVGdescart * 10)
	.attr("y2", heightSVGdescart / 2)
	.style({
		"stroke": "red",
		"stroke-width": 1
	});

descart.append("line")
	.attr("x1", widthSVGdescart * -10)
	.attr("y1", heightSVGdescart / 2)
	.attr("x2", widthSVGdescart * 10)
	.attr("y2", heightSVGdescart / 2)
	.style({
		"stroke": "red",
		"opacity": 0,
		"stroke-width": 30
	});

var zero = descart.append("circle")
	.attr("id", "zero")
	.attr("cx", centrWSVGdescart)
	.attr("cy", centrHSVGdescart)
	.attr("r", 2)
	.style({
		"stroke": "black",
		"stroke-width": 2
	});

//    var elementOrigin = document.getElementById('originX');
//    elementOrigin.value = 0;
//    elementOrigin.onchange = function() {
//        originX = this.value;
//    };



var marksGroup = descart.append("g")
	.attr("id", "marksGroup");



function fasten (name) {
	if(name === "descart")descart.classed("descart", fastenFlag[name] = !fastenFlag[name]);
	if(name === "graph")graph.classed("descart", fastenFlag[name] = !fastenFlag[name]);
}


function Point () {
	this.name = "point" + countPoints++;
	points[this.name] = this;
	var self = this;
//        this.input = d3.select("#mark")
//                .append("input")
//                .attr("name", this.name)
//                .attr("type", "text")[0][0];
//        this.input.onchange = this.engine.bind(this);

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



var marksX = {};
var marksY = {};

function Mark (axes) {
	this.name = "mark_" + axes + countMark[axes]++;
	if (axes === 'x') {
		marksX[this.name] = this;
	} else {
		marksY[this.name] = this;
	}
	var self = this;
	this.axes = axes;
	this.input = d3.select("#mark")
		.append("input")
		.attr("name", this.name)
		.attr("type", "text")[0][0];

	this.input.onchange = this.engine.bind(this);

}

Mark.prototype.resolveConflict = function (flag, textError) {
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
};

Mark.prototype.engine = function () {
	var number = parseFloat(this.input.value);
	var orig = origin[this.axes].value;
	if (isFinite(number) && orig) {



		this.value = number;
		this.g = descart.append("g")
			.attr("id", this.name);



		var x1, x2, y1, y2, cx, cy, inf1, inf2;
		if (this.axes === 'x') {
			this.x = 100;
			this.y = 0;
			this.quantity = this.x;
			x1 = x2 = cx = centrWSVGdescart + 100;
			y1 = centrHSVGdescart - 50;
			y2 = centrHSVGdescart + 50;
			cy = centrHSVGdescart;
			inf1 = centrHSVGdescart + 2000;
			inf2 = centrHSVGdescart - 2000;

			this.g.append("line")
				.attr("x1", centrWSVGdescart + 100)
				.attr("y1", centrHSVGdescart + 2000)
				.attr("x2", centrWSVGdescart + 100)
				.attr("y2", centrHSVGdescart - 2000)
				.style({
					"stroke": "red",
					"opacity": 0.5,
					"stroke-width": 0.5
				});
			this.g.classed("pointx", true)
		} else {
			this.x = 0;
			this.y = -100;
			this.quantity = this.y + 200;
			x1 = centrWSVGdescart - 50;
			x2 = centrWSVGdescart + 50;
			cx = centrWSVGdescart;
			y1 = y2 = cy =centrHSVGdescart - 100;
			this.g.append("line")
				.attr("x1", centrWSVGdescart - 2000)
				.attr("y1", centrHSVGdescart - 100)
				.attr("x2", centrWSVGdescart + 2000)
				.attr("y2", centrHSVGdescart - 100)
				.style({
					"stroke": "red",
					"opacity": 0.5,
					"stroke-width": 0.7
				});

			this.g.classed("pointy", true)
		}


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
			.attr("x1", x1)
			.attr("y1", y1)
			.attr("x2", x2)
			.attr("y2", y2)
			.style({
				"stroke": "red",
				"stroke-width": 1
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

		this.centr = this.g.append("circle")
			.attr("id", "zero")
			.attr("cx", cx)
			.attr("cy", cy)
			.attr("r", 1)
			.style({
				"stroke": "black",
				"stroke-width": 2
			});


		if(!this.text) {
			this.text = this.g.append("text");
			if (this.axes === 'x') {
				this.text.attr("x", centrWSVGdescart + 100)
					.attr("y", centrHSVGdescart + 60)
			} else {
				this.text.attr("x", centrWSVGdescart - 65)
					.attr("y", centrHSVGdescart - 105)
			}
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




Mark.prototype.calc = function () {

	range = {
		'x': [],
		'y': []
	};
	fillRange(prepareArray(d3.map(marksX).values()));
	fillRange(prepareArray(d3.map(marksY).values()));


	return;
	var conflictFlag, errorMessage;
	d3.map(marks).values()
		.sort(function (object1, object2) {
			if (object1.quantity > object2.quantity) {
				return 1;
			} else {
				return -1;
			}
		})
		.forEach(function(object, i, array) {
			if(!i || conflictFlag) return;
			if(object.value < array[i - 1].value){
				conflictFlag = true;
			}
		});

	if (conflictFlag || (this.value * this.quantity) < 0) {
		if (conflictFlag) {
			errorMessage = 'Значения отметок должны быть последовательными';
		} else {
			errorMessage = 'Масштаб не может быть отрицательным';
		}
		this.resolveConflict (true, errorMessage)
	} else {
		this.resolveConflict (false)
	}
};


Mark.prototype.eng = function (event) {
	if (this.axes === 'x') {
		this.quantity += event.dx;
	} else {
		this.quantity -= event.dy;
	}
	this.calc();
};

var range;



var prepareArray = function (array) {
	return array.sort(function (object1, object2) {
		if (object1.quantity > object2.quantity) {
			return 1;
		} else {
			return -1;
		}
	})
};
var minElementArray = function (array) {
	var minElement = Infinity;
	array.forEach(function (o) {
		if (o.quantity < minElement) minElement = o.quantity;
	});
	return minElement;
};

var fillRange = function (array) {
	var minElement = minElementArray(array);
	array.forEach(function (mark, index, currentArray) {
		var quantity, value;
		if (index !== 0) {
			value = mark.value - currentArray[index - 1].value;
			quantity = mark.quantity - currentArray[index - 1].quantity;
		} else {
			value = mark.value - +origin[mark.axes].value;
			quantity = mark.quantity;
		}
		mark.dQuantity = quantity;
		var object = {
			"originalQuantity": mark.quantity,
			"originalValue": mark.value,
			"quantity": quantity,
			"value": value,
			"ratio": value / quantity
		};
		if (mark.quantity === minElement) object.offset = +origin[mark.axes].value;
		range[mark.axes].push(object)
	})
};


function rationer(ob, i) {


	var X = 0;
	var quantityX = 0;
	var arrx = range.x.filter(function (o,i,a) {
		if(!i) return true;

		if(ob.x > o.originalQuantity) {
			return true;
		} else if (ob.x > a[i - 1].originalQuantity) {
			return true;
		}
		return false;
	});
	arrx.forEach(function (object, i, array) {
		var offset = object.offset?object.offset:0;
		if(i === (array.length - 1)) {
			X += (ob.x - quantityX) * object.ratio + offset;
		} else {
			quantityX += object.quantity;
			X += object.quantity * object.ratio + offset;
		}
	});

	var Y = 0;
	var quantityY = 0;
	var arry = range.y.filter(function (o,i,a) {
		if(!i) return true;

		if(ob.y > o.originalQuantity) {
			return true;
		} else if (ob.y > a[i - 1].originalQuantity) {
			return true;
		}
		return false;
	});
//		console.log(arry);
	arry.forEach(function (object, i, array) {
		var offset = object.offset?object.offset:0;
		if(i === (array.length - 1)) {
			Y += (ob.y - quantityY) * object.ratio + offset;
		} else {
			quantityY += object.quantity;
			Y += object.quantity * object.ratio + offset;
		}

	});

	console.log({
		"x": X,
		"y": Y
	});
	return {
		"x": X,
		"y": Y
	}

}

function getCoordinates () {

}


var path;
function rush () {
	var data = getDataPath();
	var line = d3.svg.line()
		.x(function(d) { return d.x + centrWSVGdescart; })
		.y(function(d) { return centrHSVGdescart - d.y; });
	if (path) {
		path.remove();
	}

	path = descart.append("path")
		.datum(data)
		.attr("d", line)
		.style({
			"fill": "none",
			"stroke": "steelblue",
			"stroke-width": 1.5
		});
}

function buildDataPath() {
	return d3.map(points).values()
		.map(function(object) {
			return {
				"x": object.x,
				"y": object.y
			}
		})
		.sort(function (object1, object2) {
			if (object1.x > object2.x) {
				return 1;
			} else {
				return -1;
			}
		})
}

var globalData;

function getDataPath() {
	var data = buildDataPath();
	globalData = data;
	var csv = "";
	data.forEach(function(o, i) {
		var b = rationer(o, i);
		csv += b.x  + "; " + b.y + "<br>";
	});

	while(csv.indexOf('.') + 1) {
		csv = csv.replace('.', ',');
	}
	//console.log(csv);
	document.getElementById('csv').innerHTML = csv;
	return data
}

function autoRender() {
	if (path) {
		path.remove();
		var data = getDataPath();
		var line = d3.svg.line()
			.x(function(d) { return d.x + centrWSVGdescart; })
			.y(function(d) { return centrHSVGdescart - d.y; });
		path = descart.append("path")
			.datum(data)
			.attr("d", line)
			.style({
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

	var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

//		var parseDate = d3.time.format("%d-%b-%y").parse;

	var x = d3.scale.linear()
		.range([0, width]);

	var y = d3.scale.linear()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var line = d3.svg.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return 130 - d.y; });
	function converter (array) {
		return array.map(function(d) {
			return {
				'x': d.x,
				"y": d.y
			}
		})
	}
	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	var data = converter(globalData);

	console.log(data);

	/*		data.forEach(function(d) {
	 d.date = parseDate(d.date);
	 d.close = +d.close;
	 });*/

	x.domain(d3.extent(data, function(d) { return d.x; }));
	y.domain(d3.extent(data, function(d) { return d.y; }));

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Price ($)");

	svg.append("path")
		.datum(data)
		.style({
			"fill": "none",
			"stroke": "steelblue",
			"stroke-width": 1.5
		})
		.attr("d", line);
}




interact('.descart')
	.draggable({
		inertia: true,
		restrict: {
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		},
		onmove: function (event) {
			var target = event.target,
				x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
				y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
			// translate the element
			target.style.webkitTransform =
				target.style.transform =
					'translate(' + x + 'px, ' + y + 'px)';

			// update the posiion attributes
			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		},
		// call this function on every dragend event
		onend: function (event) {
			var textEl = event.target.querySelector('p');

			textEl && (textEl.textContent =
				'moved a distance of '
				+ (Math.sqrt(event.dx * event.dx +
				event.dy * event.dy)|0) + 'px');
		}
	});

interact('.point')
	.draggable({
		inertia: true,
		restrict: {
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		},
		onmove: function (event) {
			var target = event.target,
				x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
				y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
			// translate the element
			target.style.webkitTransform =
				target.style.transform =
					'translate(' + x + 'px, ' + y + 'px)';
			points[event.target.id].eng(event);
			// update the posiion attributes
			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
			autoRender();
		},
		// call this function on every dragend event
		onend: function (event) {

		}
	});

interact('.pointx')
	.draggable({
		// enable inertial throwing
		inertia: true,
		// keep the element within the area of it's parent
		restrict: {
			elementRect: { left: 0, right: 0, top: 1, bottom: 1 }
		},

		// call this function on every dragmove event
		onmove: function (event) {
			var target = event.target,
			// keep the dragged position in the data-x/data-y attributes
				x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
				y = 0;
			// translate the element
			target.style.webkitTransform =
				target.style.transform =
					'translate(' + x + 'px, ' + y + 'px)';
			marksX[event.target.id].eng(event);

			// update the posiion attributes
			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		},
		// call this function on every dragend event
		onend: function (event) {
			var textEl = event.target.querySelector('p');
			textEl && (textEl.textContent =
				'moved a distance of '
				+ (Math.sqrt(event.dx * event.dx +
				event.dy * event.dy)|0) + 'px');
		}

	});

interact('.pointy')
	.draggable({
		onmove: function (event) {
			var target = event.target,
				x = 0,
				y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

			if (marksY[id].dQuantity < 20) {

			} else {

			}


			//lol (target.id);

			// translate the element
			target.style.webkitTransform =
				target.style.transform =
					'translate(' + x + 'px, ' + y + 'px)';
			marksY[event.target.id].eng(event);

			// update the posiion attributes
			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		},
		// call this function on every dragend event
		onend: function (event) {
			var textEl = event.target.querySelector('p');
			textEl && (textEl.textContent =
				'moved a distance of '
				+ (Math.sqrt(event.dx * event.dx +
				event.dy * event.dy)|0) + 'px');
		}

	});
function lol (id) {
	console.log();

}



//	zoom(descart);
//	zoom.scale([0.5, 0.5])

var fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", function () {
	if (this.files.length) {
		graph = svg.insert("image", 'g#descart')
			.classed("descart", true)
			.attr("xlink:href", this.files[0].name)
			.attr("x", 0)
			.attr("y", 0);
		if (FileReader) {
			var reader = new FileReader();
			reader.onloadend = function () {
				var img = document.createElement('img');
				img.onload = function () {
					graph.attr("width", this.width)
						.attr("height", this.height);
				};
				img.src = reader.result;
			};
			reader.readAsDataURL(this.files[0]);
		} else {
			graph.attr("height", 956)
				.attr("width", 606);
		}
	}
});