$( window ).on( "load", function(){
	
	picScroLoad();
	waterfall();
	var $aPin = $( "#pubu>div" );
	$aPin.eq(0).css({'opacity':0,'left':410});
	$aPin.eq(1).css({'opacity':0,'left':410});
	$aPin.eq(2).css({'opacity':0,'left':410});
	$aPin.eq(1).animate({left:410,opacity:1},300,function(){
		$aPin.eq(0).animate({left:0,opacity:1},300);
		$aPin.eq(2).animate({left:820,opacity:1},300);

		})
});
var dataInt={'data':[{'src':'pi4.jpg','title':'绿色瑰宝-桂花-摄影张桂林','data-big':'images/pi4_b.jpg','idindex':'4'},{'src':'pi5.jpg','title':'绿色瑰宝-桂花-摄影张桂林','data-big':'images/pi5_b.jpg','idindex':'5'},{'src':'pi6.jpg','title':'绿色瑰宝-桂花-摄影张桂林','data-big':'images/pi6_b.jpg','idindex':'6'}]};
function picScroLoad(){
	$.each( dataInt.data, function( index, value ){
					
						var $oPin = $('<div>').addClass('pubuOne').appendTo( $( "#pubu" ) );
						var $oBox = $('<div>').addClass('pbIn').appendTo( $oPin );
						var $aBox = $("<a>").addClass("pubuImg").appendTo($oBox);
						var $img = $('<img>').attr('src','./images/' + $( value).attr('src') ).attr('data-big',$( value).attr('data-big')).attr("idindex",$(value).attr('idindex')).appendTo($aBox);
						var $titP = $("<p>").addClass("pbTit").appendTo($aBox);
						var $titSp = $("<span>").html($( value).attr('title')).appendTo($titP);
						var $oparo = $("<div>").addClass("pbOpa").appendTo($oBox);
						$oparo.append("<span>查看（1359）</span>|<a>赞（890）</a>");
				});
	}

var scrollFunc=function(e){ 
		ee=e || window.event; 
		var eN ;
		if(e.wheelDelta){//IE/Opera/Chrome 
			eN = e.wheelDelta; 
		}else if(e.detail){//Firefox 
			eN = e.detail; 
		} 
		
		if(eN < 0){//滚动条下滚
			if(checkscrollside()){
				picScroLoad();				
				waterfall();
			}
		}
	} 

/*注册事件*/ 
if(document.addEventListener){ 
    document.addEventListener('DOMMouseScroll',scrollFunc,false); 
}//W3C 
window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome 

/*
    parend 父级id
    pin 元素id
*/
function waterfall(parent){
    var $aPin = $( "#pubu>div" );
    var num = 3;//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】

    var pinHArr=[];//用于存储 每列中的所有块框相加的高度。
	
    $aPin.each( function( index, value ){
        var pinH = $aPin.eq( index ).height();
        if( index < num ){
            pinHArr[ index ] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        }else{
            var minH = Math.min.apply( null, pinHArr );//数组pinHArr中的最小值minH
            var minHIndex = $.inArray( minH, pinHArr );
            $( value ).css({
                'top': minH + 20,
                'left': $aPin.eq( minHIndex ).position().left
            });
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[ minHIndex ] += $aPin.eq( index ).height() + 20;//更新添加了块框后的列高
        }
    });
	var temp;
	for(var i = pinHArr.length-1 ; 0<i; i--){
		for(var j = 0; j<pinHArr.length; j++){
			if(pinHArr[j+1]<pinHArr[j]){
				temp = pinHArr[j];
				pinHArr[j] = pinHArr[j+1];
				pinHArr[j+1]=temp;
				}
			}
		}
	$("#pubu").height(temp+100);//计算整个瀑布流的高度
	
	var _len = $aPin.length;
	$aPin.eq(_len-3).hide();
	$aPin.eq(_len-2).hide();
	$aPin.eq(_len-1).hide();
	$aPin.eq(_len-3).fadeIn(100,function(){
		$aPin.eq(_len-2).fadeIn(100,function(){
			$aPin.eq(_len-1).fadeIn(100);
			});
		});
	
}

function checkscrollside(){
    return ($(document).scrollTop() >= $(document).height() - $(window).height() - $(".footer").height() ) ? true : false;//到达指定高度后 返回true，触发waterfall()函数
}


var picInd;//记录当前点击图片的索引值
$(document).ready(function(e) {
	//瀑布流hover事件
    $(".pubuDiv>div").live('mouseenter',function(){
		$(this).find(".pbIn").addClass("pbH");
		var _h = $(this).find(".pubuImg").children("img").height();		
		$(this).find(".pubuImg").append('<p class="pbMC"></p>');
		$(".pbMC").css("height", _h).animate({opacity:1},200);
		})
	$(".pubuDiv>div").live('mouseleave',function(){
		$(this).find(".pbIn").removeClass("pbH");
		$(this).find(".pbMC").remove();
		})
		
	$(".pubuDiv>div").live('click',function(){
		var bigImg = $(this).find("img").attr("data-big");
		picInd = $(this).find("img").attr("idindex");
		var $opBG = '<div class="opa80"  onclick="closeDIV()"></div>';
		var $close = '<a class="tc_Close" onclick="closeDIV()"></a>';
		var $left = '<a class="pbButt pre" onclick="prePic()"></a>';
		var $right = '<a class="pbButt next" onclick="nextPic()"></a>';
		$("body").append($opBG).append($close).append($left).append($right);
		var $mainD = $('<div>').addClass("pbTMain").appendTo("body");
		var $pbUL = $("<div>").addClass("pbTUL").appendTo($mainD);
		var $img = $('<img>').attr("src",bigImg).appendTo($pbUL);
		$pbUL.append('<a class="Dzan"></a>');
		var $title = $("<p>").addClass("imT").html("千橋之鄉美如畫").appendTo($pbUL);
		var mL = ($(window).width() - $img.width())/2;
		$mainD.css("margin-left",mL);
		});
});

function closeDIV(){
	$(".opa80,.tc_Close,.pbButt,.pbTMain").remove();
	}
function prePic(){
	var leng = $("#pubu>div").length;
	picInd++;
	if(picInd > leng ){
		picInd = leng;
		}
	$(".pbTUL").children("img").fadeOut('fast').attr("src","images/pi"+picInd+"_b.jpg").fadeIn(200);
	}
function nextPic(){
	picInd--;
	if(picInd < 1){
		picInd = 1;
	}
	$(".pbTUL").children("img").fadeOut('fast').attr("src","images/pi"+picInd+"_b.jpg").fadeIn(200);

	}