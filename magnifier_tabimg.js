define(["jquery"],function($){
  function magnifier_tabimg(){
    $(function(){
      var imgBox = $(".mainBox").find(".goodsDetail .magnifierWrap .spec-items ul");
      var imgs = $(".mainBox").find(".goodsDetail .magnifierWrap .spec-items ul li");
      var btnLeft = $(".mainBox").find(".goodsDetail .magnifierWrap div.lefticon");
      var btnRight = $(".mainBox").find(".goodsDetail .magnifierWrap div.righticon");
      var btns= $(".mainBox").find(".goodsDetail .magnifierWrap span.iconfont");
      // imgs.removeClass("active")
      // console.log(imgs)
 
      imgBox.on("mouseenter","li" ,function () {
        imgs.removeClass("active");
        $(this).addClass("active");
        var src = $(this).find("img").attr("src");
        console.log(src)
        $("#img1").attr({
            "src" : `${src}`,
          })
          $("#img2").attr({
            "src" : src,
          })
        
      });
    


    })
  }
  return {
    magnifier_tabimg:magnifier_tabimg,
  }
});