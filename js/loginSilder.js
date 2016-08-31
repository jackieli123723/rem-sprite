window.onload=function(){
    var oBtn = document.getElementById('btn');
    var oW,oLeft;
    var oSlider=document.getElementById('slider');
    var oTrack=document.getElementById('track');
    var oIcon=document.getElementById('icon');
    var oSpinner=document.getElementById('spinner');

    var rightWidth=parseInt($(".button").width())
   
    oBtn.addEventListener('touchstart',function(e){
        console.log(e);
        var touches = e.touches[0];
        oW = touches.clientX - oBtn.offsetLeft;
        oBtn.className="button";
        oTrack.className="track";
          $(".bg-green").text("");
          $("#slider").attr("data-pass","失败")
        document.addEventListener("touchmove",defaultEvent,false);//阻止页面的滑动默认事件
    },false);
 
    oBtn.addEventListener("touchmove", function(e) {
        var touches = e.touches[0];
        oLeft = touches.clientX - oW;
        $(".bg-green").text("");
        
        if(oLeft < 0) {
            oLeft = 0;
        }else if(oLeft > document.documentElement.clientWidth - oBtn.offsetWidth-rightWidth) {
            oLeft = (document.documentElement.clientWidth - oBtn.offsetWidth-rightWidth);
        }
        oBtn.style.left = oLeft + "px";
        oTrack.style.width=oLeft+ 'px';
        
    },false);
 
    oBtn.addEventListener("touchend",function() {
        if(oLeft>=(oSlider.clientWidth-oBtn.clientWidth)){
            oBtn.style.left = (document.documentElement.clientWidth - oBtn.offsetWidth-rightWidth);
            oTrack.style.width= (document.documentElement.clientWidth - oBtn.offsetWidth-rightWidth);
            oIcon.style.display='none';
            oSpinner.style.display='block';
             $(".bg-green").text("验证通过");
            $("#slider").attr("data-pass","通过")
        }else{
            oBtn.style.left = 0;
            oTrack.style.width= 0;
            oIcon.style.display='block';
            oSpinner.style.display='none';
            $("#slider").attr("data-pass","失败")
        }
        oBtn.className="button-on";
        oTrack.className="track-on";
       
        document.removeEventListener("touchmove",defaultEvent,false);//阻止页面的滑动默认事件
    },false);
 
    function defaultEvent(e) {
        e.preventDefault();
    }
}