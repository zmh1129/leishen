console.log("加载成功");
require.config({
  paths:{
    jquery: "jquery-1.10.1.min",
    "jquery-cookie" : "jquery.cookie",
    parabola:"parabola",
    index:"index",
    nav:"nav",
    goods_list_ajax:"goods_list_ajax",
    goods_list_tab:"goods_list_tab",
    order_ajax:"order_ajax",
    carnum:"carnum"
  },
  shim: {
    //设置依托关系
    "jquery-cookie": ["jquery"],
    "goods_list_tab":["goods_list_ajax"],
    index:"index",
    parabola: {
        exports: "_",
    }
  }
})

require(["nav","goods_list_ajax","goods_list_tab","order_ajax","carnum","index"],
function(nav,goods_list_ajax,goods_list_tab,order_ajax,carnum,index){
  nav.rightNav();
  nav.leftNav();
  goods_list_ajax.goods_list_ajax();
  order_ajax.isCheckAll();
  order_ajax.carData();
  goods_list_tab.goods_list_tab();
  carnum.download();
  index.fix();
  
  
})