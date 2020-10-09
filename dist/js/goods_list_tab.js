define(["jquery"],function($){
  function goods_list_tab(){
    $(function(){
      // var imgBox = $(".mainBox").find("article .product-list ul.clearfix");
      var imgBox = $(".mainBox").find("article .product-list ul.clearfix .scrollMain");
      // var imgs = $(".mainBox").find("article .product-list .scrollBox .scrollMain .scrollItem");
      var btnLeft = $(".mainBox").find("article .product-list .scrollBox .prevBtn");
      var btnRight = $(".mainBox").find("article .product-list .scrollBox .nextBtn");
      // var btns= $(".mainBox").find(".goodsDetail .magnifierWrap span.iconfont");
      
      $(".ul.clearfix").addClass("active");
      imgBox.addClass("active");
  
        
    //  console.log(btnLeft.addClass("active"))
      var iNow = 0;
      //左移
      tab()
      
      btnLeft.click(function(){  
        if(iNow > 0){
          iNow--;
          tab()
        }
      })
      //右移
      btnRight.click(function(){ 
        console.log(1)   
        if(iNow < imgs.size() - 5){
          iNow++;
          tab()
        }
      })
      function tab(){
        imgBox.animate(
          {
            left: iNow * -36,
          },
          500,
          function () {
            //判断是否是最后一张图片
            if (iNow == imgs.size() - 5) {
        
              btnRight.css(
                "cssText",
                "cursor:not-allowed;background: #fff !important"
              )
              
            }else if (iNow == 0) {
              btnLeft.css(
                "cssText",
                "cursor:not-allowed;background: #fff !important"
              )
            }else{
              btnLeft.css(
                "cssText",
                "cursor:pointer;background: #e5e5e5!important"
              )
              btnRight.css(
                "cssText",
                "cursor:pointer;background: #e5e5e5!important"
              )
            }
          }
        );
      }



    })
  }
  return {
    goods_list_tab:goods_list_tab,
  }
});