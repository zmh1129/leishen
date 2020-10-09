const gulp = require("gulp");

const htmlmin = require("gulp-htmlmin");
gulp.task("copy-html", function(){
    return gulp.src("*.html")
    .pipe(
        htmlmin({
          removeEmptyAttibutes: true, // 移出所有空属性
          collapseWhitespace: true, // 压缩 html
        })
    )
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})

gulp.task("images", function(){
    return gulp.src("images/*.{jpg,png}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

gulp.task("scripts", function(){
    return gulp.src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

gulp.task("data", function(){
    return gulp.src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})



const sass = require("gulp-sass");
const minifycss = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("sass", function(){
    return gulp.src("./stylesheet/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("sassIcon", function(){
    return gulp.src("./stylesheet/iconfont.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("descsass", function(){
    return gulp.src("./stylesheet/desc.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("desc.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("goodsListsass", function(){
    return gulp.src("./stylesheet/goods_list.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("goods_list.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("ordersass", function(){
    return gulp.src("./stylesheet/order.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("order.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("registersass", function(){
    return gulp.src("./stylesheet/register.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("register.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

gulp.task("bulid", ["copy-html","scripts","images","data","sass","sassIcon","descsass","goodsListsass","ordersass","registersass"], function(){
    console.log("项目建立成功");
})

//监听
gulp.task("watch", function(){
    gulp.watch("*.html", ["copy-html"]);
    gulp.watch("*.{jpg,png}", ["images"]);
    gulp.watch(["*.js", "!gulpfile.js"], ["scripts"]);
    gulp.watch(["*.json", "!package.json"], ["data"]);
    gulp.watch("./stylesheet/index.scss", ["sass"])
    gulp.watch("./stylesheet/iconfont.scss", ["sassIcon"]);
    gulp.watch("./stylesheet/desc.scss", ["descsass"]);
    gulp.watch("./stylesheet/goods_list.scss", ["goodsListsass"]);
    gulp.watch("./stylesheet/order.scss", ["ordersass"]);
    gulp.watch("./stylesheet/register.scss", ["registersass"]);
    
  
})

const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root:"dist",
        port: 666,
        livereload:true
    })
})

gulp.task("default", ["watch", "server"]);