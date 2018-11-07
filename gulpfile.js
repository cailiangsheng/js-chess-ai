var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')

var files = [
	'book.js',
	'position.js',
	'search.js',
	'cchess.js'
]

var folder = 'node_modules/xqbase.com/xqwlight'

var libs = files.map(file => `${folder}/${file}`)

var sources= libs.concat([
	'src/board.js',
	'src/index.js'
])

gulp.task('concat', () => {
	gulp.src(sources)
		.pipe(concat('xqwlight.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
})

gulp.task('default', ['concat'])
