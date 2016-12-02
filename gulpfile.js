'use strict';
/* global require */

var eol = require('gulp-eol');
var gulp = require('gulp');
var merge = require('merge-stream');

var compilerPackage = require('google-closure-compiler');
var closureCompiler = compilerPackage.gulp();

var cssBinDir = './public/res/css/bin/';
var cssMinDir = './public/res/css/min/';
var cssSrcDir = './static/sass/';

// Очистка директорий CSS, от возможного муссора
var rm = require('gulp-rimraf');
gulp.task('clean-css', function() {
  return gulp.src([cssBinDir + '*', cssMinDir + '*']).pipe(rm());
});

// Перевод SASS в CSS
var sass = require('gulp-sass');
gulp.task('sass', ['clean-css'], function() {
  return gulp.src(cssSrcDir + '*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(eol())
    .pipe(gulp.dest(cssBinDir));
});

// Минификация CSS
var cssnano = require('gulp-cssnano');
gulp.task('minify-css', ['sass'], function() {
  return gulp.src(cssBinDir + '*.css')
    .pipe(cssnano())
    .pipe(gulp.dest(cssMinDir));
});

var jsBinDir = './public/res/js/bin/';
var jsMinDir = './public/res/js/min/';
var jsSrc = './static/js/';

var concat = require('gulp-concat-util');
var yaml = require('js-yaml');
var fs = require('fs');

// Очистка директорий CSS, от возможного муссора
gulp.task('clean-js', function() {
  return gulp.src([jsBinDir + '*', jsMinDir + '*']).pipe(rm());
});

var path = require('path');

function getAllJsFilesInDir(canvasEngineSrc) {
  return fs.readdirSync(canvasEngineSrc).filter(function(filename) {
    return path.extname(filename) === '.js';
  }).map(function(file) {
    return canvasEngineSrc + file;
  });
}

gulp.task('minify-js', ['clean-js'], function() {
  var dirList = [];

  var buildProperties = yaml.safeLoad(fs.readFileSync('static/js/externs.yaml', 'utf8'));
  for (var num in buildProperties.dirs) {
    var folder = buildProperties.dirs[num];
    var list = getAllJsFilesInDir(folder);
    dirList = dirList.concat(list);
  }

  for (num in buildProperties.files) {
    dirList.push(buildProperties.files[num]);
  }

  var tasks = [];
  buildProperties = yaml.safeLoad(fs.readFileSync('static/js/build.yaml', 'utf8'));

  for (var filename in buildProperties) {
    if (!buildProperties.hasOwnProperty(filename)) {
      continue;
    }

    var fileList = buildProperties[filename].list.map(function(folder) {
      return jsSrc + folder;
    });

    console.log(fileList);
    // @see https://developers.google.com/closure/compiler/docs/compilation_levels#whitespace_only
    var outputFilename = filename + '.js';
    var tempTask = gulp.src(fileList)
      .pipe(closureCompiler({
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        js_output_file: outputFilename,
        language_out: 'ECMASCRIPT5_STRICT',
        warning_level: 'VERBOSE',
        jscomp_warning: 'checkTypes',
        externs: dirList,
        // generate_exports: null,
        // formatting: 'PRETTY_PRINT',
        // js: 'H:/Project/closure-library/closure/goog/base.js',
        output_wrapper: '(function() {%output%}).call(window);'
      }))
      .pipe(gulp.dest(jsMinDir));

    tasks.push(tempTask);
  }

  return merge(tasks);
});
