define(["jquery"],function($){
  // 后端数据库的数据检测
  function ajax1(){
    $.ajax({
      type: "post",
      url:"./php/register.php",
      data:{
        username:$(".account .form-control").eq(0).val(),
        password:$(".account .form-control").eq(1).val(),
        repassword:$(".account .form-control").eq(2).val(),
        createtime:(new Date()).getTime()
      },
      success: function(msg){
        console.log(msg);
        var obj = JSON.parse(msg); //JSON.parse (<anonymous>) 返回的字符串不是json格式。
        if(obj.code){
      
          $(".err").removeClass("hide").addClass("show");

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
    //当点击登录时，要判断用户用什么方式登录
    $("#btn_register").click(function(){
      //切换
      if($(".tit").eq(0).hasClass("ns-text-color")){
        $(".login-type").removeClass("hide");
        $(".login-type").eq(1).addClass("hide");
        // php检测数据
        ajax1();  
      }else{
        $(".login-type").removeClass("hide");
        $(".login-type").eq(0).addClass("hide");
        test1();
      }
      // 当来回切换时，检测数据方法也要变（点切换的按钮）
      tab1()
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
        ajax1();

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

// function registerSend(){
  //   $("#btn_register").click(function(){
  //     $.ajax({
  //       type: "post",
  //       url:"./php/register.php",
  //       data:{
  //         username:$(".account .form-control").eq(0).val(),
  //         password:$(".account .form-control").eq(1).val(),
  //         repassword:$(".account .form-control").eq(2).val(),
  //         createtime:(new Date()).getTime()
  //       },
  //       success: function(msg){
  //         console.log(msg);
  //         var obj = JSON.parse(msg); //JSON.parse (<anonymous>) 返回的字符串不是json格式。
  //         if(obj.code){
        
  //           $(".err").removeClass("hide").addClass("show");

  //         }else{
  //           // $(".err").find(".des").attr("class" , "show");
  //           $(".err").removeClass("hide").addClass("show");

  //           $("#text").attr("class" , "right");
  //         }
  //         $(".des").find("#text").html(obj.msg);
  //       },
  //       error: function(msg){
  //         console.log(msg);
  //       }
  //     })
  //   })
  // }
  //切换手机登录
  // function tab(){

  //   $(".tit").click(function(){
    
  //     $(".tit").removeClass("ns-text-color");
  //     $(this).addClass("ns-text-color");
  //     $(".err").removeClass("show").addClass("hide");

  //     //切换
  //     if($(".tit").eq(0).hasClass("ns-text-color")){
  //       $(".login-type").removeClass("hide");
  //       $(".login-type").eq(1).addClass("hide");
  //       registerSend();
  //     }else{
  //       $(".login-type").removeClass("hide");
  //       $(".login-type").eq(0).addClass("hide");
  //       test1();
  //     }
  //   })
    
  // }
  //判断输入的是否符合条件
  // function test(){
    
  //   $("#btn_register").click(function(){
  //     var name = $(".account .form-control").eq(0).val();
  //     var password = $(".form-control").eq(1).val();
 
  //     if(name.length > 18 || name.length < 3){
  //       // $(".err").attr("class" , "show");
  //       $(".err").removeClass("hide").addClass("show");
  //       $(".des").find("#text").html("！用户名必须在3到16个字符范围内");
  //     }else if(/\W/.test(name)){
  //       $(".err").removeClass("hide").addClass("show");
  //       $(".des").find("#text").html("！只能输入字母、数字、下划线");
  //     }else{
  //       if(password.length < 5){
  //         $(".err").removeClass("hide").addClass("show");
  //         $(".des").find("#text").html("！密码至少为5个字符");
  //       }else if(/\W/.test(password)){
  //         $(".err").removeClass("hide").addClass("show");
  //         $(".des").find("#text").html("！只能输入字母、数字、下划线");
  //       }else{
  //         $(".err").removeClass("show").addClass("hide");
  //       }
  //     }
      
  //   })
   
// }


  return {
    // registerSend:registerSend,
    tab:tab,
    tab1:tab1,
    // test:test,
  }
})