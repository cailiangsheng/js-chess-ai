var gulp = require('gulp')
var babel = require('gulp-babel')
var clean = require('gulp-clean')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var runSequence = require('run-sequence')

var folder = 'node_modules/xqbase.com/xqwlight'

var libs = [
		'book.js',
		'position.js',
		'search.js'
	]
	.map(file => `${folder}/${file}`)
	.concat('src/cchess.js')

var sources_xqwlight = libs.concat([
	'src/board.js',
	'src/xqwlight.js'
])

var sources_eve = libs.concat([
	'src/board.js',
	'src/eve.js'
])

var sources_ai = libs.concat([
	'src/ai.js'
])

gulp.task('clean', () => {
	return gulp.src(['./dist', './demo'], { read: false })
		.pipe(clean())
})

gulp.task('demo-xqwlight', () => {
	return gulp.src(sources_xqwlight)
		.pipe(concat('xqwlight.js'))
		.pipe(uglify())
		.pipe(gulp.dest('demo'))
})

gulp.task('demo-eve', () => {
	return gulp.src(sources_eve)
		.pipe(concat('eve.js'))
		.pipe(gulp.dest('demo'))
})

gulp.task('dist-ai', () => {
	return gulp.src(sources_ai)
		.pipe(concat('ai.js'))
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
})

gulp.task('dist-index', () => {
	return gulp.src('src/index.js')
		.pipe(concat('index.js'))
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
})

gulp.task('demo-assets', (cb) => {
	var files = ['src/style.css', 'src/xqwlight.htm', 'src/eve.htm', 'node_modules/xqbase.com/background.gif']
	var folders = ['sounds', 'images']

	let count = 0
	var callback = () => {
		count++
		return () => {
			if (--count === 0) cb()
		}
	}

	gulp.src(files).pipe(gulp.dest('demo')).on('end', callback())

	folders.forEach(resource => {
		gulp.src(`${folder}/${resource}/*`)
			.pipe(gulp.dest(`demo/${resource}`))
			.on('end', callback())
	})
})

gulp.task('default', (cb) => {
	runSequence('clean', 'demo-xqwlight', 'demo-eve', 'dist-ai', 'dist-index', 'demo-assets', cb)
})
