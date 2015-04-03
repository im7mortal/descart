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
			var marksYarr1 = d3.map(marksY).values()
				.sort(function (object1, object2) {
					if (object1.value > object2.value) {
						return 1;
					} else {
						return -1;
					}
				});
			this.x = 0;
			this.y = -100;
			if (marksYarr1.length > 1) {
				marksYarr1.forEach(function(mark, index, currentArray) {
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
				cy =centrHSVGdescart - 100;
				this.quantity = this.y + 200;
			}



			console.log(this.quantity);
			x1 = centrWSVGdescart - 50;
			x2 = centrWSVGdescart + 50;
			cx = centrWSVGdescart;
			y1 = y2 = cy;
			/*			this.g.append("line")
			 .attr("x1", centrWSVGdescart - 2000)
			 .attr("y1", centrHSVGdescart - 100)
			 .attr("x2", centrWSVGdescart + 2000)
			 .attr("y2", centrHSVGdescart - 100)
			 .style({
			 "stroke": "red",
			 "opacity": 0.5,
			 "stroke-width": 0.7
			 });*/

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
				this.text.attr("x", centrWSVGdescart + cy)
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
	marksXarr = prepareArray(d3.map(marksX).values());
	marksYarr = prepareArray(d3.map(marksY).values());
	fillRange(marksXarr);
	fillRange(marksYarr);


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