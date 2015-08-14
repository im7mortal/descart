var fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", function () {
	if (this.files.length) {
		graph = svg.insert("image", 'g#descart')
			.classed("gap", true)
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