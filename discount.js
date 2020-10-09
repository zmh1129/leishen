define(["jquery"], function($) {
  //倒计时
  function discount(){
    $(function(){
      var starttime = new Date("2020/10/30");
      setInterval(function () {
        var nowtime = new Date();
        var time = starttime - nowtime;
        var day = doubleNum(parseInt(time / 1000 / 60 / 60 / 24));
        var hour = doubleNum(parseInt(time / 1000 / 60 / 60 % 24));
        var minute = doubleNum(parseInt(time / 1000 / 60 % 60));
        var second = doubleNum(parseInt(time / 1000 % 60));
        $('#day').find("i").text(day);
        $('#hour').find("i").text(hour);
        $('#min').find("i").text(minute);
        $('#second').find("i").text(second);
        if(day == 00){
          $('#day').hide();
          if(hour == 00){
            $('#hour').hide();
          }if(minute == 00){
            $('#min').hide();
          }
        }
        // console.log(day)
        //单位数变双位数
        function doubleNum(n){
          if(n < 10){
            return "0" + n;
          }else{
            return n;
          }
        }
      
      }, 1000);

    })

  }
  return {
    discount:discount,
  }
  
});