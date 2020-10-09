define(["jquery"],function(jquery){
  //右边
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
  //下部
  function leftNav(){
    var btns = $(".header-box").find("nav .menuBottom");
    var all = $(".header-box").find("nav .category");

    btns.find("li .item-left").removeClass("active");

    //移入总裁丹
    all.mouseenter(function(){
      btns.css({
        display:"block",
      })
    })
    all.mouseleave(function(){
      btns.css({
        display:'none',
      })
    })

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
  return {
    rightNav : rightNav,
    leftNav : leftNav
  }
})