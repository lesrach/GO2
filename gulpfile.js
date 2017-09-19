var gulp = require("gulp"),
	minifyCss = require("gulp-clean-css"),
	uglify = require("gulp-uglify"),
	htmlMin = require("gulp-htmlmin"),
	sass = require("gulp-sass");
	livereload = require("gulp-livereload");

gulp.task("css",function(){
	gulp.src("css/*.css")
		.pipe(minifyCss())
		.pipe(gulp.dest("dist/css"))
		.pipe(livereload());
})

gulp.task("js",function(){
	gulp.src("js/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(livereload());
})

gulp.task("html",function(){
	gulp.src("html/*.html")
		.pipe(htmlMin({collapseWhitespace:true}))
		.pipe(gulp.dest("dist/html"))
		.pipe(livereload());
})	

gulp.task("sass",function(){
	gulp.src("sass/*.scss")
		.pipe(sass({outputStyle: 'compact'}))
		.pipe(gulp.dest("css"))
		.pipe(livereload());
}) 

gulp.task("watch",function(){
	livereload.listen();
	gulp.watch("sass/*.scss",["sass"]);
	gulp.watch("html/*.html",["html"]);
})


//默认任务
gulp.task("default",["js","css","html"]);
