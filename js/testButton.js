
function test() {
	origin.x.originInput.value = 0.3;
	origin.y.originInput.value = 12;
	origin.x.originInput.onchange();
	origin.y.originInput.onchange();
	var testArray = [{"val":20,"q":158},{"val":30,"q":278.5},{"val":40,"q":366.15000000000003},{"val":50,"q":428.95500000000015},{"val":60,"q":482.7235000000004},{"val":70,"q":528.1299500000008},{"val":80,"q":571.2209150000015},{"val":90,"q":604.0755555000026},{"val":100,"q":633.9284443500044},{"val":150,"q":758.4899107950148},{"val":180,"q":808.9653959643225}];
	testArray.forEach(function (a) {
		new MarkY(a.val, a.q);
	});
	testArray = [{"val":0.4,"q":81},{"val":0.5,"q":147.99999999999997},{"val":0.6,"q":200.99999999999991},{"val":0.7,"q":243.99999999999977},{"val":0.8,"q":281.9999999999993},{"val":0.9,"q":317.9999999999974},{"val":1,"q":346.99999999998977},{"val":2,"q":545.9999999998909},{"val":2.5,"q":611.3999999998118}];
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
