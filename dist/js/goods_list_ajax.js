define(["jquery", "jquery-cookie","order_ajax","parabola"], function($,order_ajax,parabola){
  function goods_list_ajax(){
      $.ajax({
        url:"../data/goods_list.json",
        success:function(arr){
          for(var i = 0; i < arr.length; i++){
            var node = $(`
              <li class="product-item">
                <div class="imgBox">
                    <a class="lazy" href="desc.html?goods_id=${arr[i].goods_id}"><img id = "img1"  src="${arr[i].bigimg}" alt=""></a>
                </div>
                <div class="scrollBox">
                    <span id="l${arr[i].goods_id}" class="prevBtn border-gray disabled">
                        <i class="iconfont">&#xe606;</i>
                    </span>
                    <span id="r${arr[i].goods_id}" class="nextBtn  border-gray bg-gray">
                        <i class="iconfont">&#xe607;</i>
                    </span>
                    <div class="scrollWrap">
                        <ul class="scrollMain">
                            
                        </ul>
                    </div>
                </div>
                <div class="p-price text-color">￥${arr[i].promotion_price}</div>
                <div class="p-name"><a href="">${arr[i].goods_name}</a></div>
                <div class="p-icons">
                    
                </div>
                <button id=${arr[i].goods_id} class="btn btnblue" type="button">
                  <i class="iconfont" >&#xe600;</i>加入购物车
                </button>
                <img id = "img${arr[i].goods_id}" class = "smallimg" style=" width:30px;height:30px;border-radius:50%;border:2px solid red; position: absolute; z-index:999;bottom : 24px;left:100px;display:none;" src="${arr[i].bigimg}" alt="">    
            </li>`);
            node.appendTo($(".mainBox").find("article ul.clearfix"))
            var smallimg = arr[i].smallimg;
            for(var j = 0 ; j < smallimg.length; j++){
              var small = $(`
              <li class="scrollItem">
                <img id="r${arr[i].goods_id}" class="border-gray " src="${smallimg[j].img}" alt="">
              </li>`);
              small.appendTo(node.find(".scrollBox .scrollMain"));
            }
          }
          function goods_list_tab(){
            $(function(){
              //显示过滤  
              var price = $(".mainBox").find(".f-price");
              var operation = $(".mainBox").find(".price-operation");
              price.mouseenter(function(){
                operation.css("cssText","display:block !important")
              });
              price.mouseleave(function(){
                operation.css("cssText","display:none !important")
              })
              //小图的左右移动
              var imgBox = $(".mainBox").find("article .product-list .scrollMain");
              var imgs = $(".mainBox").find("article .product-list .scrollBox .scrollMain .scrollItem");
              var btnLeft = $(".mainBox").find("article .product-list .scrollBox .prevBtn");
              var btnRight = $(".mainBox").find("article .product-list .scrollBox .nextBtn");
              // var btns= $(".mainBox").find(".goodsDetail .magnifierWrap span.iconfont");
              //  console.log(imgBox)
              
              //让iNow变成局部变量
              $(".product-item").mouseenter(function(){
                var iNow = 0;
                // //左移  事件委托
                
                // tab(btnRight.eq(0))
                btnLeft.click(function(){ 
                  // console.log(this.id) 
                  if(iNow > 0){
                    iNow--;
                    console.log(iNow)
                    var that = this;
                    tab(that)
                  }
                  
                })
                //右移
                btnRight.click(function(){ 
                  // console.log(this)
                  if(iNow < $(this).parent(".scrollBox").find(".scrollMain > *").size() - 5){
                    iNow++;
                    console.log(iNow)
                    var that = this;
                    tab(that)
                  }   
                })
               
                function tab(node){
                  // console.log($(node).parent(".scrollBox").find(".scrollMain > *").size());
                  $(node).parent(".scrollBox").find(".scrollMain").animate(
                    {
                      left: iNow * -36,
                    },
                    300,
                    function () {
                     
                      //判断是否是最后一张图片
                      if (iNow >=  $(node).parent(".scrollBox").find(".scrollMain > *").size() - 5) {
                        //注意要用this获取当前点的
                        $(node).parent(".scrollBox").find(".nextBtn").css(
                          "cssText",
                          "cursor:not-allowed;background: #fff !important"
                        )
  
                      }else if (iNow == 0) {
                        $(node).parent(".scrollBox").find(".prevBtn").css(
                          "cssText",
                          "cursor:not-allowed;background: #fff !important"
                        )
                        $(node).parent(".scrollBox").find(".nextBtn").css(
                          "cssText",
                          "cursor:pointer;background: #e5e5e5!important"
                        )
                      }else{
                        $(node).parent(".scrollBox").find(".prevBtn").css(
                          "cssText",
                          "cursor:pointer;background: #e5e5e5!important"
                        )
                        $(node).parent(".scrollBox").find(".prevBtn").css(
                          "cssText",
                          "cursor:pointer;background: #e5e5e5!important"
                        )
                      }
                    }
                  );
                }

              //大图随小图切换
              var that1 = this;
              // console.log(that1);
              var iconimg =  $(that1).find(".scrollMain li");
              
              iconimg.mouseenter(function () {
                // console.log(1)
                iconimg.find("img").removeClass("active");
                $(this).find("img").addClass("active");

                var src = $(this).find("img").attr("src");
                // console.log(src)
                $(that1).find("#img1").attr({
                    "src" : src,
                })
                  // $("#img2").attr({
                  //   "src" : src,
                  // })
                
              });

              })
             
              

            })
          }
          goods_list_tab()

        },
        error:function(error){
          console.log(error)
        }
      })
    //购物车
    //给加入购物车按钮添加点击
    //设置cookie <1>只能存储字符串  <2>cookie大小限制
    //json数据，id num  [{id:1,num:1},{id:2,num2}];
    $("article .product-list ").on("click", ".btnblue" , function(){
      //取出当前点击加入购物车按钮的id
      var id  = this.id;
      // alert(id);
      //1、判断是否是第一次添加(两种)
      var first = $.cookie("goods") == null ? true :false;
     
      if(first){
        //创建cookie
        $.cookie("goods", JSON.stringify([{id:id,num:1}]), {
          expires:7
        })
      }else{
        //不是第一次，判之前是否添加过该商品
        var cookieArr =JSON.parse($.cookie("goods"));
        var same = false;//车里设没有相同的产品
        for(var i = 0 ; i < cookieArr.length ; i++){
          if(cookieArr[i].id == id){
            same = true;
            break;
          }
        }
        //拿到的是相同id的i的位置，找到相同后就break退出了，但i还是有值
        same ? cookieArr[i].num++ : cookieArr.push({id:id,num:1});
        // 将处理完的数据存储回去
        $.cookie("goods", JSON.stringify(cookieArr),{
          expires: 7
        })
      }
      // alert($.cookie("goods"));
      isCheckAll();
      // order_ajax.carData();
      download();
      goods_list_ajax();
      ballMove(this);
    }) 
      
  }
   //获取购物车的数量
   function download(){
    var cookieStr = $.cookie("goods");
    var cookieArr = JSON.parse(cookieStr);
    var num = cookieArr.length;
    // console.log(num);
    $("#carNum").html(num);

  }

  //判断有多少个被选中(计算总价)
  function isCheckAll(){
    var allChecks = $(".mainBox").find(".cart-body").find("ul.cart-head");
    // console.log(allChecks)
    var isAll = true; //假设全选
    var total = 0; //计算总数(总共的钱数)
    var totalStr = null;//总数的字符串
    var count = 0; //被选中的个数
    var totalCount = 0; //记录商品总数(不管一不一样)
    
    // var oneGoods = 0; //计算每一个商品的总价 = 单价 * 数量
    // var oneGoodsStr = null;
    //遍历购物车加载的商品
    allChecks.each(function(index, item){
      // console.log(item)
      // console.log($(item).find("li input").get(0).checked)
      
      if(!$(item).find("li input").get(0).checked){
        //判断其中有一个没选择
        isAll = false;
      }else{
        total += parseFloat($(item).find(".price .goods-price").html().trim().substring(1)) * parseFloat($(this).find(".item-counter input").val());
        totalStr = `￥${total}.00` ;

        //计算每一个商品的总价 = 单价 * 数量
        // oneGoods = parseFloat($(item).find(".price .goods-price").html().trim().substring(1)) * parseFloat($(this).find(".item-counter input").val());
        // oneGoodsStr = `￥${oneGoods}.00`;
        // $(this)


        //被选中商品的数量
        count += parseInt($(this).find(".item-counter input").val())
        console.log(total);
      }
      //计算所有加入购物车的商品一共有几个
      totalCount += parseInt($(this).find(".item-counter input").val());
    })
    //设置
    $("#totalPrice").html(totalStr);//总价


    //判断是否全选
    var footAll = $(".mainBox").find(".cart-foot").find(".foot-left").find("input");
    if(isAll){
      $(".mainBox .cart-head .cart-check input").add(footAll).prop("checked", true);
    }else{
      $(".mainBox .cart-head .cart-check input").add(footAll).prop("checked", false);
    }
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
                $(`#img${id}`).css("cssText","left: 100px;bottom: 24px;display: none;position: absolute !important;left: 100px !important;border:2px solid red;width:30px;height:30px;borderRadius:50%; z-index:999;"
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
  

  return{
    goods_list_ajax:goods_list_ajax,
  }
})