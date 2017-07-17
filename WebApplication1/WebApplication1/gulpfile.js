/// <reference path="Content/js/scripts.js" />
/// <binding BeforeBuild='default' />
// include plug-ins
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    rename = require('gulp-rename'),
    jsDest = 'Content/js/',
    jsFiles = [
            'Content/js/jquery-3.1.1.js',
            'Content/js/jquery.validate.js',
            'Content/js/jquery.validate.unobtrusive.js',
            'Content/js/bootstrap.js'],
    cssDest = './',
    cssFiles = ['Content/css/About.css',
                'Content/css/Auth.css',
                'Content/css/bootstrap.css',
                'Content/css/bootstrap-theme.css',
                'Content/css/Main.css',
                'Content/css/PagedList.css',
                'Content/css/Profile.css']
    cssOutFile = 'Content/css/Style.css';
   

gulp.task('minify-css', ['css'], () => {
    return gulp.src(cssOutFile)
      .pipe(cleanCSS())
      .pipe(rename({
            suffix: '.min'
        }))
      .pipe(gulp.dest('Content/css/'));
});

gulp.task('css',['cleancss'], function () {
    return gulp.src(cssFiles)
        .pipe(concatCss(cssOutFile, { rebaseUrls: false }))
        .pipe(gulp.dest(cssDest));
});

//delete the output file(s)
gulp.task('cleanjs', function () {
    //del is an async function and not a gulp plugin (just standard nodejs)
    //It returns a promise, so make sure you return that from this task function
    //  so gulp knows when the delete is complete
    return del(['Content/js/scripts.min.js', 'Content/js/scripts.js']);
});

gulp.task('cleancss', function () {
    //del is an async function and not a gulp plugin (just standard nodejs)
    //It returns a promise, so make sure you return that from this task function
    //  so gulp knows when the delete is complete
    return del(['Content/css/Style.css', 'Content/css/Style.min.css']);
});

// Combine and minify all files from the app folder
// This tasks depends on the clean task which means gulp will ensure that the 
// Clean task is completed before running the scripts task.
gulp.task('scripts',['cleanjs'], function () {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});


//Set a default tasks
gulp.task('default', ['cleancss', 'cleanjs', 'scripts', 'css', 'minify-css'], function () { });
