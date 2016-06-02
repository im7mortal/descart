
function test() {
	origin.x.originInput.value = 0.3;
	origin.y.originInput.value = 8;
	origin.x.originInput.onchange();
	origin.y.originInput.onchange();
	var testArray = [{"val":9,"q":32},{"val":10,"q":64},{"val":20,"q":268},{"val":30,"q":387.5},{"val":40,"q":473.15000000000003},{"val":50,"q":529.9550000000002},{"val":60,"q":587.7235000000004},{"val":70,"q":639.1299500000008},{"val":80,"q":678.2209150000015},{"val":90,"q":714.0755555000026},{"val":100,"q":740.9284443500044},{"val":150,"q":857.4899107950148},{"val":180,"q":914.9653959643225}];
	testArray.forEach(function (a) {
		new MarkY(a.val, a.q);
	});
	testArray = [{"val":0.4,"q":81},{"val":0.5,"q":145.99999999999997},{"val":0.6,"q":200.99999999999991},{"val":0.7,"q":241.99999999999977},{"val":0.8,"q":280.9999999999993},{"val":0.9,"q":313.9999999999974},{"val":1,"q":343.99999999998977},{"val":2,"q":545.9999999998909},{"val":2.5,"q":611.3999999998118}];
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
