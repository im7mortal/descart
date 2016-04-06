
function test() {
	origin.x.originInput.value = 0.3;
	origin.y.originInput.value = 11;
	origin.x.originInput.onchange();
	origin.y.originInput.onchange();
	var testArray = [{"val":20,"q":179},{"val":30,"q":302.5},{"val":40,"q":384.15000000000003},{"val":50,"q":447.95500000000015},{"val":60,"q":505.7235000000004},{"val":70,"q":551.1299500000008},{"val":80,"q":590.2209150000015},{"val":90,"q":627.0755555000026},{"val":100,"q":656.9284443500044},{"val":150,"q":777.4899107950148},{"val":180,"q":828.9653959643225}];
	testArray.forEach(function (a) {
		new MarkY(a.val, a.q);
	});
	testArray = [{"val":0.4,"q":78},{"val":0.5,"q":141.99999999999997},{"val":0.6,"q":196.99999999999991},{"val":0.7,"q":236.99999999999977},{"val":0.8,"q":277.9999999999993},{"val":0.9,"q":310.9999999999974},{"val":1,"q":339.99999999998977},{"val":2,"q":540.9999999998909},{"val":2.5,"q":606.3999999998118}];
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
