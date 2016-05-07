/*eslint-env node */
var gulp=require('gulp');
var babel=require('gulp-babel');
var sourcemaps=require('gulp-sourcemaps');
//var rename = require('gulp-rename');
var path=require('path');
//var gutil =require('gulp-util');


gulp.task('lib', function() {
  return stdGulpTrans('src', 'lib');
});

gulp.task('common', function() {
  return stdGulpTrans('src/common', 'dst/common');
});


function stdGulpTrans(src, dst) {
  var sourceRoot = path.join(__dirname, src);
  var srcPath = [src+'/**/*.js',
    '!'+src+'/**/__tests__/**', '!'+src+'/**/__mocks__/**'];
  return gulp
    .src(srcPath)
    .pipe(sourcemaps.init())
    .pipe(babel({
      'presets': ['es2015', 'stage-0'],
      'plugins': ['transform-flow-strip-types']
    }) )
    .pipe(sourcemaps.write('.', {
      includeContent: true, sourceRoot: sourceRoot, debug:true
    }))
    .pipe(gulp.dest(dst));
}
