var gulp          = require('gulp'),
    compass       = require('gulp-compass'),
    minifycss     = require('gulp-minify-css'),
    postcss       = require('gulp-postcss'),
    autoprefixer  = require('autoprefixer'),
    browserSync   = require('browser-sync'),
    rename        = require('gulp-rename'),
    path          = require('path');

gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('browser-sync', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      bundle_exec: true
    }))
    .pipe(postcss([ autoprefixer({ browsers: ['IE >= 9'] }) ]))
    .pipe(gulp.dest('css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch(['index.html', 'css/styles.css', 'js/*', 'images/*'], ['reload']);
});

gulp.task('default', ['browser-sync', 'watch']);
