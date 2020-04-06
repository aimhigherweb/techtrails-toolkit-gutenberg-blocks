//Variables
const gulp = require('gulp'),
 sass = require('gulp-sass'),
 sourcemaps = require('gulp-sourcemaps')

//File Paths
const sassFiles = 'src/blocks/**/*.scss',
	sourceMaps = '../maps'

//Compile main sass into css
function sassy() {
	return gulp
		.src(sassFiles)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError)) //Using gulp-sass
		.pipe(sourcemaps.write(sourceMaps))
		// .pipe(rename(path => {
		// 	let name = path.dirname.replace('../maps/', '')

		// 		path.dirname = ''
		// 		path.basename = name
		// 		path.extname = path.extname
		// }))
		.pipe(gulp.dest('src/blocks'))
}

//Watch for changes in sass files and running sass compile

function watch() {
	gulp.watch(sassFiles, sassy)
	gulp.watch([
		'./*.php',
		'./layouts/**/*.php',
		'./source/scss/**/*.scss',
	])
}

exports.sassy = sassy
exports.watch = watch