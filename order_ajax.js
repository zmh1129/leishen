define(["jquery", "jquery-cookie"] , function($){
  function carData(){
    $.ajax({
      url:"../data/goods_list.json",
      success: function(arr){
        // console.log(arr);
        var cookieStr = $.cookie("goods");
        if(cookieStr){
          var cookieArr = JSON.parse(cookieStr);
          var newArr = [];//存储购物车的数据

          for(var i = 0 ; i < cookieArr.length; i++){
            for(var j = 0 ; j < arr.length ; j++ ){
              if(cookieArr[i].id == arr[j].goods_id){
                arr[j].num = cookieArr[i].num;
                arr[j].id = arr[j].goods_id;
                newArr.push(arr[j]);
              }
            }
          }

          // console.log(newArr)
          //newArr中既有详细数据，也有数量
          //通过循环加载
          for(var i = 0 ; i < newArr.length; i++){
            
            var node = $(`
            <ul class="cart-head list-item border-gray selected" id = ${newArr[i].goods_id}>
            <li>
              <input type="checkbox" checked="checked" id=""  autocomplete="off" >
              
              <a class="item-pic border-gray" href="" >
                <img src="${newArr[i].bigimg}" alt="">
              </a>
              <a class="item-text" href="" >
                <span>${newArr[i].goods_name}</span>
              </a>
              <span class="sku-name"></span>
            </li>
            <li style="text-align: left;">
              <span class="gift" style="font-size:12px;">赠：雷神电脑包</span>
              <span class="gift" style="font-size:12px;">赠：雷神鼠标套装M50T</span>
            </li>
            <li class="price">
              <span class="goods-price">￥${newArr[i].promotion_price}</span>
            </li>
            <li class = "numBox">
              <div class="item-counter">
                <span class="reduce">-</span>
                <input class="num border-gray" min="1" max="12" type="text" name="" id="" value="${newArr[i].num}">
                <span class="plus">+</span>
              </div>
            </li>
            <li class = "sumBox">
              <span id="" class="sum">￥${(newArr[i].num * newArr[i].promotion_price).toFixed(2)}</span>
            </li>
            <li class="delete">
              <span style = "cursor: pointer;">删除</span>
            </li>
            </ul>
            `);
            node.appendTo($(".cart-body"));
          }
          isCheckAll()
        }

      },
      error: function(error){
        console.log(error)
      }
    })

  }

  //全选按钮和单选按钮添加点击
  function checkFn(){
    //全选
    isCheckAll()
    //点击上边全选
    $(".mainBox .cart-head .cart-check input").click(function(){
      var allChecks = $(".mainBox").find(".cart-body").find("ul li").find("input");
      var footAll = $(".mainBox").find(".cart-foot").find(".foot-left").find("input");
      //两种写法(第二个好，第一个只能实现一次)
      // if($(this).attr("checked")){
      //   $(this).add(allChecks).removeAttr("checked");
      // }else{
      //   $(this).add(allChecks).attr("checked","checked");
      // }
      if(this.checked){
        $(this).add(allChecks).add(footAll).prop("checked", true);
      }else{
        $(this).add(allChecks).add(footAll).prop("checked", false);
      }
      isCheckAll()
    })
    // 点击下边全选
    $(".mainBox .cart-foot .foot-left input").click(function(){
      var allChecks = $(".mainBox").find(".cart-body").find("ul li").find("input");
      var topAll = $(".mainBox").find(".cart-head").find(".cart-check").find("input");
      
      if(this.checked){
        $(this).add(allChecks).add(topAll).prop("checked", true);
      }else{
        $(this).add(allChecks).add(topAll).prop("checked", false);
        
      }
      isCheckAll()
    })
    //单选
    $(".mainBox .cart-body").on("click", "ul li input", function(){
      if(this.checked){
        $(this).prop("checked", true);
      }else{
        $(this).prop("checked", false);
      }
      isCheckAll()
    })
    
  };
  //判断有多少个被选中
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
      // 判每个商品
      if(!$(item).find("li input").get(0).checked){
        //判断其中有一个没选择
        isAll = false;
      }else{
        // 单独一个商品的总价
        total += parseFloat($(item).find(".price .goods-price").html().trim().substring(1)) * parseFloat($(this).find(".item-counter input").val());
        
        totalStr = `￥${total}.00` ;
        
        //计算每一个商品的总价 = 单价 * 数量
        // oneGoods = parseFloat($(item).find(".price .goods-price").html().trim().substring(1)) * parseFloat($(this).find(".item-counter input").val());
        // oneGoodsStr = `￥${oneGoods}.00`;
        // $(this)


        //被选中商品的数量
        count += parseInt($(this).find(".item-counter input").val())
        
      }
      //计算所有加入购物车的商品一共有几个
      totalCount += parseInt($(this).find(".item-counter input").val());
    })
    // 全不选的价钱
    if(total == 0){
      totalStr = `￥00.00`;
    }
    // console.log(total);
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

  function download(){
    var cookieStr = $.cookie("goods");
    var cookieArr = JSON.parse(cookieStr);
    var num = cookieArr.length;
    // console.log(num);
    $("#carNum").html(num);

  }

  //给页面上商品添加删除，数量的增减操作
  function changeCars(){
    //给每一个删除按钮添加事件
    $(".mainBox .cart-body").on("click", ".list-item li.delete span", function(){
      //拿到点击商品的id
      var id = $(this).closest(".list-item").remove().attr("id");

      //在cookie中删除
      var cookieStr = $.cookie("goods");
      var cookieArr = JSON.parse(cookieStr);
      for(var i = 0; i < cookieArr.length; i++){
        if(id == cookieArr[i].id){
          //删除数据
          cookieArr.splice(i , 1);
          break;
        }
      }
      cookieArr.length == 0 ? $.cookie("goods", null) : $.cookie("goods", JSON.stringify(cookieArr),{expires : 7})
      isCheckAll();
      download();
    })

    //给每个+-添加事件
    $(".mainBox .cart-body").on("click", ".reduce,.plus", function(){
      //拿到点击商品的id
    
      var id = $(this).closest(".list-item").attr("id");

      //在cookie中增减
      var cookieStr = $.cookie("goods");
      var cookieArr = JSON.parse(cookieStr);
      for(var i = 0; i < cookieArr.length; i++){
        if(id == cookieArr[i].id){
          //找到数据
          if(this.className == "reduce"){
            //-1
            cookieArr[i].num == 1 ? alert("数量为1，不能减少！") : cookieArr[i].num--;
          }else{
            cookieArr[i].num++;
          }
          
          break;
        }
      }
      //更新数据
      $(this).siblings("input").val(cookieArr[i].num);
      //更新页面的单个商品小计
      var price = parseFloat($(this).closest(".numBox").siblings(".price").find(".goods-price").text().trim().substring(1));
      // console.log(price);
      var sumStr = "";
      sumStr += `￥${(price * cookieArr[i].num).toFixed(2)}`;
      $(this).closest(".numBox").siblings(".sumBox").find(".sum").html(sumStr)

      //将更改后的数据存储到cookie
      $.cookie("goods", JSON.stringify(cookieArr),{expires : 7})
      isCheckAll()
    })  
    
    //清空购物车
    $('.cart-foot .deleteCar').on('click',function(){
      $.cookie('goods', null);
      $(".mainBox .cart-body ul").remove();
      $('.mainBox .cart-body').html("暂时没商品");
      return false;
    })
  }
 

  return{
    carData:carData,
    checkFn:checkFn,
    isCheckAll:isCheckAll,
    changeCars:changeCars,
  }
})