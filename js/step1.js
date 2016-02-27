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
origin.x.origin = descart.append('text')
	.attr('x', centrWSVGdescart - 30)
	.attr('y', centrHSVGdescart + 30)
	.text('');
origin.y.origin = descart.append('text')
	.attr('x', centrWSVGdescart - 30)
	.attr('y', centrHSVGdescart -30)
	.text('');

var validateAxisInput = function (object, axis) {
	return function () {
		if(this.value && isFinite(this.value)) {
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
	}
};
origin.x.originInput.onchange = validateAxisInput(origin.x, 'x');
origin.y.originInput.onchange = validateAxisInput(origin.y, 'y');

origin.x.originInput.value = 0;
origin.x.originInput.onchange();
origin.y.originInput.value = 0;
origin.y.originInput.onchange();
