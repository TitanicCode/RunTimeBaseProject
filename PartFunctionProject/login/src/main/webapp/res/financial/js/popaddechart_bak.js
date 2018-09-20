/**
 * @descript
 * 		初始化
 */
$(function() {
	//删除bar 按钮操作
	$('.closeIcon_1.bar').die('click').live('click',function(){
		$(this).parent().remove();
		// 弹出框计算柱图的宽度
		calculateBarWidth();
	});
	//添加按钮
	$('.addIcon_1').die('click').live('click',function(){
		var _html = '<li class="left relative">'
						+'<a href="javascript:;" class="closeIcon_1 bar"></a>'
						+'<div class="inputBox">'
						+'<input type="text" class="iniputbg sm" readonly/>'
						+'</div>'
					+'</li>';
		$(this).parent().before(_html);
		// 弹出框计算柱图的宽度
		calculateBarWidth();
	});
	//饼图type 加号
	$('.addIcon_2').die('click').live('click',function(){
		if($(this).parent().index() < 20){
			var _html = '<li class="clearfix normal">'
				+'<span class="typecolor color_'+$(this).parent().index()+' left"></span>'
				+'<em class="left typespan"><em>'+$(this).prev().find("em").text()+'</em>'+($(this).parent().index()+1)+'</em>'
				+'<input type="text" class="left iniputbg w40 sm" readonly/>'
				+'<a href="javascript:;" class="closeIcon_2 left"></a>'
				+'</li>';
		}else{
			var randomColor = 'rgb('+Math.ceil(Math.random()*255)+','+Math.ceil(Math.random()*Math.ceil(Math.random()*255))+','+Math.ceil(Math.random()*Math.ceil(Math.random()*255))+')';
			var _html = '<li class="clearfix normal">'
				+'<span class="typecolor left" style="background-color:'+randomColor+'"></span>'
				+'<em class="left typespan"><em>'+$(this).prev().find("em").text()+'</em>'+($(this).parent().index()+1)+'</em>'
				+'<input type="text" class="left iniputbg w40 sm" readonly/>'
				+'<a href="javascript:;" class="closeIcon_2 left"></a>'
				+'</li>';
				colors.push(randomColor);
		}
		$(this).parent().before(_html);
		$(this).siblings('.typespan').html('<em>'+$(this).prev().find("em").text()+'</em>'+($(this).parent().index()+1));
	});
	//饼图type 删除
	$('.closeIcon_2').die('click').live('click',function(){
		var colorthis = $(this);
		var i = colorthis.parent().index();
		$(this).parent().remove();
		if(i < 20){
			$('.leftLabel li.normal').each(function(j,item){
				$(item).find('.typespan').html('<em>'+$('#typeCombo .r-combobox-slt').text()+'</em>'+(j+1));
				$(item).find('.typecolor').removeClass().addClass('left typecolor color_'+j);
			});
		}else{
			$('.leftLabel li.normal').each(function(j,item){
				$(item).find('.typespan').html('<em>'+$('#typeCombo .r-combobox-slt').text()+'</em>'+(j+1));
			});
			colors.splice(i,1);
		}

		$('.pieUl li.slt').find('.typespan').html('<em>'+$('#typeCombo .r-combobox-slt').text()+'</em>'+($('.pieUl li').length));

		//点击关闭重新加载饼图
		datavalue = [];
		$('.pieUl .w40').each(function(i,item){
			if($(item).val()!==''){
				datavalue[i] = {};
				datavalue[i].name=$(item).val();
				datavalue[i].value=50;
			}
		});
		echartPieWin(datavalue,colors);
	});
	//点击输入框 弹出小弹窗
	$('.iniputbg.sm').die().live('click',function(e){
		$('.smModel').remove();
		var mythis = $(this);
		
		var $cityComcomboxslt = mythis.parents('.popCon').find('#cityCom').find('.r-combobox-slt').find("span").text();
		var $cityCom1comboxslt = mythis.parents('.popCon').find('#cityCom_1').find('.r-combobox-slt').find("span").text();
		
		var $comboxslt = mythis.parents('.popCon').find('.horizonCombo').find('.r-combobox-slt').text();
		if($comboxslt != '地域'){
			var _html='<div class="smModel" style="left:'+mythis.offset().left+'px;top:'+(mythis.offset().top+20)+'px">'
				+'<div class="modelTop">'
				+'<h4>输入<em class="sltVal">'+mythis.parents('.popCon').find('.horizonCombo .r-combobox-slt').text()+'</em>段</h4>'
				+'<div class="clearfix marginL14">'
				+'<input type="text" class="left iniputbg w40"/>'
				+'<em class="left">-</em>'
				+'<input type="text" class="left iniputbg w40"/>'
				+'</div>'
				+'</div>'
				+'<div class="modelBottom">'
				+'<a href="javascript:void(0)" class="btn_savesm">确定</a>'
				+'</div>'
				+'</div>';
		}else{
			var _html;
			if($cityComcomboxslt == "全国" ||$cityCom1comboxslt == "全国"){
				 _html='<div class="smModel big" style="left:'+mythis.offset().left+'px;top:'+(mythis.offset().top+20)+'px">'
					+'<div class="modelTop">'
					+'<h4>选择地域</h4>'
					+'<div class="clearfix marginL14">'
						+'<a href="javascript:;" class="left cityA">北京</a>'
						+'<a href="javascript:;" class="left cityA">天津</a>'
						+'<a href="javascript:;" class="left cityA">上海</a>'
						+'<a href="javascript:;" class="left cityA">重庆</a>'
						+'<a href="javascript:;" class="left cityA">河北</a>'
						+'<a href="javascript:;" class="left cityA">山西</a>'
						+'<a href="javascript:;" class="left cityA">内蒙古</a>'
						+'<a href="javascript:;" class="left cityA">辽宁</a>'
						+'<a href="javascript:;" class="left cityA">吉林</a>'
						+'<a href="javascript:;" class="left cityA">湖南</a>'
						+'<a href="javascript:;" class="left cityA">广东</a>'
						+'<a href="javascript:;" class="left cityA">广西</a>'
						+'<a href="javascript:;" class="left cityA">海南</a>'
						+'<a href="javascript:;" class="left cityA">四川</a>'
						+'<a href="javascript:;" class="left cityA">贵州</a>'
						+'<a href="javascript:;" class="left cityA">云南</a>'
						+'<a href="javascript:;" class="left cityA">黑龙江</a>'
						+'<a href="javascript:;" class="left cityA">江苏</a>'
						+'<a href="javascript:;" class="left cityA">浙江</a>'
						+'<a href="javascript:;" class="left cityA">安徽</a>'
						+'<a href="javascript:;" class="left cityA">福建</a>'
						+'<a href="javascript:;" class="left cityA">山东</a>'
						+'<a href="javascript:;" class="left cityA">河南</a>'
						+'<a href="javascript:;" class="left cityA">湖北</a>'
						+'<a href="javascript:;" class="left cityA">西藏</a>'
						+'<a href="javascript:;" class="left cityA">陕西</a>'
						+'<a href="javascript:;" class="left cityA">甘肃</a>'
						+'<a href="javascript:;" class="left cityA">青海</a>'
						+'<a href="javascript:;" class="left cityA">宁夏</a>'
						+'<a href="javascript:;" class="left cityA">新疆</a>'
					+'</div>';
			}else if($cityComcomboxslt == "北京" ||$cityCom1comboxslt == "北京" ){
				 _html='<div class="smModel big" style="left:'+mythis.offset().left+'px;top:'+(mythis.offset().top+20)+'px">'
					+'<div class="modelTop">'
					+'<h4>选择地域</h4>'
					+'<div class="clearfix marginL14">'
						+'<a href="javascript:;" class="left cityA">东城区</a>'
						+'<a href="javascript:;" class="left cityA">西城区</a>'
						+'<a href="javascript:;" class="left cityA">朝阳区</a>'
						+'<a href="javascript:;" class="left cityA">丰台区</a>'
						+'<a href="javascript:;" class="left cityA">石景山区</a>'
						+'<a href="javascript:;" class="left cityA">海淀区</a>'
						+'<a href="javascript:;" class="left cityA">门头沟区</a>'
						+'<a href="javascript:;" class="left cityA">房山区</a>'
						+'<a href="javascript:;" class="left cityA">通州区</a>'
						+'<a href="javascript:;" class="left cityA">顺义区</a>'
						+'<a href="javascript:;" class="left cityA">昌平区</a>'
						+'<a href="javascript:;" class="left cityA">大兴区</a>'
						+'<a href="javascript:;" class="left cityA">怀柔区</a>'
						+'<a href="javascript:;" class="left cityA">平谷区</a>'
						+'<a href="javascript:;" class="left cityA">密云区</a>'
						+'<a href="javascript:;" class="left cityA">延庆区</a>'
					+'</div>';
			}
			
			
			
		}
		
		$('body').append(_html);
		$('.shadow').removeClass('hide');
		
		//点击确定
		if($('.popNav li').eq(1).hasClass('slt')){
			
			//地域点击城市事件
			$('.cityA').die().live('click',function(){
				mythis.val($(this).text());
				//点击确定重新加载饼图
				datavalue = [];
				var num = 0;
				$('.pieUl .w40').each(function(j,item){
					if($(item).val()!=='') {
						datavalue[num] = {};
						datavalue[num].name = $(item).val();
						datavalue[num].value = 50;
						num++
					}
				});
				echartPieWin(datavalue,colors);
				$('.shadow').addClass('hide');
				$('.smModel').remove();
			});
			
			//其他点击确定事件
			datavalue[mythis.index()]={};
			$('.btn_savesm').die('click').live('click',function(){
				if($(this).parents('.smModel').find('.iniputbg').eq(0).val()&&$(this).parents('.smModel').find('.iniputbg').eq(1).val()){

					//前者不能大于后者的判断
					if($(this).parents('.smModel').find('.iniputbg').eq(0).val() >= $(this).parents('.smModel').find('.iniputbg').eq(1).val()){
						alert('前者不能大于后者');
						$('.shadow').addClass('hide');
						$('.smModel').remove();
						return;
					}
					//金额转换
					if($(this).parent().prev().find('.sltVal').text() === '金额'){
						mythis.val(format($(this).parents('.smModel').find('.iniputbg').eq(0).val())+ "-" + format($(this).parents('.smModel').find('.iniputbg').eq(1).val()));
					}else{
						mythis.val($(this).parents('.smModel').find('.iniputbg').eq(0).val() + "-" + $(this).parents('.smModel').find('.iniputbg').eq(1).val());
					}
					//点击确定重新加载饼图
					datavalue = [];
					var num = 0;
					$('.pieUl .w40').each(function(j,item){
						if($(item).val()!=='') {
							datavalue[num] = {};
							datavalue[num].name = $(item).val();
							datavalue[num].value = 50;
							num++;
						}
					});
					echartPieWin(datavalue,colors);
				}
				$('.shadow').addClass('hide');
				$('.smModel').remove();
			});
		}else{
			$('.cityA').die().live('click',function(){
				mythis.val($(this).text());
				$('.shadow').addClass('hide');
				$('.smModel').remove();
			});
			$('.btn_savesm').die('click').live('click',function(){
				if($(this).parents('.smModel').find('.iniputbg').eq(0).val()&&$(this).parents('.smModel').find('.iniputbg').eq(1).val()){
					//前者不能大于后者的判断
					if($(this).parents('.smModel').find('.iniputbg').eq(0).val() >= $(this).parents('.smModel').find('.iniputbg').eq(1).val()){
						alert('前者不能大于后者');
						$('.shadow').addClass('hide');
						$('.smModel').remove();
						return;
					}
					//金额转换
					if($(this).parent().prev().find('.sltVal').text() === '金额'){
						mythis.val(format($(this).parents('.smModel').find('.iniputbg').eq(0).val())+ "-" + format($(this).parents('.smModel').find('.iniputbg').eq(1).val()));
					}else{
						mythis.val($(this).parents('.smModel').find('.iniputbg').eq(0).val() + "-" + $(this).parents('.smModel').find('.iniputbg').eq(1).val());
					}
				}
				$('.shadow').addClass('hide');
				$('.smModel').remove();
			});
		}
	});
	//点击空白 小弹出框消失
	$(document).click(function(e){
		var target = e.target;
		if($(target).closest(".smModel").size() == 0 && $(target).closest(".iniputbg.sm").size() == 0){
			$('.smModel').remove();
			$('.shadow').addClass('hide');
		}
	});
});

/**
 * @description echartPieWin 饼图
 */
var datavalue=[
	{value:50, name:'0-20'},
	{value:50, name:'20-29'}
];

function echartPieWin(datavalue,colors){
	// 路径配置
	require.config({
		paths: {
			echarts: ctx+'/res/financial/js/build/dist'
		}
	});
	// 使用
	require(
		[
			'echarts',
			'echarts/chart/map',
			'echarts/chart/bar',
			'echarts/chart/pie',
			'echarts/chart/line',
			'echarts/chart/radar'
		],
		function (ec) {
			/*饼图*/
			if (document.getElementById("eachartpie_7")) {
				var myChart = ec.init(document.getElementById("eachartpie_7"));
//				obj_arrays[obj_arrays.length] = myChart;
				var option = {
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					calculable : false,
					series : [
						{
							name:$('#typeCombo .r-combobox-slt').text(),
							type:'pie',
							radius : [30, 95],
							center : ['50%', 150],
							symbol:'rectangle',
							roseType : 'radius',
							width: '40%',       // for funnel
							max: 40,            // for funnel
							itemStyle : {
								normal : {
									label : {
										show : false
									},
									labelLine : {
										show : false
									},
									color:function(param){
										return colors[param.dataIndex++];
									}
								},
								emphasis : {
									label : {
										show : true
									},
									labelLine : {
										show : true
									}
								}
							},
							data:datavalue
						}
					]
				};
				myChart.setOption(option);
			}
		}
	);
}

// 弹出框计算柱图的宽度
function calculateBarWidth(){
	var widthUl = 58*$('.myBar>li').length+10;
	$('.myBar').width(widthUl);
	$('.barDiv').width(widthUl+70);
}