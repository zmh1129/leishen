define(["jquery", "jquery-cookie"], function($){
  function download(){
    var cookieStr = $.cookie("goods");
    var cookieArr = JSON.parse(cookieStr);
    var num = cookieArr.length;
    // console.log(num);
    $("#carNum").html(num);

  }


  return{
    download:download,
  }
});