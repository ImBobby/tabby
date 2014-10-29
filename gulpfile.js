var gulp      = require('gulp'),
    rubySass  = require('gulp-ruby-sass'),
    uglify    = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    rename    = require('gulp-rename'),
    concat    = require('gulp-concat'),
    del       = require('del');


/* Uglify JS
--------------------------------------------------------------------------- */

gulp.task('uglify', function () {
  var optsUglify = {
    preserveComments: 'some'
  };

  var optsRename = {
    suffix: '.min'
  };

  return gulp
    .src('src/tabby.js')
    .pipe(uglify(optsUglify))
    .pipe(rename(optsRename))
    .pipe(gulp.dest('build/'));
});


/* Minify CSS
--------------------------------------------------------------------------- */

gulp.task('minify', function () {
  var optsRename = {
    suffix: '.min'
  };

  var optsMinify = {
    keepSpecialComments: 1
  };

  return gulp
    .src(['src/tabby.css', 'src/tabby.theme.css'])
    .pipe(minifyCSS(optsMinify))
    .pipe(rename(optsRename))
    .pipe(gulp.dest('build/'))
    .pipe(concat('tabby.bundle.css'))
    .pipe(minifyCSS(optsMinify))
    .pipe(gulp.dest('build/'));
});


/* Delete build folder
--------------------------------------------------------------------------- */

gulp.task('clean', function (cb) {
  del([
    'build'
  ], cb);
});


/* Watch
--------------------------------------------------------------------------- */

gulp.task('watch', ['uglify', 'minify'], function () {
  gulp.watch('src/tabby.js', ['uglify']);
  gulp.watch('src/*.css', ['minify']);
});


/* Build production ready assets
--------------------------------------------------------------------------- */

gulp.task('build', ['clean'], function () {
  gulp.start('uglify', 'minify');
});