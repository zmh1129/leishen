define(["jquery"],function($){
  function magnifier(){
    $(function(){
      $("#small").mouseenter(function(){
        $("#mark,#bigimg").show();
      }).mouseleave(function(){
        $("#mark,#bigimg").hide();
      }).mousemove(function(ev){
        var l = ev.clientX - $(this).offset().left - 90;
        var t = ev.clientY - $(this).offset().top - 90 + $(document).scrollTop();
        //限制出界
        l = Math.max(0, l);
        l = Math.min(186, l);
        t = Math.max(0, t);
        t = Math.min(186, t);

        $("#mark").css({
          left: l,
          top: t
        })
        $("#bigimg img").css({
          left: -2 * l,
          top: -2 * t
        })
      })
    })
  }
  return{
    magnifier:magnifier,
  }

})