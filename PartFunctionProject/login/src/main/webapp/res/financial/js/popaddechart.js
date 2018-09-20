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
		var diffArr = $(this).parent('li').prev().find('.inputBox').text().split('-');
		if($(this).parents('.popCon').find('.horizonCombo').find('.r-combobox-slt').text() == '地域'){
			
			var qgOrbj = $("#cityCom .r-combobox-slt").text();
			if(qgOrbj == "全国"){
				var _html = '<li class="left relative normalLi">'
					+'<a href="javascript:;" class="closeIcon_1 bar"></a>'
					+'<div class="inputBox">北京</div>'
					+'</li>';
			}else if(qgOrbj == "北京"){
				var _html = '<li class="left relative normalLi">'
					+'<a href="javascript:;" class="closeIcon_1 bar"></a>'
					+'<div class="inputBox">东城区</div>'
					+'</li>';
			}
			
		}else{
			if(diffArr.length == 2){
				var _html = '<li class="left relative normalLi">'
					+'<a href="javascript:;" class="closeIcon_1 bar"></a>'
					+'<div class="inputBox">'+(diffArr[1])+'-'+(parseInt(diffArr[1])+parseInt(diffArr[1]-diffArr[0]))+'</div>'
					+'</li>';	
			}else{
				var liIndex = $(this).parent('li').parent().find("li").length;
				var _html = '<li class="left relative normalLi">'
					+'<a href="javascript:;" class="closeIcon_1 bar"></a>'
					+'<div class="inputBox">值'+liIndex+'</div>'
					+'</li>';
			}
			
		}

		$(this).parent().before(_html);
		// 弹出框计算柱图的宽度
		calculateBarWidth();
	});

	//饼图type 加号
	$('.addIcon_2').die('click').live('click',function(){
		var diffArr = $(this).parent('li').prev().find('.pie').val().split('-');
		if($(this).parent().index() < 20){
			if($(this).parents('.popCon').find('.horizonCombo').find('.r-combobox-slt').text() == '地域'){
				var _html = '<li class="clearfix normal">'
					+'<span class="typecolor color_'+$(this).parent().index()+' left"></span>'
					+'<em class="left typespan"><em>'+$(this).prev().find("em").text()+'</em>'+($(this).parent().index()+1)+'</em>'
					+'<input type="text" class="left iniputbg w40 sm pie" value="北京" readonly/>'
					+'<a href="javascript:;" class="closeIcon_2 left"></a>'
					+'</li>';
			}else{
				if(diffArr.length == 1){
					var value = "";
				}else{
					var value = (diffArr[1])+'-'+(parseInt(diffArr[1])+parseInt(diffArr[1]-diffArr[0]));
				}
				var _html = '<li class="clearfix normal">'
					+'<span class="typecolor color_'+$(this).parent().index()+' left"></span>'
					+'<em class="left typespan"><em>'+$(this).prev().find("em").text()+'</em>'+($(this).parent().index()+1)+'</em>'
					+'<input type="text" class="left iniputbg w40 sm pie" value="'+value+'" readonly/>'
					+'<a href="javascript:;" class="closeIcon_2 left"></a>'
					+'</li>';
			}
		}else{
			var randomColor = 'rgb('+Math.ceil(Math.random()*255)+','+Math.ceil(Math.random()*Math.ceil(Math.random()*255))+','+Math.ceil(Math.random()*Math.ceil(Math.random()*255))+')';
			if($(this).parents('.popCon').find('.horizonCombo').find('.r-combobox-slt').text() == '地域'){
				var _html = '<li class="clearfix normal">'
					+'<span class="typecolor left" style="background-color:'+randomColor+'"></span>'
					+'<em class="left typespan"><em>'+$(this).prev().find("em").text()+'</em>'+($(this).parent().index()+1)+'</em>'
					+'<input type="text" class="left iniputbg w40 sm pie" value="北京" readonly/>'
					+'<a href="javascript:;" class="closeIcon_2 left"></a>'
					+'</li>';
				colors.push(randomColor);
			}else{
				if(diffArr.length == 1){
					var value = "";
				}else{
					var value = (diffArr[1])+'-'+(parseInt(diffArr[1])+parseInt(diffArr[1]-diffArr[0]));
				}
				var _html = '<li class="clearfix normal">'
					+'<span class="typecolor left" style="background-color:'+randomColor+'"></span>'
					+'<em class="left typespan"><em>'+$(this).prev().find("em").text()+'</em>'+($(this).parent().index()+1)+'</em>'
					+'<input type="text" class="left iniputbg w40 sm pie" value="'+value+'" readonly/>'
					+'<a href="javascript:;" class="closeIcon_2 left"></a>'
					+'</li>';
				colors.push(randomColor);
			}
		}
		$(this).parent().before(_html);
		$(this).siblings('.typespan').html('<em>'+$(this).prev().find("em").text()+'</em>'+($(this).parent().index()+1));
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


	$('.iniputbg.pie').die().live('click',function(e){
		var mythis = $(this);
		var $comboxslt = mythis.parents('.popCon').find('.horizonCombo').find('.r-combobox-slt').text();
		function checkValue(param){
			return param;
		}
		if($comboxslt != '地域'){
			if($comboxslt == '年龄'){
				var _html='<div class="smModel seltModel clearfix" style="left:'+(mythis.offset().left-56)+'px;top:'+(mythis.offset().top-55)+'px">'
					+'<input type="text" class="left iniputbg w40 sm" value="" onkeyup="value=value.replace(/[^\\d]/g,\'\')"/>'
					+'<em class="left tempg"></em>'
					+'<input type="text" class="left iniputbg w40 sm" value="" onkeyup="value=value.replace(/[^\\d]/g,\'\')"/>'
					+'<a href="javascript:;" class="blueyesBtn"></a>'
					+'<span class="errorMsg"></span>'
					+'</div>';
			}else{
				var $comboxsltVal = mythis.parents('.popCon').find('.horizonCombo').find('.r-combobox-slt span').attr("value");
				if($comboxsltVal.indexOf("cust_") == 0 && !$("#custSettingChk2").attr("checked")){
					//定制列
					var _html='<div class="smModel seltModel clearfix" style="left:'+(mythis.offset().left-56)+'px;top:'+(mythis.offset().top-55)+'px">'
					+'<input type="text" class="left iniputbg w65p sm" value=""/>'
					+'<a href="javascript:;" class="blueyesBtn"></a>'
					+'<span class="errorMsg"></span>'
					+'</div>';
				}else{
					var _html='<div class="smModel seltModel clearfix" style="left:'+(mythis.offset().left-56)+'px;top:'+(mythis.offset().top-55)+'px">'
					+'<input type="text" class="left iniputbg w40 sm" value=""/>'
					+'<em class="left tempg"></em>'
					+'<input type="text" class="left iniputbg w40 sm" value=""/>'
					+'<a href="javascript:;" class="blueyesBtn"></a>'
					+'<span class="errorMsg"></span>'
					+'</div>';
				}
			}
			$('body').append(_html);
		}else{
			var qgOrbj = $("#cityCom .r-combobox-slt").text();
			if(qgOrbj=="全国"){//全国
				$('.cityA').removeClass('slt');
				$('.normal .pie').each(function(i,item1){
					$('.cityA').each(function(j,item2){
						if($(item1).val() == $(item2).text()){
							$(item2).addClass('slt');
						}
					});
				});
				$('.smModel.big.qg').removeClass('hide');//全国
				$('.smModel.big.qg').css('left',mythis.offset().left-85-26);
				$('.smModel.big.qg').css('top',mythis.offset().top-143-27);
			}else if(qgOrbj=="北京"){//北京
				$('.cityA').removeClass('slt');
				$('.normal .pie').each(function(i,item1){
					$('.cityA').each(function(j,item2){
						if($(item1).val() == $(item2).text()){
							$(item2).addClass('slt');
						}
					});
				});
				$('.smModel.big.bj').removeClass('hide');//北京
				$('.smModel.big.bj').css('left',mythis.offset().left-85-26);
				$('.smModel.big.bj').css('top',mythis.offset().top-68-27);
			}
			
			
		}
		$('.shadow').removeClass('hide');

		//饼图点击确定
		datavalue[mythis.index()]={};
		$('.blueyesBtn').die().on('click',function(){
			var inputDiv = $(this).parents('.seltModel');
			var inputLength = $(inputDiv).find('.iniputbg').length;
			
			if(inputLength == 1){
				// 只有一个输入框
				var value_1 = inputDiv.find('.iniputbg').eq(0).val();
				if(value_1){
					mythis.val(value_1);
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
					$('.seltModel').remove();
				}else{
					$('.errorMsg').text('不能为空');
				}
			}else{
				var value_1 = $(this).parents('.seltModel').find('.iniputbg').eq(0).val();
				var value_2 = $(this).parents('.seltModel').find('.iniputbg').eq(1).val();
				if(value_1 && value_2){
					//前者不能大于后者的判断
					if(parseFloat(value_1) >= parseFloat(value_2)){
						$('.errorMsg').removeClass('hide').text('前者不能大于后者');
						return;
					}else{
						//var exp = /^[0-9]+(.[0-9]{1,3})?$/;
						var exp = /^(0|([1-9]\d*))(\.\d+)?$/;

						if(exp.test(value_1) && exp.test(value_2)){
							mythis.val(value_1+"-"+value_2);
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
							$('.seltModel').remove();
						}else{
							$('.errorMsg').removeClass('hide').text('格式不对');
						}
					}
				}else{
					$('.errorMsg').removeClass('hide').text('不能为空');
				}
			}
		});

		//地域点击城市事件
		$('.cityA').die().live('click',function(){
			mythis.val($(this).text());
			$(this).addClass('slt');
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
			$('.smModel').addClass('hide');
		});
	});

	//点击柱状图出现弹出框
	$('.myBar li.normalLi').die().live('click',function(){
		var mythis = $(this);
		mythis.addClass('selt');
		var $comboxslt = mythis.parents('.popCon').find('.horizonCombo').find('.r-combobox-slt').text();
		$('.seltModel').remove();
		if($comboxslt != '地域'){
			if($comboxslt == '年龄'){
				var _html='<div class="smModel seltModel clearfix" style="left:'+(mythis.offset().left-46)+'px;top:'+(mythis.offset().top+70)+'px">'
							+'<input type="text" class="left iniputbg w40 sm" value="" onkeyup="value=value.replace(/[^\\d]/g,\'\')"/>'
							+'<em class="left tempg"></em>'
							+'<input type="text" class="left iniputbg w40 sm" value="" onkeyup="value=value.replace(/[^\\d]/g,\'\')"/>'
							+'<a href="javascript:;" class="blueyesBtn"></a>'
							+'<span class="errorMsg"></span>'
						+'</div>';
			}else{
				var $comboxsltVal = mythis.parents('.popCon').find('.horizonCombo').find('.r-combobox-slt span').attr("value");
				if($comboxsltVal.indexOf("cust_") == 0 && !$("#custSettingChk").attr("checked")){
					//定制列
					var _html='<div class="smModel seltModel clearfix" style="left:'+(mythis.offset().left-46)+'px;top:'+(mythis.offset().top+70)+'px">'
					+'<input type="text" class="left iniputbg w65p sm" value=""/>'
					+'<a href="javascript:;" class="blueyesBtn"></a>'
					+'<span class="errorMsg"></span>'
					+'</div>';
				}else{
					var _html='<div class="smModel seltModel clearfix" style="left:'+(mythis.offset().left-46)+'px;top:'+(mythis.offset().top+70)+'px">'
					+'<input type="text" class="left iniputbg w40 sm" value=""/>'
					+'<em class="left tempg"></em>'
					+'<input type="text" class="left iniputbg w40 sm" value=""/>'
					+'<a href="javascript:;" class="blueyesBtn"></a>'
					+'<span class="errorMsg"></span>'
					+'</div>';
				}
			}
			$('body').append(_html);
		}else{
//			$('.cityA').removeClass('slt');
//			$('.normalLi .inputBox').each(function(i,item1){
//				$('.cityA').each(function(j,item2){
//					if($(item1).text() == $(item2).text()){
//						$(item2).addClass('slt');
//					}
//				});
//			});
			
			var qgOrbj = $("#cityCom .r-combobox-slt").text();
			if(qgOrbj=="全国"){//全国
				$('.cityA').removeClass('slt');
				$('.normalLi .inputBox').each(function(i,item1){
					$('.cityA').each(function(j,item2){
						if($(item1).val() == $(item2).text()){
							$(item2).addClass('slt');
						}
					});
				});
				$('.smModel.big.qg').removeClass('hide');//全国
				$('.smModel.big.qg').css('left',mythis.offset().left-75-26);
				$('.smModel.big.qg').css('top',mythis.offset().top-20-27);
			}else if(qgOrbj=="北京"){//北京
				$('.cityA').removeClass('slt');
				$('.normalLi .inputBox').each(function(i,item1){
					$('.cityA').each(function(j,item2){
						if($(item1).val() == $(item2).text()){
							$(item2).addClass('slt');
						}
					});
				});
				$('.smModel.big.bj').removeClass('hide');//北京
				$('.smModel.big.bj').css('left',mythis.offset().left-75-26);
				$('.smModel.big.bj').css('top',mythis.offset().top-20-27);
			}
			
			//TODO
//			$('.smModel.big').removeClass('hide');
//			$('.smModel.big').css('left',mythis.offset().left-75-26);
//			$('.smModel.big').css('top',mythis.offset().top-20-27);
		}
		$('.shadow').removeClass('hide');

		//柱状图点击确定
		$('.blueyesBtn').die().on('click',function(){
			var inputDiv = $(this).parents('.seltModel');
			var inputLength = $(inputDiv).find('.iniputbg').length;
			
			if(inputLength == 1){
				// 只有一个输入框
				var barvalue_1 = inputDiv.find('.iniputbg').eq(0).val();
				if(barvalue_1){
					mythis.find('.inputBox').text(barvalue_1);
					mythis.removeClass('selt');
					$('.shadow').addClass('hide');
					$('.seltModel').remove();
				}else{
					$('.errorMsg').text('不能为空');
				}
			}else{
				var barvalue_1 = inputDiv.find('.iniputbg').eq(0).val();
				var barvalue_2 = inputDiv.find('.iniputbg').eq(1).val();
				if(barvalue_1 && barvalue_2){
					//前者不能大于后者的判断
					if(parseFloat(barvalue_1) >= parseFloat(barvalue_2)){
						$('.errorMsg').text('前者不能大于后者');
						return;
					}else{
						//var exp = /[0-9]+(.[0-9]{1,3})?/;
						var exp = /^(0|([1-9]\d*))(\.\d+)?$/;
						if(exp.test(barvalue_1) && exp.test(barvalue_2)){
							mythis.find('.inputBox').text(barvalue_1+"-"+barvalue_2);
							mythis.removeClass('selt');
							$('.shadow').addClass('hide');
							$('.seltModel').remove();
						}else{
							$('.errorMsg').removeClass('hide').text('格式不对');
						}
					}
				}else{
					$('.errorMsg').text('不能为空');
				}
			}
		});

		//地域点击城市事件
		$('.cityA').die().live('click',function(){
			mythis.find('.inputBox').text($(this).text());
			mythis.removeClass('selt');
			$('.shadow').addClass('hide');
			$('.smModel').addClass('hide');
		});
	});

	//点击空白 小弹出框消失
	$(document).click(function(e){
		var target = e.target;
		if($(target).closest(".seltModel").size() == 0 && $(target).closest(".myBar li").size() == 0 && $(target).closest(".iniputbg.pie").size() == 0){
			$('.seltModel').remove();
			$('.smModel').addClass('hide');
			$('.shadow').addClass('hide');
			$('.myBar li').removeClass('selt');
		}
	});
	
	//柱形图区间统计 按钮操作
	$('#custSettingChk').die('click').live('click',function(){
		//清除横轴内容
		$.each($(".myBar .normalLi"),function(i,item){
			if(i>0 && $(".myBar .normalLi").length>1){
				$(".myBar .normalLi")[1].remove();
			}
		});
		
		if(this.checked){
			$(".myBar .normalLi .inputBox").text("0-20");
			$(".pieUl .normalLi .iniputbg").text("0-20");
		}else{
			$(".myBar .normalLi .inputBox").text("值1");
			$(".pieUl .normalLi .iniputbg").text("值1");
		}
	});
	
	//圆饼图区间统计 按钮操作
	$('#custSettingChk2').die('click').live('click',function(){
		//清除横轴内容 (饼图)
		$.each($(".pieUl .normal"),function(i,item){
			if(i>0 && $(".pieUl .normal").length>1){
				$(".pieUl .normal")[1].remove();
			}
		});
		
		if(this.checked){
			$(".pieUl .normal .iniputbg").val("0-20");
			var datavalue=[{value:100, name:'0-20'}];
			echartPieWin(datavalue,colors);
		}else{
			$(".pieUl .normal .iniputbg").val("值1");
			var datavalue=[{value:100, name:'值1'}];
			echartPieWin(datavalue,colors);
		}
	});
});
/**
 * @description echartPieWin 饼图
 */
//var datavalue=[
//	{value:50, name:'0-20'},
//	{value:50, name:'20-29'}
//];
var datavalue=[
	{value:100, name:'0-20'}
];

function echartPieWin(datavalue,colors){
	// 路径配置
	require.config({
		paths: {
			echarts: "js/build/dist"
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
				obj_arrays[obj_arrays.length] = myChart;
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
							center : ['50%', '50%'],
							symbol:'rectangle',
							roseType : 'radius',
							width: '40%',       // for funnel
							max: 40,            // for funnel
							itemStyle : {
								normal : {
									label : {
										show : true,
										position : 'inner',
										textStyle:{
											color:'#333'
										}
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
										show : false
									},
									labelLine : {
										show : false
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
	var widthUl = 66*$('.myBar>li').length+10;
	$('.myBar').width(widthUl);
	$('.barDiv').width(widthUl+70);
}