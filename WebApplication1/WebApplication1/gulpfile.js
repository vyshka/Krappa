/// <binding BeforeBuild='default' />
/// <reference path="Content/js/scripts.js" />
/// <binding BeforeBuild='default' />
// include plug-ins
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    less = require('gulp-less');

var jsDest = 'Content/js/',
    jsFiles = [
            'Content/js/jquery-3.1.1.js',
            'Content/js/jquery.validate.js',
            'Content/js/jquery.validate.unobtrusive.js',
            'Content/js/bootstrap.js',
            'Content/js/bootstrap-tabcollapse.js',
            'Content/js/jquery.fancybox.js'];
    cssDest = 'Content/css/',
    lessFiles = ['Content/less/base/*.less',
                'Content/less/layouts/*.less',
                'Content/less/modules/*.less',
                'Content/less/states/*.less',
                'Content/less/*.less'],
    cssOutFile = 'Style.css',
    jsOutFile = 'Content/js/script.js';
   



gulp.task('scripts', function () {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('less', function() {
    gulp.src(lessFiles)
        .pipe(less())
        .pipe(concatCss(cssOutFile, {rebaseUrls: false}))
        .pipe(gulp.dest(cssDest));
});

gulp.task('minify-css', ['less'], function() {
    return gulp.src('Content/css/Style.css')
      .pipe(cleanCSS())
      .pipe(rename({
            suffix: '.min'}))
      .pipe(gulp.dest('Content/css/'));
});

gulp.task('default', ['scripts', 'less', 'minify-css'], function () { });

