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

			origin.x.x += event.dx;
			origin.y.y -= event.dy;

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
interact('.gap')
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
