
define(["jquery", "jquery-cookie","parabola"] , function($,parabola){
  function download(){
    //location.search当前地址栏的查询字符串
    var goods_id = valueByName(location.search, "goods_id");
    $.ajax({
			method: "get",
			url: "../data/goods_list.json",
			success: function(arr){
				//找到当前页面要加载的详情页面数据
				var goodsMsg = arr.find(item => item.goods_id == goods_id);
        // console.log(goodsMsg);
        // console.log(arr)
        //中间价格
        var node = $(`
          <h1>${goodsMsg.goods_name}</h1>
          <p class="desc">${goodsMsg.desc}</p>
          <div class="discount-banner">
            <img src="" alt="">
            <div class="activity-name">国庆提前购</div>
            <div class="surplus-time">
              <span>距离结束仅剩</span>  
              <span id="day"><i class="ns-bg-color-black">01</i>:</span>
              <span id="hour"><i class="ns-bg-color-black">07</i>:</span>
              <span id="min"><i class="ns-bg-color-black">40</i>:</span>
              <span id="second"><i class="ns-bg-color-black">01</i></span>
            </div>
          </div>
          <div class="item-block">
            <div class="item-line promotion-price">
              <dl class="item-line">
                <dt class="ns-text-color-gray">秒杀价</dt>
                  <dd>
                    <em class="yuan" style="color: #e23435!important">¥</em>
                    <span class="price" id="xsgood_price" style="color: #e23435!important">${goodsMsg.promotion_price}</span>
                        
                    <span class="original-price">[￥${goodsMsg.price1}]</span>
                  </dd>
              </dl> 
              <div class="statistical pull-right">
                <ul>
                  <li>
                    <p>累计评价</p>
                    <a href="#" class="evaluate-count">21</a>
                  </li>
                  <li>
                    <p>累计销量</p>
                    <a href="#" class="ns-text-color" title="99">${goodsMsg.picture}</a>
                  </li>
                </ul>
              </div>

              <dl class="item-line">
                <dt>本店活动</dt>
                <dd><i class="flag" style="color: #e23435 !important; border-color: #e23435 !important;">满减</i>满5000.00减100.00 
                </dd>
              </dl>
            </div>
          </div>
    
        
        `)
        //吧node节点插到.basic-info-wrap 父节点第一个子节点的前面
        $(".mainBox .goodsDetail .basic-info-wrap").prepend(node);

        //左边放大镜(加载后放大镜的事件都没了)
        // var magnifier = $(`
        // <div class="magnifierMain" id="small">
        //   <img id = "img1" class="mag-target-img" src="${goodsMsg.bigimg}" alt="">
        //   <div id="mark"></div>
        // </div>
        // <div id="bigimg"><img id = "img2" src="${goodsMsg.bigimg}" alt=""></div>
        // <i class="iconfont">&#xe62e;</i>
        // <div class="i i1 lefticon">
        //   <span class="iconfont  btn">&#xe606;</span>
        // </div>
        // <div class="i i2 righticon">
        //   <span class="iconfont btn">&#xe607;</span>
        // </div>
        // <div class="spec-items">
        //     <ul>
        //       <li class="active"><img src="${goodsMsg.bigimg}" alt=""></li>
        //       <li><img src="https://cdn.leishen.cn/upload/goods/2019122011114528428_SMALL.png" alt=""></li>
        //       <li><img src="https://cdn.leishen.cn/upload/goods/2019122011114585942_SMALL.png" alt=""></li>
        //       <li><img src="https://cdn.leishen.cn/upload/goods/2019122011114634752_SMALL.png" alt=""></li>
        //       <li><img src="https://cdn.leishen.cn/upload/goods/2019122011114688158_SMALL.png" alt=""></li>
        //       <li><img src="https://cdn.leishen.cn/upload/goods/2019122011114734615_SMALL.png" alt=""></li>
        //       <li><img src="https://cdn.leishen.cn/upload/goods/2019122011114785578_SMALL.png" alt=""></li>
        //     </ul>
        //   </div>  
        // `);
        // $(".mainBox .goodsDetail .magnifierWrap").prepend(magnifier);
        //导航的名字
        var nav = $(`
        <li class="active">${goodsMsg.goods_name}</li>
        `)
        nav.appendTo($(".mainBox .breadcrumb"))
        //购物车
        var car = $(`
        <a href="order.html"><button class="btn btnred" type="button">查看购物车</button> </a>         
        <button id=${goodsMsg.goods_id} class="btn btnblue" type="button">
          <i class="iconfont">&#xe600;</i>加入购物车
        </button>
        <img id = "img${goodsMsg.goods_id}" class = "smallimg" style=" width:30px;height:30px;border-radius:50%;border:2px solid red; position: absolute; z-index:999;bottom : -250px;left:740px;display:none;" src="${goodsMsg.bigimg}" alt="">  
        `)
        $(".mainBox .goodsDetail .buy-btn dd").prepend(car);
	
			},
			error: function(msg){
				console.log(msg);
			}
		})
    
    //给加入购物车按钮添加点击
    //设置cookie <1>只能存储字符串  <2>cookie大小限制
    //json数据，id num  [{id:1,num:1},{id:2,num2}];
    $(".mainBox .buy-btn dd").on("click", ".btnblue" , function(){
      //取出当前点击加入购物车按钮的id
      var id  = this.id;
      // console.log(id);
      //1、判断是否是第一次添加(两种)
      var first = $.cookie("goods") == null ? true :false;
      if(first){
        //创建cookie
        var buynum = $(".num-wrap input").attr("value");
        console.log(buynum);
        $.cookie("goods", JSON.stringify([{id:id,num:buynum}]), {
          expires:7
        })
      }else{
        var buynum = $(".num-wrap input").attr("value");
        //不是第一次，判之前是否添加过该商品
        var cookieArr =JSON.parse($.cookie("goods"));
        console.log(cookieArr)
        var same = false;//车里设没有相同的产品
        for(var i = 0 ; i < cookieArr.length ; i++){
          if(cookieArr[i].id == id){
            same = true;
            break;
          }
        }
        
        //拿到的是相同id的i的位置，找到相同后就break退出了，但i还是有值
        // same ? cookieArr[i].num++  : cookieArr.push({id:id,num:buynum});
        if(same){
          var n = cookieArr[i].num ;
          cookieArr[i].num = parseInt(n) + parseInt(buynum)
        }else{
          cookieArr.push({id:id,num:buynum})
        }
        // 将处理完的数据存储回去
        $.cookie("goods", JSON.stringify(cookieArr),{
          expires: 7
        })
      }
      // alert($.cookie("goods"))
      download2();
      ballMove(this);
    })


  }
  //抛物线
  function ballMove(oBtn){
    // 设置抛物线效果
    //1、声明一个抛物线对象
        
        var id = oBtn.id;
        // console.log(`#img${id}`)
        // alert(id);
        // $(`#img${id}`).css("cssText","left: $(oBtn).offset().left;top: $(oBtn).offset().top;display: block;position: absolute !important;left: 100px !important"
        // )

        $(`#img${id}`).show();
        var offsetX = $('#car').offset().left - $(`#img${id}`).offset().left;
        var offsetY = $('#car').offset().top - $(`#img${id}`).offset().top;

        var bool = new Parabola({
            el: `#img${id}`,
            // targetEl: '#car', //目标物体
            // offset:[1000,100],
            
            offset:[offsetX,offsetY],
            duration: 1000,
            curvature: 0.0005,
            autostart: true,  //自动开始
            callback: function(){
               
                $(`#img${id}`).hide();
                // alert("动画结束的时候执行");
                $(`#img${id}`).css("cssText","bottom: -250px;display: none;position: absolute !important;left: 740px !important;border:2px solid red;width:30px;height:30px;border-radius:50%; z-index:999;"
                )
            },
            stepCallback: function(){
                $(`#img${id}`).css({
                    width:30,
                    height:30,
                    "borderRadius":"50%",
                    "border":"2px solid red",
                    "position": "absolute",  
                })
                
            },
            // autostart: true
        });
        bool.start();
        
  }

  //获取购物车的数量
  function download2(){
    var cookieStr = $.cookie("goods");
    var cookieArr = JSON.parse(cookieStr);
    var num = cookieArr.length;
    // console.log(num);
    $("#carNum").html(num);

  }
  //获取当前加载详情的商品的数据
  function valueByName(search, name){
    var start = search.indexOf(name + "=");
    if(start == -1 ){
      return null;
    }else{
      var end = search.indexOf("&" , start);
      //从start开始找最近的&
      if(end == -1){
        end = search.length;
      }

      //提取想要的键值对 name=value
      var str = search.substring(start, end);
      var arr = str.split('=');
      return arr[1];
    }
  }

  //给数量添加点击
  //点击+
  $(".increase").click(function(){
    var num = $(".num-wrap input").attr("value");
    num++;
    // console.log(num);
    $(".num-wrap input").attr("value",num);
  })
  //点击减
  $(".decrease").click(function(){
    var num = $(".num-wrap input").attr("value"); 
    if(num > 1){
      num--;
      $(".num-wrap input").attr("value",num);
    }
    
  })
   

  return{
    download : download,
    // download2:download2,
  }
})