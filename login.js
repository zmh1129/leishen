console.log("加载成功");
require.config({
  paths:{
    jquery: "jquery-1.10.1.min",
    "jquery-cookie" : "jquery.cookie",
    parabola:"parabola",
    index:"index",
    login_ajax : "login_ajax",
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

require(["login_ajax","register_ajax"],
function(login_ajax,register_ajax){
  // login_ajax.loginSend();
  login_ajax.tab();
  login_ajax.tab1();
})