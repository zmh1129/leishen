console.log("加载成功");
require.config({
  paths:{
    jquery: "jquery-1.10.1.min",
    "jquery-cookie" : "jquery.cookie",
    parabola:"parabola",
    index:"index",
    nav:"nav",
    magnifier:"magnifier",
    magnifier_tab:"magnifier_tab",
    magnifier_tabimg:"magnifier_tabimg",
    discount:"discount",
    desc_ajax:"desc_ajax",
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

require(["nav","magnifier","magnifier_tab","magnifier_tabimg","discount","desc_ajax", "carnum","index"],
function(nav,magnifier,magnifier_tab,magnifier_tabimg,discount,desc_ajax,carnum,index){
  nav.rightNav();
  nav.leftNav();
  magnifier.magnifier();
  magnifier_tab.magnifier_tab();
  magnifier_tabimg.magnifier_tabimg();
  discount.discount();
  desc_ajax.download();
  carnum.download();
  index.fix();

})