'use strict';
var gulp = require('gulp'),//"gulp": "^4.0.2",
    rigger = require('gulp-rigger'),//"gulp-rigger": "^0.5.8",
    sass = require('gulp-sass'),//"gulp-sass": "^4.0.2",
    prefixer = require('gulp-autoprefixer'),//"gulp-autoprefixer": "^7.0.0"
    imagemin = require('gulp-imagemin'),//"gulp-imagemin": "^6.1.0",
    watch = require('gulp-watch'),//"gulp-watch": "^5.0.1",
    pngquant = require('imagemin-pngquant'),//"imagemin-pngquant": "^8.0.0"
    sourcemaps = require('gulp-sourcemaps'),//"gulp-sourcemaps": "^2.6.5",
    rimraf = require('rimraf');
    // reload = browserSync.reload;//"browser-sync": "^2.26.7",
    var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/template/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
});
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
});
gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sass())
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
});
gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
});
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
gulp.task('build', gulp.parallel(
    'html:build',
    'js:build',
    'style:build',
    'image:build',
    'fonts:build'
));
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});
gulp.task('default', gulp.parallel(
    'build',
    'watch'
));
