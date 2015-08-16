var fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", function () {
	if (this.files.length) {
		var gapDrag = d3.behavior.drag()
			.on("dragstart", stopPropagation)
			.on('drag', function (d) {
				d.x += d3.event.dx;
				d.y += d3.event.dy;
				d3.select(this).attr("transform", function () {
					return "translate(" + [d.x, d.y] + ")"
				});
			});
		graph = svg.insert("image", 'g#descart')
			.classed("gap", true)
			.data([{x : 1, y: 1}]) // smock заглушка
			.call(gapDrag)
			.attr("xlink:href", this.files[0].name)
			.attr("x", 0)
			.attr("y", 0);
		if (FileReader) {
			var reader = new FileReader();
			reader.onloadend = function () {
				var img = document.createElement('img');
				img.onload = function () {
					graph.attr("width", this.width)
						.attr("height", this.height);
				};
				img.src = reader.result;
			};
			reader.readAsDataURL(this.files[0]);
		} else {
			graph.attr("height", 956)
				.attr("width", 606);
		}
	}
});