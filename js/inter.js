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
	})




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


function sign (value) {
	if (value > 0) {
		return(1)
	} else if (value < 0) {
		return(-1)
	} else {
		return(0)
	}
}


function accelerator (arr, event) {
	arr.forEach(function(object, i, array) {
		if(object.name === event.target.id) {
			if (event.dy < 0) {
				if (i !== array.length - 1) {
					if (array[i + 1].dQuantity + event.dy <= 15) {
						event.dy = 0;
					}
				}
			} else {
				console.log(object.dQuantity + event.dy);
				if (object.dQuantity + event.dy  <= 15) {
					event.dy = 0;
				}
			}
		}
	})
}


interact('.pointy')
	.draggable({
		// enable inertial throwing
		// keep the element within the area of it's parent
		restrict: {
			elementRect: { left: 0, right: 0, top: 1, bottom: 1 }
		},

		// call this function on every dragmove event
		onmove: function (event) {
			var target = event.target;
			// keep the dragged position in the data-x/data-y attributes
			event.dy = 1 * sign(event.dy);
			if (event.dy === 0) return;
			accelerator(marksYarr, event);

			var x = 0,
				y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
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
