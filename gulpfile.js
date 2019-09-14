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
gulp.task('html:build', async function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});
gulp.task('js:build', async function () {
  gulp.src(path.src.js)
      .pipe(rigger())
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.build.js));
});
gulp.task('style:build', async function () {
  gulp.src(path.src.style)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(prefixer())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.build.css));
});
gulp.task('image:build', async function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
});
gulp.task('fonts:build', async function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});
gulp.task('build', gulp.parallel(
    'html:build',
    'js:build',
    'style:build',
    'image:build',
    'fonts:build'
));
gulp.task('watch', function(done){
    watch([path.watch.html], function(event, cb, done) {
        gulp.start('html:build');
        done();
    });
    watch([path.watch.style], function(event, cb, done) {
        gulp.start('style:build');
        done();
    });
    watch([path.watch.js], function(event, cb, done) {
        gulp.start('js:build');
        done();
    });
    watch([path.watch.img], function(event, cb, done) {
        gulp.start('image:build');
        done();
    });
    watch([path.watch.fonts], function(event, cb, done) {
        gulp.start('fonts:build');
        done();
    });
});
gulp.task('default', gulp.parallel(
    'build',
    'watch'
));
