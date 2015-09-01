var gulp        = require('gulp'),
    compass     = require('gulp-compass'),
    minifycss   = require('gulp-minify-css'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    concat      = require('gulp-concat'),
    path        = require('path');

gulp.task('compile', function() {
  gulp.src('./sass/**/*.scss')
    .pipe(compass({
      environment: 'development',
      config_file: './config.rb',
      bundle_exec: true
    }))
    .pipe(gulp.dest('css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('css'));
});

gulp.task('init', function() {
  gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/REM-unit-polyfill/js/rem.min.js',
      'bower_components/respond/dest/respond.min.js'
    ])
    .pipe(gulp.dest('js/lib'));

  gulp.src([
      'bower_components/modernizr/modernizr.js',
    ])
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('js/lib'));
});
