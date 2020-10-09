define(["jquery"],function($){
  function loginSend(){
    $("#btn_register").click(function(){
      $.ajax({
        type: "post",
        url:"./php/login.php",
        data:{
          username:$(".form-control").eq(0).val(),
          password:$(".form-control").eq(1).val()
        },
        success: function(msg){
          console.log(msg);
          var obj = JSON.parse(msg); //JSON.parse (<anonymous>) 返回的字符串不是json格式。
          if(obj.code){
            console.log(1)
            $(".err").attr("class" , "show");
          }else{
            $(".err").find(".des").attr("class" , "show");
            $("#text").attr("class" , "right");
          }
          $(".des").find("#text").html(obj.msg);
        },
        error: function(msg){
          console.log(msg);
        }
      })
    })
  }

  return {
    loginSend:loginSend,
  }
})