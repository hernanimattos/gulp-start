var fs = require('fs');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var prefixCSS = require('gulp-prefix-css');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


var path = 'passo_2_codificando/slider/Slider 009';

gulp.task('component', function() {
    gulp.run('less', 'html', 'img', 'js', 'css', function() {

    });
});
// tarefa de prefixaao dos componentes

gulp.task('css', function() {
    return gulp.src('assets/css/header_old_mod_003.css')
        .pipe(prefixCSS('.header_old_mod_003'))
        .pipe(gulp.dest(`./component/assets/css/`));

    // .pipe(gulp.dest(`../../../../${path}/component/assets/css/`));
});
gulp.task('js', function() {
    return gulp.src('assets/js/header_old_mod_003.js')
        .pipe(gulp.dest(`./component/assets/js/`));
    // .pipe(gulp.dest(`../../../../${path}/component/assets/js/`));
});
gulp.task('html', function() {

    return gulp.src("*.html")
        .pipe(gulp.dest(`./component`));
    // .pipe(gulp.dest(`../../../../${path}/component/`));
});
gulp.task('img', function() {
    return gulp.src("assets/img/*")
        .pipe(gulp.dest(`./component/assets/img`));

    // .pipe(gulp.dest(`../../../../${path}/component/assets/img`));
});


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