console.log("加载成功");
require.config({
  paths:{
    jquery: "jquery-1.10.1.min",
    "jquery-cookie" : "jquery.cookie",
    parabola:"parabola",
    index:"index",
    nav: "nav",
    carnum:"carnum"
  },
  shim: {
    //设置依托关系
    "jquery-cookie": ["jquery"],
    parabola: {
        exports: "_",
    }
  }
})

require(["index","nav","carnum"],function(index,nav,carnum){
  index.banner1();
  index.banner2();
  // nav.rightNav();
  // nav.leftNav()
  index.rightNav();
  index.nav();
  index.fix();
  carnum.download();
})