var widthSVGdescart = document.body.clientWidth;
var heightSVGdescart = 2000;
var centrHSVGdescart = 1000;
var centrWSVGdescart = document.body.clientWidth / 2;
// freeze
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
var svg = d3.select("body")
	.append("svg")
	.attr("width", widthSVGdescart)
	.attr("height", heightSVGdescart);


function increaseCanvas() {
	svg.attr("height", parseInt(svg.attr("height")) + 100)
}

var zoom = d3.behavior.zoom();

var descartDrag = d3.behavior.drag()
	.on("dragstart", stopPropagation)
	.on('drag', function (d) {
		d.x += d3.event.dx;
		d.y += d3.event.dy;
		d3.select(this).attr("transform", function () {
			return "translate(" + [d.x, d.y] + ")"
		});
		origin.x.x += d3.event.dx;
		origin.y.y -= d3.event.dy;
	});

var descart = svg.append("g")
	.attr("id", "descart")
	.data([{x: 1, y: 1}]) // smock заглушка
	.call(descartDrag)
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

var flag1;
svg.on('mousedown', function () {
	flag1 = 1;
});
var r;
svg.on('mousemove', addPoint);
svg.on('mouseup', click);


function click () {
		r = !r;
}
function addPoint() {
		if (!r) return;
		if (trumen) {
			
		var coordinates = d3.mouse(this);
		var x = coordinates[0] - origin.x.x;
		var y = centrHSVGdescart - coordinates[1] + centrHSVGdescart - origin.y.y;
		var ty = true;
		var arr = d3.map(points).values()
			;
		if (arr.length) {
			ty = !arr.some(function (object1) {
				if (object1.x === x) {
					return true;
				}
			})
		}


		if (ty) {
			new Point(x, y);
		}
	}
	flag1 = 0;
}


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


function fasten(name) {
	if (name === "descart")descart.classed("descart", fastenFlag[name] = !fastenFlag[name]);
	if (name === "graph")graph.classed("descart", fastenFlag[name] = !fastenFlag[name]);
}
function sign(value) {
	if (value > 0) {
		return (1)
	} else if (value < 0) {
		return (-1)
	} else {
		return (0)
	}
}
function stopPropagation() {
	d3.event.sourceEvent.stopPropagation(); // silence other listeners
}