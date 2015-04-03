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
function sign (value) {
	if (value > 0) {
		return(1)
	} else if (value < 0) {
		return(-1)
	} else {
		return(0)
	}
}