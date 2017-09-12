var del = require('del');
var browserify = require('browserify');
var jshint = require('gulp-jshint');
var utilities = require('gulp-util');
var gulp = require('gulp');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var buildProduction = utilities.env.production;
var lib = require('bower-files')({
  "overrides": {
    "bootstrap": {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});



//this will concat the interface file into concat js file to  tmp folder
gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
})
//this will browserify source code into code the broswer can read and also make build folder
gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

//this will remove unnecessary characters in app js file
gulp.task('minifyScripts', ['jsBrowserify'], function() {
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
})
//this will clean the files to ensure up-to-date versions
gulp.task('clean', function() {
  return del(['build', 'tmp'])
})
//this will check for any code not in stylistic convention
gulp.task('jshint', function() {
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
})

gulp.task('bowerJS', function() {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
})

gulp.task('bowerCSS', function() {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'))
})

gulp.task('bower', ['bowerJS', 'bowerCSS']);
//this will create a dev or production build
gulp.task('build', ['clean'], function() {
  if (buildProduction) {
    gulp.start('minifyScripts')
  } else {
    gulp.start('jsBrowserify')
  }
})

//this will set up a local host
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
   gulp.watch(['js/*.js'], ['jsBuild']);
   gulp.watch(['bower.json'], ['bowerBuild']);
   gulp.watch(['*.html'], ['htmlBuild']);
   gulp.watch(["scss/*.scss"], ['bowerBuild']);

});

gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});

gulp.task('htmlBuild', function(){
  browserSync.reload();
});
