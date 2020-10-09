define(["jquery"],function($){
  function loginSend(){
    
    $.ajax({
        type: "post",
        url:"./php/login.php",
        data:{
          username:$(".account .form-control").eq(0).val(),
          password:$(".account .form-control").eq(1).val()
        },
        success: function(msg){
          console.log(msg);
          var obj = JSON.parse(msg); //JSON.parse (<anonymous>) 返回的字符串不是json格式。
          if(obj.code){
            console.log(1)
            $(".err").removeClass("hide").addClass("show");

            // $(".err").attr("class" , "show");
          }else{
            // $(".err").find(".des").attr("class" , "show");
            $(".err").removeClass("hide").addClass("show");
            $("#text").attr("class" , "right");
          }
          $(".des").find("#text").html(obj.msg);
        },
        error: function(msg){
          console.log(msg);
        }
      })
    
  }
  function tab(){
    $("#btn_register").click(function(){
      //切换
      if($(".tit").eq(0).hasClass("ns-text-color")){
        $(".login-type").removeClass("hide");
        $(".login-type").eq(1).addClass("hide");
        // php检测数据
        loginSend();  
      }else{
        $(".login-type").removeClass("hide");
        $(".login-type").eq(0).addClass("hide");
        test1();
      }
      tab1();
    })
  }

  //点击头部进行切换
  function tab1(){
    $(".tit").click(function(){
      $(".tit").removeClass("ns-text-color");
      $(this).addClass("ns-text-color");
      $(".err").removeClass("show").addClass("hide");

      if($(".tit").eq(0).hasClass("ns-text-color")){
        $(".login-type").removeClass("hide");
        $(".login-type").eq(1).addClass("hide");
        // php检测数据
        loginSend();

      }else{
        $(".login-type").removeClass("hide");
        $(".login-type").eq(0).addClass("hide");
        test1();
      }
    })
  }

  //手机登录的检测
  function test1(){
    
    $("#btn_register").click(function(){
      var mobile = $(".mobile .form-control").eq(0).val();
      var testnum = $(".mobile .form-control").eq(1).val();
      if(!(/^1[3456789]\d{9}$/.test(mobile))){
        // $(".err").attr("class" , "show");
        $(".err").removeClass("hide").addClass("show");
        $(".des").find("#text").html("！请输入正确的手机号");
      }else if(!testnum){
        $(".err").removeClass("hide").addClass("show");
        $(".des").find("#text").html("！请输入正确的验证码");
      }else{
        $(".err").removeClass("hide").addClass("show");
        $(".des").find("#text").html("√登录成功");
      }
      
    })
    
  }

  return {
    // loginSend:loginSend,
    tab:tab,
    tab1:tab1,
  }
})