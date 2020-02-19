const gulp = require("gulp");
const watch = require("gulp-watch");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();



gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});


gulp.task("scss", function () {
    return gulp.src("./src/scss/styles.scss")
        .pipe(sass())
        .pipe(gulp.dest("./src/"))
        .pipe(browserSync.stream());
});


gulp.task('watch', function () {

    watch(["./src/*.html", "./src/scripts/*.js", "./src/images/*.*"], gulp.parallel(browserSync.reload));

    watch('./src/scss/**/*.scss', function () {
        setTimeout(gulp.series('scss'), 500);
    });


});

gulp.task("default", gulp.series("scss", gulp.parallel("server", "watch")));