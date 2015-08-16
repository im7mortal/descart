var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var jade = require('gulp-jade');

gulp.task('default', [
		'jade',
		'js' ,
		'css'
	],
	function () {
	});

gulp.task('jade', function () {
	return gulp.src('dev/*.jade')
		.pipe(jade())
		.pipe(gulp.dest(''))
});

gulp.task("js", function () {
	return gulp.src([
		'dev/js/js.js',
		'dev/js/step1.js',
		'dev/js/fileupload.js',
		'dev/js/Mark.js',
		'dev/js/MarkY.js',
		'dev/js/MarkX.js',
		'dev/js/point.js',
		'dev/js/graph.js',
		'dev/js/testButton.js'
	])
		.pipe(babel())
		.pipe(concat("all.js"))
		.pipe(gulp.dest("public/js"));
});

gulp.task("css", function () {
	return gulp.src([
		'dev/css/descart.css'
	])
		.pipe(gulp.dest("public/css"));
});

var watcher = gulp.watch('dev/**', ['default']);
watcher.on('change', function(event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});