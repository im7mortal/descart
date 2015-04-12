

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
	d3.map(points).values()
		.sort(function (object1, object2) {
			if (object1.x > object2.x) {
				return 1;
			} else {
				return -1;
			}
		})
		.forEach(function (o, i) {
			var b = o.rationer();
			csv += b.x + "; " + Math.pow(10, b.x) + "; " + b.y + "<br>";
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