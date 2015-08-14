var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("default", function () {
	return gulp.src([
		'js/js.js',
		'js/step1.js',
		'js/inter.js',
		'js/fileupload.js',
		'js/Mark.js',
		'js/MarkY.js',
		'js/MarkX.js',
		'js/point.js',
		'js/graph.js'
	])
		.pipe(babel())
		.pipe(concat("all.js"))
		.pipe(gulp.dest("public"));
});