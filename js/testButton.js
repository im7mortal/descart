
function test() {
	origin.x.originInput.value = 0.3;
	origin.y.originInput.value = 7;
	origin.x.originInput.onchange();
	origin.y.originInput.onchange();
	var testArray = [{"val":8,"q":36},{"val":9,"q":74},{"val":10,"q":102},{"val":20,"q":310},{"val":30,"q":427.79999999999995},{"val":40,"q":513.0599999999998},{"val":50,"q":576.0019999999995},{"val":60,"q":629.3033999999989},{"val":70,"q":673.150668833331},{"val":80,"q":714.6910258499955},{"val":90,"q":748.6096327783251},{"val":100,"q":779.6712645564854},{"val":150,"q":900.022565691999},{"val":180,"q":953.082528532279}];
	testArray.forEach(function (a) {
		new MarkY(a.val, a.q);
	});
	testArray = [{"val":0.4,"q":82},{"val":0.5,"q":145.99999999999997},{"val":0.6,"q":198},{"val":0.7,"q":233.00000000000023},{"val":0.8,"q":280.00000000000136},{"val":0.9,"q":314.00000000000546},{"val":1,"q":343.00000000002206},{"val":2,"q":544.0000000002381},{"val":2.5,"q":608.8000000004108}];
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
