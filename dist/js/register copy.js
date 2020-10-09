console.log("加载成功");
require.config({
  paths:{
    jquery: "jquery-1.10.1.min",
    "jquery-cookie" : "jquery.cookie",
    parabola:"parabola",
    index:"index",
    register_ajax : "register_ajax"
    
    
   
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

require(["register_ajax"],
function(register_ajax){
  register_ajax.registerSend();
})