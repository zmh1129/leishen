define(["jquery"],function(jquery){
  // 图片轮播
  function banner1(){
    $(function () {
      var aBtns = $(".mainBox").find(".bannerBox .btn-list li.btn");//每个小点
      var oUl = $(".mainBox").find(".imgBox ul.img-box");
      var oLeft= $(".left-control");
      var oRight= $(".right-control");

      var iNow = 1;
      var timer = null;
      let isRunning = false; //代表当前动画是否在执行。

      $(".bannerBox").mouseenter(function () {
        clearInterval(timer);
      });

      $(".bannerBox").mouseleave(function () {
        //轮播
        timer = setInterval(function () {
          iNow++;
          tab();
        }, 2000);
      });

      oLeft.click(function () {
        if(!isRunning){
          iNow-- ;
          tab();
        }
        console.log(isRunning)
        return false;
        // console.log(iNow)
      });
      oRight.click(function () {
        if(!isRunning){
          iNow++ ;
          tab();
        }
        
        return false;
        // console.log(iNow)
        
      });
      //小点
      aBtns.click(function(){
        iNow = $(this).index() + 1;
        tab();
      })
      

      //轮播
      timer = setInterval(function () {
        iNow++;
        tab();
      }, 2000);

      function tab() {
        aBtns.removeClass("active").eq(iNow -1).addClass("active");

        if (iNow == aBtns.size() + 1) {
          aBtns.eq(0).addClass("active");
        }else if (iNow == 0){
          aBtns.eq(5).addClass("active")
        }
        isRunning = true;
        oUl.animate(
          {
            left: iNow * -1920,
          },
          1000,
          function () {
            //判断是否是最后一张图片
            if (iNow === aBtns.size() + 1) {
              iNow = 1;
              oUl.css("left", -1920);
            }else if (iNow === 0) {
              iNow = aBtns.size() ;
              oUl.css("left", -iNow*1920);
            }
            isRunning = false;
          }
          
        );
        
      }
    });
  }
  // 模块轮播1
  function banner2(){
    $(function(){
      var btns = $(".w1200").find(".hotGoods .goodsBox .headBox .more .control");
      var btns1 = $(".w1200").find(".hotGoods .goodsBox .headBox .more .controlPre");
      var btns2 = $(".w1200").find(".hotGoods .goodsBox .headBox .more .controlNext");
      // console.log(btns1)
      var aList = $(".w1200").find(".hotGoods .goodsBox .mainBox .wrapper .tempWrap .goodsList");
      var iNow = 0; //0是第一栏   1是后 一栏
      btns1.click(function(){
        if(iNow = 1){
          iNow -= 1;
          tab();
        }
        return false; 
      })
      btns2.click(function(){
        if(iNow = 0){
          iNow += 1;
          tab();
        }
        return false; 
      })
      //自动轮播
      function autotab(){
        timer = setInterval(function () {
        if(iNow == 0){
          iNow += 1;
          tab();
        }else if(iNow == 1){
          iNow -= 1;
          tab();
        }      
      }, 3000);
      }
      autotab();
      
      // 鼠标移入
      $(".hotGoods .goodsBox .mainBox .wrapper .tempWrap").mouseenter(function () {
        clearInterval(timer);
      });

      $(".hotGoods .goodsBox .mainBox .wrapper .tempWrap").mouseleave(function () {
        //轮播
        autotab();
      });

      function tab() {
        btns.removeClass("controlPre");

        if (iNow == 0) {
          btns.eq(0).addClass("controlPre");
        }else if (iNow == 1){
          btns.eq(1).addClass("controlPre")
        }

        aList.animate(
          {
            left: iNow * -1230,
          },
          500,
        );
      }

    })
    
  }

  //加载右侧导航栏
  function rightNav(){
    $.ajax({
    url:"../data/data_rnav.json",
    success:function(arr){
      // console.log(arr)
      for(var i = 0 ;i < arr.length; i++){
        // console.log(arr[i]["Title"])
        var node = $(`<li class="nav-item">
        <a href="">${arr[i].Title}</a>
        <div class="item-child">
            <div class="container">
                <ul class="child-list">
                    
                </ul>
            </div>
        </div>
    </li>`)

        node.appendTo($(".header-box").find("nav .menuLeft"))
        var NavList = arr[i].floorGoodsList;
        if(NavList){
          for(var j = 0 ; j < NavList.length;j++){
            // console.log(NavList[0]["goodsPic"])
            var aList = $(`<li class="first">
                <div class="figure">
                    <a href="">
                        <img src="${NavList[j]["goodsPic"]}" alt="">
                    </a>
                </div>
                <div class="title">
                    <a href="" rel="nofollow" title="">${NavList[j]["goodsTitle"]}</a>
                </div>
                <p class="price">${NavList[j]["goodsPrice"]}</p>
            </li>`)
            aList.appendTo(node.find(".item-child .container .child-list"))
          }
        }
      }
    },
    error: function(msg){
      console.log(msg);
    }
  })
  //补充
    $.ajax({
    url:"../data/data_rnav_add.json",
    success:function(arr){
      // console.log(arr)
      for(var i = 0 ;i < arr.length; i++){
        // console.log(arr[i]["Title"])
        var node = $(`<li class="nav-item">
        <a href="">${arr[i].Title}</a>
        </li>`)
        node.appendTo($(".header-box").find("nav .menuLeft"))
      }
    },
    error: function(msg){
      console.log(msg);
    }
  })
  }

  //热门单品推荐
  $.ajax({
    url:"../data/data_hot.json",
    success:function(arr){
      // console.log(arr)
      for(var i = 0 ;i < arr.length; i++){
        // console.log(arr[i]["Title"])
        var node = $(`<li class="goodsItem">
          <a class="thumb" href="">
              <img src="${arr[i].img}" alt="">
          </a>
          <h3 class="title">
              <a href="">${arr[i].title}</a>
          </h3>
          <p class="desc">${arr[i].desc}</p>
        </li>`)
        node.appendTo($(".mainBox").find(".hotGoods .goodsList"))
      }
    },
    error: function(msg){
      console.log(msg);
    }
  })
  //增值服务
  $.ajax({
    url:"../data/data_service.json",
    success:function(arr){
      // console.log(arr)
      for(var i = 0 ;i < arr.length; i++){
        // console.log(arr[i]["Title"])
        var node = $(`<li class="goodsItem">
        <a class="thumb" href="">
            <img src="${arr[i].img}" alt="">
        </a>
        <h3 class="title">
            <a href="">${arr[i].title}</a>
        </h3>
        <p class="price">${arr[i].pic}</p>
    </li>`)
        node.appendTo($(".mainBox").find(".addBox .AgoodsList"))
      }
    },
    error: function(msg){
      console.log(msg);
    }
  })

  //热评产品
  $.ajax({
    url:"../data/data_hot2.json",
    success:function(arr){
      // console.log(arr)
      for(var i = 0 ;i < arr.length; i++){
        // console.log(arr[i]["Title"])${arr[i].img}${arr[i].title}${arr[i].desc}
        var node = $(`<li class="reviewItem">
            <div class="figureImg">
                <a href=""><img src="${arr[i].img}"  width="220" height="220" alt="雷神M205强袭 蓝血人电竞鼠标"></a>
                    
            </div>
            <p class="review"><a href="">${arr[i].desc}
            </a></p>
            <div class="info">
                <h3 class="title"><a href="">${arr[i].title}</a></h3>
                <span class="sep">|</span>
                <p class="price">${arr[i].pic}</p>
            </div>
        </li>`)
        node.appendTo($(".mainBox").find(".hotComment .reviewList"))
      }
    },
    error: function(msg){
      console.log(msg);
    }
  })

  //粉丝
  $.ajax({
    url:"../data/data_samecity.json",
    success:function(arr){
      // console.log(arr)
      for(var i = 0 ;i < arr.length; i++){
        // console.log(arr[i]["Title"])${arr[i].img}${arr[i].title}${arr[i].desc}
        var node = $(`<li class="videoItem">
            <a class="thumb" href="">
                <img src="${arr[i].img}" alt="">
            </a>
            <h3 class="title">
                <a href="">${arr[i].title}</a>
            </h3>

        </li>`)
        node.appendTo($(".mainBox").find(".sameCityBox .videoList"))
      }
    },
    error: function(msg){
      console.log(msg);
    }
  })

  //视频
  $.ajax({
    url:"../data/data_samecity.json",
    success:function(arr){
      // console.log(arr)
      for(var i = 0 ;i < arr.length; i++){
        // console.log(arr[i]["Title"])${arr[i].img}${arr[i].title}${arr[i].desc}
        var node = $(`<li class="video-item video-item-first">
            <div class="figure figure-img">
                <a href="">
                    <img src="${arr[i].img}" width="296" height="180">
                    <span class="play"><i class="iconfont">&#xe612;</i></span>
                </a>
            </div>
            <h3 class="title"><a href="">${arr[i].title}</a></h3>
            <p class="desc">${arr[i].desc}</p>
        </li>`)
        node.appendTo($(".mainBox").find(".newAdd .videoBox .video-list"))
      }
    },
    error: function(msg){
      console.log(msg);
    }
  })


  //加载楼层数据
  $.ajax({
    url: "../data/data_floor.json",
    success: function(arr){
      // var str = ``;
      for(var i = 0; i < arr.length; i++){
        var node= $(`<div class="floor">
          <nav class="floorTop clearfix">
              <div class="floorNav">
                  <div class="">
                      <ul class="floorNavList">
                                   
                      </ul>
                  </div>
                
                  <div class="navMore">
                      <a class="navMoreBtn" href="">更多<i class="iconfont">&#xe605;</i></a>
                  </div>
              </div>
              <div class="floorTitle">
                  <h3 class="floorName">
                      <a href="" style="cursor: pointer;">${arr[i].floorTitle}</a>
                  </h3>
              </div>
          </nav>
          <article class="games">
              <div class="leftImg">
                  <a href="bigImg">
                      <img src="${arr[i].bigImg}" alt="">
                  </a>
                  <a href="smallImg">
                      <img src="${arr[i].smallImg}" alt="">
                  </a>
              </div>
              <div class="rightGoods">
                  <ul class="floorGoodsList">
                  
                  </ul>
                  <div class="floorRecommend">
                      <div class="floorRecommendname">热门推荐</div>
                      <div class="floorRecommendWrap">
                          <div class="floorRecommendList" >
                              
                          </div>
                      </div>
                      
                      <div class="navMore">
                          <a class="navMoreBtn" href="">更多<i class="iconfont">&#xe605;</i></a>
                      </div>
                  </div>
              </div>
          </article>
        </div>`)
        //楼层结构
        node.appendTo($(".mainBox").find(".blockWap"));
        var NavList = arr[i].floorNavList;
        for(var j = 0; j < NavList.length;j++){
          var nList = $(`<li><a href="">${NavList[j]}</a></li>`);
          nList.appendTo(node.find(".floorNavList"))
        }
        //中间数据
        var goodsList = arr[i].floorGoodsList;
        for(let k = 0; k < goodsList.length; k++){
          // var goodsItem = goodsList[k]; //对象
          // console.log(goodsList.length);
          var gList = $(`<li class="floorGoodsItem">
            <a href="">
                <div class="goodsPic"><img src="${goodsList[k]["goodsPic"]}" alt=""></div>
                <div class="goodsTitle">${goodsList[k]["goodsTitle"]}</div>
                <div class="goodsPrice">${goodsList[k]["goodsPrice"]}</div>
            </a>
          </li>`)
          gList.appendTo(node.find(".floorGoodsList"))
        }
        //右侧轮播数据
        var RecommendList = arr[i].floorRecommendList;
        // console.log(RecommendList.length)
        for(let l = 0; l < RecommendList.length; l++){
          var RecommendItem = RecommendList[l]; //对象
          // console.log(RecommendList[l]);
          var rList = $(`<a class="floorRecommendItem" href="">
          <div class="floorRecommendPic">
              <img src="${RecommendList[l]["img"]}" alt="">
          </div>
          <div class="floorRecommendCont">
              <div class="floorRecommendName">${RecommendList[l]["title"]}</div>
              <div class="null"></div>
              <div class="floorRecommendPrice">${RecommendList[l]["price"]}</div>
          </div>
      </a>`)
          rList.appendTo(node.find(".floorRecommendList"))
        }

      }


      //模块轮播2右
      function banner3(){
        $(function () {
          var aList = $(".mainBox").find(".floor .games .rightGoods .floorRecommend .floorRecommendList");
          // console.log(aList.length)
          var iNow = 0;
          var timer = null;
         
          //轮播
          timer = setInterval(function () {
            iNow++;
            tab();
          }, 1000);
    
          function tab() {
            aList.animate(
              {
                top: iNow * -108,
              },
              500,
              function () {
                //判断是否是最后一张图片
                // console.log(aList.find(".floorRecommendItem").size()-4);
                if (iNow == 8) {                
                  iNow = 0;
                  aList.css("top", 0);
                }
                else if (iNow === 0) {
                  iNow = 8 ;
                  aList.css("top", -iNow*108);
                }
              }
            );
          }
        });
      }
      banner3();
    },
    error: function(msg){
      console.log(msg);
    }
  })
  
  //下边列表
  function nav(){
    var btns = $(".header-box").find("nav .menuBottom");
    btns.find("li .item-left").removeClass("active");

    btns.on("mouseenter", 'div.item-left' ,function(){
      // console.log(this)
      $(this).siblings(".second-child").css({
        "display":"block",
        
      })
      $(this).addClass("active");
      var that = this;
      $(this).parents("li").mouseleave(function(){
        btns.find("li .item-left").removeClass("active");
        $(that).siblings(".second-child").css({
          "display":"none",
        })
      })
    })
    //移出
    btns.on("mouseleave", 'div.item-left' ,function(){
      // console.log(this)
      $(this).siblings(".second-child").css({
        "display":"node",
      })
    })

    $.ajax({
      url:"../data/data_leftnav.json",
      success:function(arr){
        // console.log(arr)
        for(var i = 0 ;i < arr.length; i++){
          // console.log(arr[i]["Title"])${arr[i].img}${arr[i].desc}
          var node = $(`<li>
              <div class="item-left">
                  <a href="">
                      <span>${arr[i].Title}</span>
                      <i class="iconfont">&#xe605;</i>
                  </a>
              </div>
              <ul class="second-child"> </ul>
            </li>`)
          node.appendTo($(".header-box").find("nav .menuBottom"));
          var second = arr[i].secondChild;
          for(var j = 0 ; j < second.length; j++){
            var secondChild = $(`<li class="empty-img">
              <a href="" target="_blank" title="911Pro系列" style="float:none;">
                  <span>${second[j]["name"]}</span>
                  <i class="iconfont">&#xe605;</i>
              </a>
              <ul class="third-child"></ul>
              </li>`)
            secondChild.appendTo(node.find(".second-child"));
            var third = second[j]["thirdChild"];//数组.
            for(var k = 0; k < third.length; k++){
              var thirdChild = $(`<li>
                <a href="" title="">
                    <img src="${third[k]["goodsPic"]}">
                    <span>${third[k]["goodsTitle"]}</span>
                </a>
            </li>`)
              thirdChild.appendTo(secondChild.find(".third-child"))
            }
          }
          
        }
      },
      error: function(msg){
        console.log(msg);
      }
    })
  }
  // nav()
  
  //右边固定窗口
  function fix(){
    var rightbox = $(".right-sidebar").find(".menu .item-icon-box");
    // console.log(rightbox);

    rightbox.mouseenter(function(){

      $(this).css("cssText" , "background : #00eef3 !important;border-radius: 0;").find(".iconfont").css("cssText" , "color : #333;");
      $(this).siblings(".text").css("cssText" ,"visibility: visible").animate({
        left: -66,
        width:66,
      },100)
      
    });
    rightbox.mouseleave(function(){

      var that = this;  //显示的图标
     
      $(this).siblings(".text").animate({
        left: 10,
        width:0,
      },100,function(){ 
        $(that).css("cssText" , "background : #7a6e6e !important;border-radius: 3px 0 0 3px;").find(".iconfont").css("cssText" , "color : #fff;")
      })
     
    })
    


  }
  
  

  return {
    banner1: banner1,
    banner2: banner2,
    nav: nav,
    rightNav: rightNav,
    fix:fix,
    // banner3: banner3,
    // show: show
    
  }
})