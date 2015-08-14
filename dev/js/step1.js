var origin = {
	"x": {},
	"y": {}
};
origin.x.x = centrWSVGdescart;
origin.y.y = centrHSVGdescart;
origin.x.originXInput = document.getElementById('originX');
origin.y.originYInput = document.getElementById('originY');
origin.x.tipX = document.getElementById('tipX');
origin.y.tipY = document.getElementById('tipY');
origin.x.originX = descart.append('text')
	.attr('x', centrWSVGdescart - 30)
	.attr('y', centrHSVGdescart + 30)
	.text('');
origin.y.originY = descart.append('text')
	.attr('x', centrWSVGdescart - 30)
	.attr('y', centrHSVGdescart -30)
	.text('');
origin.x.originXInput.onchange = function () {
	if(this.value && isFinite(this.value)) {
		origin.x.tipX.style.display = 'none';
		origin.x.originX.text(this.value);
		origin.x.value = this.value;
	} else {
		origin.x.tipX.style.display = 'block';
		origin.x.tipX.style.color = 'red';
		origin.x.tipX.innerHTML = 'Задайте корректное начало отсчета по X';
		origin.x.originX.text('');
		origin.x.value = null;
	}
};
origin.y.originYInput.onchange = function () {
	if(this.value && isFinite(this.value)) {
		origin.y.tipY.style.display = 'none';
		origin.y.originY.text(this.value);
		origin.y.value = this.value;
	} else {
		origin.y.tipY.style.display = 'block';
		origin.y.tipY.style.color = 'red';
		origin.y.tipY.innerHTML = 'Задайте корректное начало отсчета по Y';
		origin.y.originY.text('');
		origin.y.value = null;
	}
};
origin.x.originXInput.value = 0;
origin.x.originXInput.onchange();
origin.y.originYInput.value = 0;
origin.y.originYInput.onchange();
