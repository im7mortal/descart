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

var marks = {};
var points = {};

var marksYarr = [];
var marksXarr = [];

//Create SVG element
var svg = d3.select("body")
	.append("svg")
	.attr("width", widthSVGdescart)
	.attr("height", heightSVGdescart);

function increaseCanvas () {
	svg.attr("height", parseInt(svg.attr("height")) + 100)
}

var zoom =  d3.behavior.zoom();



var descart = svg.append("g")
	.attr("id", "descart")
	.classed("descart", true);



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


var marksGroup = descart.append("g")
	.attr("id", "marksGroup");



function fasten (name) {
	if(name === "descart")descart.classed("descart", fastenFlag[name] = !fastenFlag[name]);
	if(name === "graph")graph.classed("descart", fastenFlag[name] = !fastenFlag[name]);
}





var marksX = {};
var marksY = {};


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
		var object = {
			"originalQuantity": mark.quantity,
			"quantity": quantity,
			"value": value,
			"ratio": value / quantity
		};
		mark.dQuantity = quantity;
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