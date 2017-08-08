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
    less = require('gulp-less'),
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    clean = require('gulp-clean'),
    source = require('vinyl-source-stream');

 

var jsDest = 'Content/js/',
    sourceFile = './js/main.js',
    destFolder = './js/',
    destFile = 'findem.js';
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
   


gulp.task('temp', () => {
    return gulp.src([
            'Content/js/react/components/table.jsx', 
            'Content/js/react/components/addForm.jsx', 
            'Content/js/react/components/survey/editForm.jsx', 
            'Content/js/react/user-list.js', 
            'Content/js/react/vacancy-list.js',
            'Content/js/react/newSurvey.js'])
        .pipe(babel({
            plugins: ['transform-react-jsx']
        }))
        .pipe(gulp.dest('Content/js/out/'))
} )

gulp.task('browserifySurvey', ['temp'], function() {
    return browserify('Content/js/out/newSurvey.js')
        .transform(babelify.configure({
            presets: ["es2015"]
        }))
        .bundle()
        .pipe(source('newSurvey.js'))
        .pipe(gulp.dest('Content/js/'));
});


gulp.task('browserifyUser', ['temp'], function() {
    return browserify('Content/js/out/user-list.js')
        .transform(babelify.configure({
            presets: ["es2015"]
        }))
        .bundle()
        .pipe(source('UserList.js'))
        .pipe(gulp.dest('Content/js/'));
});


gulp.task('browserifyVacancy', ['temp'], function() {
    return browserify('Content/js/out/vacancy-list.js')
        .transform(babelify.configure({
            presets: ["es2015"]
        }))
        .bundle()
        .pipe(source('VacancyList.js'))
        .pipe(gulp.dest('Content/js/'));
});

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

gulp.task('clean', ['browserifyVacancy', 'browserifyUser', 'browserifySurvey'], function() {
    return gulp.src('Content/js/out', {read: false})
        .pipe(clean());
})

gulp.task('cleanSurvey', ['browserifySurvey'], function() {
    return gulp.src('Content/js/out', {read: false})
        .pipe(clean());
})

gulp.task('browserify', ['browserifyVacancy', 'browserifyUser', 'browserifySurvey'], function() { })


gulp.task('default', ['scripts', 'less', 'minify-css', 'temp', 'browserify', 'clean'], function () { });

gulp.task('survey', ['temp', 'browserifySurvey', 'cleanSurvey'], function() { })

