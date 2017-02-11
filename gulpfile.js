/**
 * Created by chris on 12/4/2016.
 */
var gulp = require("gulp"),
    connect = require("gulp-connect"),
    historyApiFallback = require("connect-history-api-fallback"),
    sass = require("gulp-sass"),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps')
    cleanCSS = require('gulp-clean-css')
    uglify = require('gulp-uglify')
    htmlmin = require('gulp-htmlmin')
    lib = require('bower-files')()
    gutil = require( 'gulp-util' )  
    ftp = require( 'vinyl-ftp' )
    del = require('del')
    babel = require('gulp-babel')
    inject = require('gulp-inject')
    dom  = require('gulp-dom')
    imagemin = require('gulp-imagemin')
    runSequence = require('run-sequence');


/** FTP Configuration **/
var user = 'templebe';  
var password = 'TBTNJ2012';  
var host = '50.87.153.38';  
var port = 21;  
var deployFilesGlob = [
                        './app/dist/**/*',
                        './app/index.html'
                        ];
var deployFilesGlobMinusImages = [
                        './app/dist/**/*', '!./app/dist/img/**',
                        './app/index.html'
                        ];    
var remoteFolder = '/public_html/testdrive'

// helper function to build an FTP connection based on our configuration
function getFtpConnection() {  
    return ftp.create({
        host: host,
        port: port,
        user: user,
        password: password,
        parallel: 5,
        log: gutil.log
    });
}

/**
 * Deploy task.
*/
gulp.task('ftp-deploy', function() {

    var conn = getFtpConnection();

    return gulp.src(deployFilesGlob, { base: '.', buffer: false })
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files 
        .pipe( conn.dest( remoteFolder ) )
    ;
});

/**
 * Deploy task.
*/
gulp.task('ftp-deploy-minus-images', function() {

    var conn = getFtpConnection();

    return gulp.src(deployFilesGlobMinusImages, { base: '.', buffer: false })
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files 
        .pipe( conn.dest( remoteFolder ) )
    ;
});

/**
 * Watch deploy task.
 * Watches the local copy for changes and copies the new files to the server whenever an update is detected
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy-watch`
 */
gulp.task('ftp-deploy-watch', function() {

    var conn = getFtpConnection();

    gulp.watch(deployFilesGlob)
    .on('change', function(event) {
      console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);

      return gulp.src( [event.path], { base: '.', buffer: false } )
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files 
        .pipe( conn.dest( remoteFolder ) )
      ;
    });
});

// 1. Servidor web de desarrollo
gulp.task('server', function() {
    connect.server({
        root: './app',
        hostname: '0.0.0.0',
        port: 8085,
        livereload: true,
        middleware: function(connect, opt) {
            return [ historyApiFallback() ];
        }
    });
});

gulp.task('css', function() {
    gulp.src('./app/src/css/**/*.css')
        .pipe(connect.reload());
});
gulp.task('js', function() {
    gulp.src('./app/src/js/**/*.js')
        .pipe(connect.reload());
});
gulp.task('html', function() {
    gulp.src('./app/src/**/*.html')
        .pipe(connect.reload());
});
/*copy Roboto fonts*/
gulp.task('copyfonts', function() {
  gulp.src('./bower_components/materialize/fonts/**/*.{ttf,woff,woff2,eot,eof,svg}').pipe(gulp.dest('./app/src/lib/fonts'));
});

/*minificar html*/
gulp.task('minify-html', function() {
    return gulp.src('./app/src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./app/dist'))
});

/* minify js */
gulp.task('minify-js', function() {
    return gulp.src('./app/src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify({ mangle: false }).on('error', gutil.log))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/dist/js'));
});
/* Minify css */
gulp.task('minify-css', function() {
    return gulp.src('./app/src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/dist/css'));
});

/* Move bowerjs libraries */
gulp.task('bower-js', function() {
    gulp.src(lib.ext('js').files)
    .pipe(gulp.dest('./app/src/lib/js'));
});
/* Move bower css libararies*/
gulp.task('bower-css', function() {
    gulp.src(lib.ext('css').files)
    .pipe(gulp.dest('./app/src/lib/css'));
});
/* move bower components to build js */
gulp.task('bower-min-js', function() {
    gulp.src(lib.ext('js').files)
    .pipe(uglify())
    .pipe(gulp.dest('./app/dist/lib/js'));
});
/* move bower components to build css */
gulp.task('bower-min-css', function() {
    gulp.src(lib.ext('css').files)
    .pipe(cleanCSS())
    .pipe(gulp.dest('./app/dist/lib/css'));
});

gulp.task('imagemin', () =>
    gulp.src('./app/src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./app/dist/img'))
);

gulp.task('files', () =>
    gulp.src('./app/src/files/**/*')
    .pipe(gulp.dest('./app/dist/files'))
);

gulp.task('fonts', () =>
    gulp.src('./app/src/fonts/**/*')
    .pipe(gulp.dest('./app/dist/fonts'))
);

gulp.task('watch', function() {
    gulp.watch(['./app/src/**/*.html'], ['html']);
    gulp.watch(['./app/src/js/**/*.js'], ['js']);
    gulp.watch(['./app/src/css/**/*.css'], ['css']);
});

// Delete the dist directory
gulp.task('clean', function() {
 return del(['./app/dist/**/*', '!./app/dist/img/**', '!./app/dist/files/**']);
});

// Delete the dist directory
gulp.task('clean-all', function() {
 return del(['./app/dist/**/*']);
});

gulp.task('dev-html', function () {
  var target = gulp.src('./app/index.html');
  var sources = gulp.src(['./src/lib/js/jquery.js', './src/lib/js/angular.js', './src/lib/css/materialize.css', './src/**/*.js', './src/**/*.css'], {read: false, cwd: __dirname + '/app/'});

  return target.pipe(inject(sources))
    .pipe(dom(function(){
            this.querySelectorAll('#baseTag')[0].setAttribute("href", "/src/");
            return this;
        }))
    .pipe(gulp.dest('./app'));
});

gulp.task('prod-html', function () {
  var target = gulp.src('./app/index.html');
  var sources = gulp.src(['./lib/js/jquery.js', './lib/js/angular.js', './**/*.js'], {read: false, cwd: __dirname + '/app/dist/'});
  var cssSources = gulp.src(['./dist/lib/css/materialize.css', './dist/**/*.css'], {read: false, cwd: __dirname + '/app/'});
  return target.pipe(inject(sources, {addRootSlash: false }))
  .pipe(inject(cssSources, {addRootSlash: false }))
  .pipe(dom(function(){
            this.querySelectorAll('#baseTag')[0].setAttribute("href", "dist/");
            return this;
        }))
    .pipe(gulp.dest('./app'));
});

gulp.task('build', function(callback) {
  runSequence('clean',
              ['minify-css', 'minify-js', 'minify-html', 'bower-min-js', 'bower-min-css', 'fonts'],
              callback);
});

gulp.task('default',
    ['bower-js', 'bower-css', 'dev-html',  'server', 'watch']
);

gulp.task('deploy', function(callback) {
  runSequence('build', 'prod-html',
              'ftp-deploy-minus-images',
              callback);
});

gulp.task('deploy-images', function(callback) {
  runSequence('clean-all', 'build', ['prod-html', 'imagemin', 'files'],
              'ftp-deploy',
              callback);
});
