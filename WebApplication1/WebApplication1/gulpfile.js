/// <binding BeforeBuild='default' />
/// <reference path="Content/js/scripts.js" />
/// <binding BeforeBuild='default' />
// include plug-ins
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    rename = require('gulp-rename');

var jsDest = 'Content/js/',
    jsFiles = [
            'Content/js/jquery-3.1.1.js',
            'Content/js/jquery.validate.js',
            'Content/js/jquery.validate.unobtrusive.js',
            'Content/js/bootstrap.js',
            'Content/js/bootstrap-tabcollapse.js',
            'Content/js/jquery.fancybox.js'];
    cssDest = './',
    cssFiles = ['Content/css/Auth.css',
                'Content/css/bootstrap.css',
                'Content/css/Main.css',
                'Content/css/Profile.css',
                'Content/css/media-queries.css',
                'Content/css/lightbox.css',
                'Content/css/jquery.fancybox.css'],
    cssOutFile = 'Content/css/Style.css',
    jsOutFile = 'Content/js/script.js';
   

gulp.task('minify-css', ['css'], () => {
    return gulp.src(cssOutFile)
      .pipe(cleanCSS())
      .pipe(rename({
            suffix: '.min'}))
      .pipe(gulp.dest('Content/css/'));
});

gulp.task('css',['clean'], function () {
    return gulp.src(cssFiles)
        .pipe(concatCss(cssOutFile, { rebaseUrls: false }))
        .pipe(gulp.dest(cssDest));
});

gulp.task('clean', function () {
    return del(['Content/css/Style.css', 'Content/css/Style.min.css', 'Content/js/scripts.min.js', 'Content/js/scripts.js']);
});

gulp.task('scripts',['clean'], function () {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});


gulp.task('default', ['clean', 'scripts', 'css', 'minify-css'], function () { });
