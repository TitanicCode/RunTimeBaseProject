/**
 * @descript
 * 		初始化
 */
var obj_arrays = [];
$(function() {
	// 自定义分辨率
	initlayout();
	window.onresize = function() {
		initlayout();
		$.each(obj_arrays,function(i, tmp){
			if(tmp && tmp!=null){
				tmp.resize();
			}
		});
	};
});

/**
 * @descript
 * 		自定义分辨率
 */
function initlayout() {
	var w_width = $(window).width();
	var W_height = $(window).height();
	var W_body = $('body').width();
	var H_body = $('body').height();
	w_width = w_width < W_body ? W_body : w_width;
	W_height = W_height < H_body ? H_body : W_height;
	var h_scroll = w_width < 1400 ? 17 : 0;
	$('.J_index').height(W_height - 90);
	// 计算饼图背景
	var perLeft = 33.1;
	if(1600<W_body && W_body<=1700){
		perLeft = 31.1;
	}else if(1556<W_body && W_body<=1600){
		perLeft = 29.1;
	}else if(1440<W_body && W_body<=1555){
		perLeft = 27.1;
	}else if(1366<W_body && W_body<=1440){
		perLeft = 25.2;
	}else if(1362<W_body && W_body<=1366){
		perLeft = 23.6;
	}else{
		perLeft = 33.1/(1920/W_body).toFixed(2);
	}
	$('.liC .pieLi').css('background-position', perLeft+'% 60.5%');
	$('.rightCon').css('min-height',W_height-41);
	$('.nodataBig').css('height',W_height-100);
	$('.nodataBig').css('width',w_width-300);
//	var perLeft = 32.5;
//	if(1656<W_body && W_body<=1660){
//		perLeft = 28.5;
//	}else if(1366<W_body && W_body<=1440){
//		perLeft = 24.6;
//	}else if(1362<W_body && W_body<=1366){
//		perLeft = 22;
//	}else{
//		perLeft = 32.5/(1920/W_body).toFixed(2);
//	}
//	$('.liC .pieLi').css('background-position', perLeft+'% 62.5%');
}
/**
 * @description format 金钱单位转换
 * @param value 一个是值
 * @param symbol 货币类型
 * @returns {*}
 */
function format(value,symbol){  //两个参数，一个是值，一个是货币类型（￥,$）
	var obj = {
		symbol:symbol||"",    //货币类型
		int:"",    //整数位
		dec:"",  //小数位
		targ:"",          //正负
		times:['','万','亿','万亿','亿亿']
	};
	value = String(value);
	var reg = /^-?\d+\.?\d+$/;
	if(!reg.test(value)){
		alert("请输入数字");
		return false;
	}

	if(value[0]=="-"){
		obj.targ = "-";
		value = value.substring(1,value.length)
	}

	var times = 0;
	value = Number(value);
	while(value > 10000){
		value = value/10000;
		times++;
	}

	value = value.toFixed(2);

	var arr = String(value).split(".");
	obj.dec = arr[1];
	obj.int = arr[0];
	if(obj.int.length>3){
		obj.int = obj.int.replace(/(.{1})/,'$1,');
	}

	return obj.symbol+obj.targ+obj.int+"."+obj.dec+obj.times[times];
}

function alertMsg(msg){
	$('#pop').remove();
	$('body').append('<div id="pop" class="w208"></div>');
	var window = Run.create('Window',{
		id:'pop',
		width:280,
		height:180,
		iconCls:'',
		title: "提示",
		mask:true,
		message:'<div class="msgBox"><span>'+msg+'</span></div>',
		buttons:[{
			'className':'btn_save',
			'text':'确定',
			'handle': function (button) {
				button.close();
			}
		},{
			'className':'btn_cancel',
			'text':'取消',
			'handle': function (button) {
				button.close();
			}
		}],
		listeners:{
			render:function(){

			}
		}
	});
	
}
