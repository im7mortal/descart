function Point (x , y) {
	this.name = "point" + countPoints++;
	points[this.name] = this;
	var self = this;


	this.x = x || 20;
	this.y = y || 20;

	var drag = d3.behavior.drag()
		.on("dragstart", stopPropagation)
		.on('drag', function (d) {
			d.x += d3.event.dx;
			d.y += d3.event.dy;
			d3.select(this).attr("transform", function () {
				return "translate(" + [d.x, d.y] + ")"
			});
			points[this.id].eng(d3.event);
			autoRender();
		});

	this.g = descart.append("g")
		.attr("id", this.name)
		.data([{x : 1, y: 1}]) // smock заглушка
		.call(drag)
		.classed("point", true);

	var cx = widthSVGdescart / 2 + this.x,
		cy = heightSVGdescart / 2 - this.y;

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
		.attr("r", 3)
		.style({
			"stroke": "red",
			"opacity": 0
		});

}

Point.prototype.eng = function (event) {
	this.x += event.dx;
	this.y -= event.dy;
	this.rationer()
};

Point.prototype.rationer = function () {
	var X = 0;
	var quantityX = 0;

	var arrx = range.x.filter(function (o,i,a) {
		if(!i) return true;
		if(this.x > o.originalQuantity) {
			return true;
		} else if (this.x > a[i - 1].originalQuantity) {
			return true;
		}
		return false;
	}, this);
	arrx.forEach(function (object, i, array) {
		var offset = object.offset?object.offset:0;
		if(i === (array.length - 1)) {
			X += (this.x - quantityX) * object.ratio + offset;
		} else {
			quantityX += object.quantity;
			X += object.quantity * object.ratio + offset;
		}
	}, this);

	var Y = 0;
	var quantityY = 0;
	var arry = range.y.filter(function (o,i,a) {
		if(!i) return true;

		if(this.y > o.originalQuantity) {
			return true;
		} else if (this.y > a[i - 1].originalQuantity) {
			return true;
		}
		return false;
	}, this);
	console.log(arry);
	arry.forEach(function (object, i, array) {
		var offset = object.offset?object.offset:0;
		if(i === (array.length - 1)) {
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
	}

};