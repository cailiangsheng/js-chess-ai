var gulp = require('gulp')
var clean = require('gulp-clean')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var runSequence = require('run-sequence')

var files = [
	'book.js',
	'position.js',
	'search.js',
	'cchess.js'
]

var folder = 'node_modules/xqbase.com/xqwlight'

var libs = files.map(file => `${folder}/${file}`)

var sources = libs.concat([
	'src/board.js',
	'src/index.js'
	// 'src/main.js'
])

var sources_ai = libs.concat([
	'src/ai.js'
])

gulp.task('clean', () => {
	return gulp.src('./dist', { read: false })
		.pipe(clean())
})

gulp.task('concat', () => {
	return gulp.src(sources)
		.pipe(concat('xqwlight.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
})

gulp.task('concat-ai', () => {
	return gulp.src(sources_ai)
		.pipe(concat('ai.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('dist'))
})

gulp.task('copy', (cb) => {
	var assets = ['src/style.css', 'src/index.htm', 'node_modules/xqbase.com/background.gif']
	var resources = ['sounds', 'images']

	let count = 0
	var callback = () => {
		count++
		return () => {
			if (--count === 0) cb()
		}
	}

	gulp.src(assets).pipe(gulp.dest('dist')).on('end', callback())

	resources.forEach(resource => {
		gulp.src(`${folder}/${resource}/*`)
			.pipe(gulp.dest(`dist/${resource}`))
			.on('end', callback())
	})
})

gulp.task('default', (cb) => {
	runSequence('clean', 'concat', 'concat-ai', 'copy', cb)
})
