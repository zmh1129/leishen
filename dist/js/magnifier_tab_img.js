define(["jquery"],function($){
  function magnifier_tab_img(){
    $(function(){
      var imgBox = $(".mainBox").find(".goodsDetail .magnifierWrap .spec-items ul");
      var imgs = $(".mainBox").find(".goodsDetail .magnifierWrap .spec-items ul li");
      var btnLeft = $(".mainBox").find(".goodsDetail .magnifierWrap div.lefticon");
      var btnRight = $(".mainBox").find(".goodsDetail .magnifierWrap div.righticon");
      var btns= $(".mainBox").find(".goodsDetail .magnifierWrap span.iconfont");
     
      var iNow = 0;

      //左移
    
      // btnLeft.click(function(){  
      //   if(iNow > 0){
      //     iNow--;
      //     tab()
      //   }
      // })
      // //右移
      // btnRight.click(function(){    
      //   if(iNow < imgs.size() - 4){
      //     iNow++;
      //     tab()
      //   }
      // })
      // function tab(){
      //   imgBox.animate(
      //     {
      //       left: iNow * -80,
      //     },
      //     500,
      //     function () {
      //       //判断是否是最后一张图片
      //       if (iNow == imgs.size() - 4) {
        
      //         btnRight.css(
      //           "cssText",
      //           "cursor:not-allowed;background: #fff !important"
      //         )
              
      //       }else if (iNow == 0) {
      //         btnLeft.css(
      //           "cssText",
      //           "cursor:not-allowed;background: #fff !important"
      //         )
      //       }else{
      //         btnLeft.css(
      //           "cssText",
      //           "cursor:pointer;background: #e5e5e5!important"
      //         )
      //         btnRight.css(
      //           "cssText",
      //           "cursor:pointer;background: #e5e5e5!important"
      //         )
      //       }
      //     }
      //   );
      // }

console.log(1)

    })
  }
  return {
    magnifier_tab_img:magnifier_tab_img,
  }
});