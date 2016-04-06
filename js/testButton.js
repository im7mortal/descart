
function test() {
	origin.x.originInput.value = 0.3;
	origin.y.originInput.value = 10;
	origin.x.originInput.onchange();
	origin.y.originInput.onchange();
	var testArray = [{"val":20,"q":208},{"val":30,"q":330.5},{"val":40,"q":419.15000000000003},{"val":50,"q":479.95500000000015},{"val":60,"q":538.7235000000004},{"val":70,"q":582.1299500000008},{"val":80,"q":623.2209150000015},{"val":90,"q":658.0755555000026},{"val":100,"q":688.9284443500044},{"val":150,"q":813.4899107950148},{"val":180,"q":863.9653959643225}];
	testArray.forEach(function (a) {
		new MarkY(a.val, a.q);
	});
	testArray = [{"val":0.4,"q":84},{"val":0.5,"q":150.99999999999997},{"val":0.6,"q":202.99999999999991},{"val":0.7,"q":247.99999999999977},{"val":0.8,"q":286.9999999999993},{"val":0.9,"q":321.9999999999974},{"val":1,"q":351.99999999998977},{"val":2,"q":556.9999999998909},{"val":2.5,"q":622.3999999998118}];
	testArray.forEach(function (a) {
		new MarkX(a.val, a.q);
	});
	svg.attr("height", parseInt(svg.attr("height")) + 700)
}
function test2() {
	var string = [];
	marks_Y.forEach(function(o) {
		string.push({
			val: o.value,
			q: o.quantity
		})
	});
	console.log(JSON.stringify(string));


	string = [];
	marks_X.forEach(function(o) {
		string.push({
			val: o.value,
			q: o.quantity
		})
	});
	console.log(JSON.stringify(string));

}
