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
			return true
		}
	});
	return mark;
}
function removeMark(name, array) {
	var index;
	array.some(function (object, i, array) {
		if (object.name === name) {
			index = i;
			return true
		}
	});
	array.splice(index, 1)
}

function Mark() {
}

Mark.prototype.handler = function () {
	var number = parseFloat(this.input.value);
	var flag;
	this.array.some(function (object) {
		if (object.value === number) {
			flag = true;
			return true
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


Mark.prototype.init = function (value, quantity) {
	this.name = 'mark' + this.axes + countMark++;
	this.inputGroup = d3.select('#input' + this.axes)
		.append('div')
		.classed('input-group', true);
	this.inputGroup
		.append('span')
		.classed('input-group-btn', true)
		.append('button')
		.on('click', this.remove.bind(this))
		.attr('type', 'button')
		.classed('btn btn-default', true)
		.append('span')
		.attr('aria-hidden', 'true')
		.classed('glyphicon glyphicon-remove', true);

	this.input = this.inputGroup
		.append('input')
		.classed('form-control', true)
		.attr('type', 'text')
		.attr('name', this.name)
		.attr('placeholder', 'Search for...')[0][0];

	this.input.onchange = this.handler.bind(this);
	if(value && quantity) {

	}

};

Mark.prototype.remove = function () {
	if (this.g) this.g.remove();
	if (this.inputGroup) this.inputGroup.remove();
	removeMark(this.name, this.array)
};

Mark.prototype.prepareArray = function () {
	this.array.sort(function (object1, object2) {
		if (object1.value > object2.value) {
			return 1;
		} else {
			return -1;
		}
	})
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
	this.rangeArray
		.filter(function (o, i, a) {
			if (!i) return true;
			if (this.value > o.originalValue) {
				return true;
			} else if (this.value > a[i - 1].originalValue) {
				return true;
			}
			return false;
		}, this)
		.forEach(function (object, i, array) {
			var offset = object.offset ? object.offset : 0;
			var value;
			if (i === (array.length - 1)) {
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
		this.rangeArray.push(object)
	}, this)
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
