console.log("加载成功");
require.config({
  paths:{
    jquery: "jquery-1.10.1.min",
    "jquery-cookie" : "jquery.cookie",
    parabola:"parabola",
    index:"index",
    order_ajax:"order_ajax",
    carnum:"carnum"
    
   
  },
  shim: {
    //设置依托关系
    "jquery-cookie": ["jquery"],
    "goods_list_tab":["goods_list_ajax"],
    parabola: {
        exports: "_",
    }
  }
})

require(["order_ajax","carnum","index"],
function(order_ajax,carnum,index){
  order_ajax.carData();
  order_ajax.checkFn();
  order_ajax.isCheckAll();
  order_ajax.changeCars();
  carnum.download();
  index.fix();

})