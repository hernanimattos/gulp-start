var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var prefixCSS = require('gulp-prefix-css');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('default', function() {
    // place code for your default task here
});

// tarefa de prefixaao dos componentes
gulp.task('css', function() {
    return gulp.src('assets/css/style.css')
        .pipe(prefixCSS('.slider_009'))
        .pipe(gulp.dest('assets/css/'))
        .pipe(gulp.dest('../dist/assets/css/'));
});
gulp.task('js', function() {
    return gulp.src('assets/js/main.js')
        .pipe(gulp.dest('../dist/assets/js/'));
});
gulp.task('html', function() {
    return gulp.src("*.html")
        .pipe(gulp.dest('../dist'));
});
gulp.task('img', function() {
    return gulp.src("assets/img/*")
        .pipe(gulp.dest('../dist/assets/img'));
})

// ============ tasks from build app
gulp.task('compress-js', function(cb) {
    pump([
            gulp.src('assets/js/main.js'),
            uglify(),
            gulp.dest('dist/assets/js/')
        ],
        cb
    );
});
gulp.task('minify-css', function() {
    return gulp.src('assets/css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/assets/css/'));
});

// ============fim task build app

gulp.task('less', function() {
    return gulp.src('assets/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('browser', function() {
    browserSync.init({
        server: {
            baseDir: ""
        }
    });
    gulp.watch("assets/less/*.less", ['less']).on('change', browserSync.reload, gulp.less);
    gulp.watch("assets/js/main.js").on('change', browserSync.reload);
    gulp.watch("assets/css/style.css", ['css']).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});