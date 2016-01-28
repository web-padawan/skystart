var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    cssnano       = require('gulp-cssnano'),
    glob          = require('gulp-css-globbing'),
    plumber       = require('gulp-plumber'),
    postcss       = require('gulp-postcss'),
    rename        = require('gulp-rename'),
    spritesmith   = require('gulp.spritesmith'),
    autoprefixer  = require('autoprefixer'),
    browserSync   = require('browser-sync'),
    path          = require('path');

gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('browser-sync', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    open: false,
    injectChanges: true
  });
});

gulp.task('sprites', function() {
  var spriteData = gulp.src('images/icons/*.*')
    .pipe(spritesmith({
      imgName: 'sprites.png',
      cssName: '_sprites.scss',
      cssFormat: 'scss',
      algorithm: 'binary-tree',
      cssTemplate: 'templates/scss.template.mustache',
      cssVarMap: function(sprite) {
        sprite.name = 's-' + sprite.name
      }
    }));

  spriteData.img.pipe(gulp.dest('images/'));
  spriteData.css.pipe(gulp.dest('sass/helpers/'));
});

gulp.task('sass', function() {
  return gulp.src('sass/**/*.scss')
    .pipe(glob({
      extensions: ['.scss']
    }))
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['./sass', 'node_modules/susy/sass', 'node_modules/breakpoint-sass/stylesheets']
    }))
    .pipe(postcss([ autoprefixer({ browsers: ['IE >= 9'] }) ]))
    .pipe(gulp.dest('css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('css'));
});


gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch(['index.html', 'css/styles.css', 'js/*', 'images/*'], ['reload']);
});

gulp.task('default', ['browser-sync', 'watch']);
