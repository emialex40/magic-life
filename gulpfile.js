'use strict';

var gulp           	   = require('gulp'),
		pug 		   = require('gulp-pug'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify");

// Скрипты

gulp.task('pug', function() {
	return gulp.src('src/pug/*.pug')
		.pipe(pug({
			pretty:true
		}))
		.pipe(gulp.dest('src'))
		.pipe(browserSync.reload({stream: true})); // указываем gulp куда положить скомпилированные HTML файлы
});

gulp.task('libs', function() {
	return gulp.src([
		'src/libs/**/*.*'
	])
		.pipe(gulp.dest('build/libs'));
});

gulp.task('common-js', function() {
	return gulp.src([
		'src/js/common.js'
	])
		.pipe(gulp.dest('src/js'));
});

gulp.task('common-js', function() {
	return gulp.src([
		'src/js/common.js'
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
});


gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'src/libs/jquery/build/jquery.min.js',
		'src/js/common.js' // Всегда в конце
		])
	.pipe(concat('common.js'))
	//.pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('build/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false,
		//tunnel: true,
		//tunnel: "projectmane" //Demonstration page: http://gta.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp.src('src/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	//.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	//.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('src/css'))
	.pipe(gulp.dest('build/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('src/sass/**/*.sass', ['sass']);
	gulp.watch('src/pug/**/*.pug', ['pug']);
	gulp.watch('src/sass/**/*.sass', ['sass']);
	gulp.watch(['libs/**/*.js', 'src/js/common.js'], ['js']);
	gulp.watch('src/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('src/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('build/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'libs', 'sass', 'js'], function() {

	var buildFiles = gulp.src([
		'src/*.html',
		'src/.htaccess'
		]).pipe(gulp.dest('build'));

	var buildCss = gulp.src([
		'src/css/main.css'
		])
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(cleanCSS())
		.pipe(gulp.dest('build/css'));

	var buildJs = gulp.src([
		'src/js/scripts.min.js'
		]).pipe(gulp.dest('build/js'));

	var buildFonts = gulp.src([
		'src/fonts/**/*'
		]).pipe(gulp.dest('build/fonts'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
