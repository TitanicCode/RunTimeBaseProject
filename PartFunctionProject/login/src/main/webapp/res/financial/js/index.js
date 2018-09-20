/**
 * @descript
 * 		初始化
 */
var colors = ['rgb(194,80,80)','rgb(191,135,79)','rgb(180,180,80)','rgb(96,181,96)',
	'rgb(96,139,181)','rgb(202,120,201)','rgb(25,97,23)','rgb(50,253,160)','rgb(183,149,238)',
	'rgb(156,202,105)','rgb(11,113,208)','rgb(20,223,230)','rgb(12,214,169)','rgb(175,78,244)',
	'rgb(108,161,125)','rgb(194,240,209)','rgb(167,25,203)','rgb(130,237,26)','rgb(8,36,248)',
	'rgb(241,244,21)'];

var ctxBase = $('#ctxValue').val();
var eventId = "";
$(function() {
	getFinancialEventList(); //加载事件列表
	//导入按钮
	$('.import').die().live('click',function(e){
		e.stopPropagation();
		var that= $(this);
		that.prev().click();
		that.prev().off().on('change',function(){
			
			if(that.parents('.navli').next().length == 0 || that.parents('.navli').next()[0].tagName != 'DL'){
				that.parents('.navli').after('<dl></dl>');
			}
//			that.parents('.navli').next('dl').append('<dd class="slt">'+$(this).val()+'</dd>');
			$('.firstLogin').remove();
			$('.first').removeClass('first');
			//shadow_zxy可以实现遮罩层点击不消失
			//var _html = '<div class="shadow_zxy"></div><div class="loaddingBox"><img src="'+ctxBase+'/res/images/loading.gif" class="loaddingImg"><div>文件上传中...</div></div>';
			var _html = '<div class="shadow"></div><div class="loaddingBox"><img src="'+ctxBase+'/res/images/loading.gif" class="loaddingImg"><div>文件上传中...</div></div>';
			$('.mainPage').append(_html);
			
			var fileName = $(this).val();
			var formData = new FormData();
			formData.append("file",that.prev()[0].files[0]);
			formData.append("eventId",that.parents('.navli').attr("id"));
			formData.append("eventName",that.parents('.navli').attr("name"));
			
//			$('body').append('<div class="shadow"></div>');
//			$('body').append('<div class="loaddingBox"><img src="res/images/loading.gif" class="loaddingImg"><div>文件上传中...</div></div>');
			var file = that.prev()[0].files[0];
			var reg = new RegExp("\.(zip|csv|accdb|xls|xlsx)$");
			 if(!reg.test(file.name)){
				 alertMsg("上传失败,请上传zip、xls、xlsx、csv、accdb文件.");
				 $('.loaddingBox').remove();
				 $('.shadow').remove();
				 return false;
			 }
			
			$.ajax({
				type:"post",
				url:$("#ctxValue").val()+"/financial/importFile",
				contentType:false,
				processData:false,
				data:formData,
				success:function(data){
					if(data.status==0){//成功
						$('.loaddingBox').remove();
						$('.shadow').remove();
						alertMsg(data.message);
						if(data.data){
							for(var i=0;i<data.data.length;i++){
								if(that.parents('.navli').next('dl')[0]){
									$("dd").removeClass("slt");
									that.parents('.navli').next('dl').append('<dd>'+data.data[i]+'</dd>'); 
								}else{
									that.parents('.navli').after('<dl class="hide"></dl>');
									that.parents('.navli').next('dl').append('<dd>'+data.data[i]+'</dd>'); 
								}
							}
							
							//关闭第一次相关大图
							$(".navUl").removeClass("first");
							$("#firstLogin").removeClass("firstLogin");
							$($(".rightMain.clearfix")[0]).removeClass("hide");
							$(".phoneNum2").removeClass("hide");
							$(".phoneNum3").removeClass("hide");
							$('.nodataBig').addClass('hide'); //关闭无数据大图片
							$(".myCounts").removeClass("hide");//右侧事件数据统计隐藏
							//重新加载右侧图表数据
							getFinancialTableDataByEventId(that.parents('.navli').attr("id"));
						}
					}else{
						$('.loaddingBox').remove();
						$('.shadow').remove();
						alertMsg(data.message);
					}
				}
			}); 
			 
			
		});
	});
	//编辑按钮
	$('.edit').die().live('click',function(e){
		e.stopPropagation();
		$(this).parents('.navli').find('.editBox').removeClass('hide');
		$(this).parent().addClass('hide');

		//修改时在原来的事件名上修改
		var id = $(this).parents('.navli').find('.editedBox')[0].id;
		var oldName = $("#"+id +" .navA").text();
		$(this).parents('.navli').find('.editBox').children(".editInput").val(oldName);
		$('.editInput').focus();
		//点击对号
		$('.yesBtn').off().on('click',function(){
			if($(this).siblings('input').val()!='' && $(this).siblings('input').val().length<32){
				var financialEventName = $(this).siblings('input').val();
				eventId = $(this).parents('.navli').find('.editedBox')[0].id;
				
				$.ajax({
					type:"post",
					url:$("#ctxValue").val()+"/financial/editEventName",
					data:{"eventName":financialEventName,"eventId":eventId},
					success:function(data){
						if(data.status==0){
							//修改事件名
							$("#"+eventId ).attr("name",financialEventName);
							$("#"+eventId +" .navA").text(financialEventName);
							
						}else{
							alertMsg(data.message);
						}
					}
						
				});
			
				$(this).parent().addClass('hide');
				$("#"+eventId+" .editedBox" ).removeClass('hide');
			}else{
				alertMsg("请检查输入事件名是否过长或为空！");
			}
		});
		
	});
	//设置按钮
	$('.setting').die().live('click',function(e){
		e.stopPropagation();
		var that = $(this);
		eventId = that.parent(".editedBox").attr("id");
		settingCase(eventId);
	});
	//删除按钮
	$('.delBtn').die().live('click',function(e){
		e.stopPropagation();
		var that = $(this);
		
		if(that.parent('.editBox')[0]){//下面的删除按钮
			$(that.parent('.editBox')[0]).addClass("hide");//隐藏
			$(that).prev().text("");//清空之前的输入
			
			if($(that.parent('.editBox')[0]).parent()[0].id == "inputEventName"){//是新增事件
				$(that.parent('.editBox')[0]).parent().addClass('hide');
				$('.addCase').removeClass("hide");//显示新增事件按钮
			}else{ //修改事件
				$(that.parent('.editBox')[0]).prev().removeClass('hide');
			}
			
			$("#firstLogin").removeClass("firstLogin");
			return 0;
		}
		eventId = that.parent(".editedBox")[0].id;
		$.ajax({
			type:"post",
			url:$("#ctxValue").val()+"/financial/deleteEvent",
			data:{"eventId":eventId},
			success:function(data){
				if(data.status==0){
					alertMsg(data.message);
					that.parents('.navli').next('dl').remove();
					that.parents('.navli').remove();
					
					//修改事件条数
					var scount = $("#event_Count").text();
					var scountNum = scount.substring(scount.indexOf("(")+1,scount.lastIndexOf(")"));
					var newcount = parseInt(scountNum) - 1;
					var newscount ="("+ newcount +")";
					$("#event_Count").text(newscount);
					
				}else{
					alertMsg(data.message);
				}
			}
		});
	});
	
	//导航点击展开收缩效果
	$('.navli').die('click').live('click',function(){
		var that= $(this);
		that.next('dl').remove(); //去除之前加载的列表
		
		//标识所选事件
		$(".editedBox").removeClass("bd-blue-2");
		that.children(".editedBox").addClass("bd-blue-2");
		
		//加载excel文件名
		eventId = $(this).attr("id");
		if(!that.hasClass('slt')){ //非展开状态
			$.ajax({
				type:"post",
				url:$("#ctxValue").val()+"/financial/getFinancialEventFileListByEventId",
				data:{"eventId":eventId},
				success:function(data){
					if(data.status==0){
						if(data.data&&data.data.length>0){
							//隐藏删除按钮
//							that.children(".delBtn").addClass("hide");
//							that.children(".editedBox").children('.delBtn').addClass("hide");
							
							var dlHtmlStart='<dl class="hide">';
							var dlHtmlEnd='</dl>';
							for(var i=0;i<data.data.length;i++){
								dlHtmlStart +='<dd>'+data.data[i]+'</dd>';
							}
							var dlHtml=dlHtmlStart+dlHtmlEnd;
							that.after(dlHtml);
							
							if(that.hasClass('slt')){
								that.removeClass('slt');
								that.next('dl').addClass('hide');
							}else{
								that.addClass('slt');
								that.next('dl').removeClass('hide');
								that.siblings('div').removeClass('slt');
								that.siblings('div').next('dl').addClass('hide');
							}
						}
					}
				}
			});
			
			//获取右侧展示图表数据
			$("#eventNamerightTop").attr("name",eventId);//存放id给自定义图表使用 (本身有id只好将事件id放到name属性)
			$("#eventNamerightTop").text(that.attr("name")); //头部标题
			getFinancialTableDataByEventId(eventId); //图表部分
		}else{//已经是展开状态
			that.removeClass('slt');
			that.next('dl').addClass('hide');
		}
		
	});
	//点击关闭
	$('.liL .closeIcon_1').die('click').live('click',function(){
		delEchart($(this).parent());
	});

	//点击添加事件
	$('.addCase').die('click').on('click',function(){
		$that = $(this);
		$that.addClass('hide'); //一次只能打开一个添加框，需要在后面再 显示该按钮
		$('.navli.slt').removeClass('slt');
//		$('.navli').next().addClass('hide');
		var _inputEventNameHtml = '<div class="navli relative" id="inputEventName">'
						+'<div class="editedBox clearfix hide">'
							+'<a href="javascript:;" class="navA left"></a>'
							+'<a href="javascript:;" class="delBtn right"></a>'
							+'<a href="javascript:;" class="setting right"></a>'
							+'<input type="file" class="hide fileInput"/>'
							+'<a href="javascript:;" class="import right" title="导入本地数据"></a>'
							+'<span class="importText">导入本地数据</span>'
							+'<a href="javascript:;" class="edit right"></a>'
						+'</div>'
						+'<div class="editBox clearfix" >'
							+'<input type="text" class="editInput" placeholder="请输入事件名"/>'
							+'<a href="javascript:;" class="delBtn right"></a>'
							+'<a href="javascript:;" class="yesBtn right"></a>'
						+'</div>'
					+'</div>';
		$('.navUl').prepend(_inputEventNameHtml);
		$('.editInput').focus();
		$(this).removeClass('firstadd');
		//第一次登陆 新建时间点击后不可再点击
		if(!$(this).hasClass('firstadd')){
			$(this).css('z-index','10');
		}
		
		//对号元素
		var yesBtnFunction = $("#inputEventName").find('.editBox input').next().next();
		//点击对号
		yesBtnFunction.off().on('click',function(){
//		$('.yesBtn').off().on('click',function(){
			if($(this).siblings('input').val()!='' && $(this).siblings('input').val().length<32){
				var financialEventName = $(this).siblings('input').val();
				//先校验是否有命名重名的，无则允许。否则动态建表将报错
				$.ajax({
					type:"post",
					url:$("#ctxValue").val()+"/financial/checkEventName",
					data:{"eventName":financialEventName},
					success:function(data){
						if(!data.flag){
							$('#inputEventName').remove();
							$that.removeClass('hide');
							alertMsg(data.message);
						}else{
							//无重名，可以添加
							$.ajax({
								type:"post",
								url:$("#ctxValue").val()+"/financial/addFinancialEvent",
								data:{"financialEventName":financialEventName},
								success:function(data){
									if(data.status==0){
										var _html='<div class="navli relative" id="'+ data.data +'" name="'+ financialEventName.trim() +'">'
										+'<div class="editedBox clearfix" id="'+ data.data +'" name="'+ financialEventName.trim() +'">'
										+'<a href="javascript:;" class="navA left">'+financialEventName.trim()+'</a>'
										+'<a href="javascript:;" class="delBtn right"></a>'
										+'<a href="javascript:;" class="setting right"></a>'
										+'<input type="file" class="hide fileInput"/>'
										+'<a href="javascript:;" class="import right" title="导入本地数据"></a>'
										+'<a href="javascript:;" class="edit right"></a>'
										+'</div>'
										+'<div class="editBox clearfix hide" >'
										+'<input type="text" class="editInput" placeholder="请输入事件名"/>'
										+'<a href="javascript:;" class="delBtn right"></a>'
										+'<a href="javascript:;" class="yesBtn right"></a>'
										+'</div>'
										+'</div>'
										
										//$("#inputEventName").after(_html);
										$('#inputEventName').remove();
										$('.navUl').prepend(_html);
										//修改事件条数
										var scount = $("#event_Count").text();
										if(!scount){//第一次添加事件之前scount为空
											var newscount ="("+ 1 +")";
											$("#event_Count").text(newscount);
										}else{
											var scountNum = scount.substring(scount.indexOf("(")+1,scount.lastIndexOf(")"));
											var newcount = parseInt(scountNum)+1;
											var newscount ="("+ newcount +")";
											$("#event_Count").text(newscount);
										}
										
									}else{
										alertMsg(data.message);
									}
									
									$that.removeClass('hide'); //一次只能打开一个添加框，需要在后面再 显示该按钮	
								}
							});
						}
					}
				});
			
				$(this).parent().addClass('hide');
			}else{
				alertMsg("请检查输入事件名是否过长或为空！");
			}
		});
		
		//回车模拟点击按钮提交事件
		document.onkeydown = function(e){
		    if(!e) e = window.event;//火狐中是 window.event
		    if((e.keyCode || e.which) == 13){
		    	yesBtnFunction.click();
		    }
		}
		
	});

	//点击加号添加
	$('.addli').die().live('click',function(){
		eventId = $("#eventNamerightTop").attr("name");
		//判断是否已经设置金额字段
		$.ajax({
			type:"post",
			url:$("#ctxValue").val()+"/financial/getSetting",
			data:{"eventId":eventId},
			success:function(data){
				if(data.status==0){
					if(data.data){ //若有数据，则已经设置过
						addEchart(eventId);
					}else{ //提示设置页面
						//alertMsg("请先设置事件！");
						var msg = "请先设置事件！";
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
									$("#"+eventId +" .setting ").trigger("click"); //触发设置按钮点击事件，弹出事件设置页面
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
				}
			}
		});
		
		
	});
	
	//点击导出分析结果数据
	$("#exportAnalyzeData").die().live('click',function(){
		var base64InfoList = new Array();
		$.each(obj_arrays,function(i,obj){
			var img={};
			img.imgWidth = obj._island._zrWidth;
			img.imgHeight = obj._island._zrHeight;
			base64InfoList.push(obj.getDataURL() + "_option:"+JSON.stringify(obj._option)+"_img:"+JSON.stringify(img));
			
			console.log("宽度："+img.imgWidth);
			console.log("高度："+img.imgHeight);
		});
		
		//模拟表单提交
		var url= $("#ctxValue").val()+"/financial/exportAnalyzeData";
		var form = $("<form></form>").attr("action",url).attr("method","post");
		form.append($("<input></input>").attr("type","hidden").attr("name","base64InfoList").attr("value",JSON.stringify(base64InfoList)));
		form.appendTo("body").submit().remove();
		
	});
	
	//刷新
	$("#sxSearch").die().live('click',function(){
		if($('input[name="sfz"]:checked').val()=="1"){
			idIsUnableSet();
		}else{
			idIsAbleSet();
		}
		eventId = $("#eventNamerightTop").attr("name");
		var val_sfz = $('input[name="sfz"]:checked').val();
		var val_sjh = $('input[name="sjh"]:checked').val();
//		alertMsg("正在研发中...");
		getFinancialTableDataByEventId(eventId, val_sfz, val_sjh)
	});
	
});

//‘无效数据汇总’点击
function invalidData() {
	if($('.nodataBig').hasClass('hide')) {
		if(eventId == "" || eventId == null) {
			var firstEventId = $(".navUl .navli").first().attr("id");
			eventId = firstEventId;
		}
		var url_excelDataList = "financial/invalidData?eventId="+eventId;
		window.open(url_excelDataList);
	} else {
		alertMsg("当前事件暂无数据，请选择其他事件后继续！");
	}
}

//‘事件数据’点击
function excelDataListErrorPoint() {
	if($('.nodataBig').hasClass('hide')) {
		if(eventId == "" || eventId == null) {
			var firstEventId = $(".navUl .navli").first().attr("id");
			eventId = firstEventId;
		}
		var url_excelDataList = "financial/excelDataList?eventId="+eventId;
		window.open(url_excelDataList);
	} else {
		alertMsg("当前事件暂无数据，请选择其他事件后继续！");
	}
}

//‘全事件数据检索’点击
function AllEventDataListErrorPoint() {
	if($('.nodataBig').hasClass('hide')) {
		var url_excelDataList = "financial/allEventDataSearchPage";
		window.open(url_excelDataList);
	} else {
		alertMsg("当前事件暂无数据，请选择其他事件后继续！");
	}
}


var ctx = $('#ctxValue').val();
/**
 * @description echartPie 饼图
 */
function echartPie(i,data,colors){
	if(data !=''){
		// 路径配置
		require.config({
			paths: {
				echarts: ctx+"/res/financial/js/build/dist"
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
				if (document.getElementById("eachartpie_"+i)) {
					var myChart = ec.init(document.getElementById("eachartpie_"+i));
					obj_arrays[obj_arrays.length] = myChart;
					var option = {
						title : {
							text: data.name,
							x:'center',
							y:'12',
							textStyle:{
								fontSize: 12,
								fontWeight: 'bolder',
								color: '#333'
							}
						},
						tooltip : {
							trigger: 'item',
							formatter: "{b} : {c} ({d}%)"
						},
						legend: {
							orient : 'vertical',
							x : 'right',
							y:'75',
							data:data.legend
						},
						calculable : false,
						series : [
							{
								name:'半径模式',
								type:'pie',
								radius : [30, 85],
								center : ['40%',150],
								symbol:'rectangle',
								//roseType : 'radius',
								width: '40%',       // for funnel
								max: 40,            // for funnel
								itemStyle : {
									normal : {
										label : {
											show : true,
											formatter : function (params) {
												//return params.name +" : "+ (params.percent - 0).toFixed(0) + '%';
												return (params.percent - 0).toFixed(0) + '%';
											}
										},
										labelLine : {
											show : true
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
								data:data.datasource
							}
						]
					};
					myChart.setOption(option);
				}
			}
		);
	}else{
	}
}

/**
 * @description echartBar 柱状图
 */
function echartBar(i,data){
	if(data !=''){
		// 路径配置
		require.config({
			paths: {
				echarts: ctx+"/res/financial/"+"js/build/dist"
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
				//柱状图
				if (document.getElementById("eachartbar_"+i)) {
					var myChart = ec.init(document.getElementById("eachartbar_"+i));
					obj_arrays[obj_arrays.length] = myChart;
					
					myChart.on("click",function(params){
						  if(confirm("确认要导出吗？")){
								 //alert("确定");
								 var paramsString=params.name; 
								 var url="financial/indexAreaDataExport";
								 /* var url="financial/ZhuyeExportExcelData?eventId="+eventId;*/
								  paramsMap={}; 
								  $("body").innerHTML="<from><input></input></from>";
								  paramsMap["eventId"] = eventId;/*$("#eventId").val().trim()*/
								  paramsMap["ID_is_effect"]=$('input[name="sfz"]:checked').val();
								   paramsMap["phone_is_effect"]=$('input[name="sjh"]:checked').val();
								   //alert($("input[name='sfz']").val());
								   /*alert($("input[name='sjh']").val());*/
								  
								   paramsMap["i"] = i;
								  
								  paramsMap["SFParam"] = params.name;
								  var form=$("<form></form>").attr("action",url).attr("method","post");
								  form.append($("<input></input>").attr("type","hidden").attr("name","paramsString").attr("value",JSON.stringify(paramsMap)));
								  form.append($("<input></input>").attr("type","hidden").attr("name","eventId").attr("value",JSON.stringify(paramsMap)));
								  form.append($("<input></input>").attr("type","hidden").attr("name","ID_is_effect").attr("value",JSON.stringify(paramsMap)));
								  form.append($("<input></input>").attr("type","hidden").attr("name","phone_is_effect").attr("value",JSON.stringify(paramsMap)));
								  form.appendTo("body").submit().remove();
								
							}//else{
//								alert("取消");
//							}
						  
						
						  
					   /*  $("#export").off("click").on("click",function(){ //点击导出
								//模拟表单提交
								var url= ctxBase+"/financial/exportExcelData";
								var form = $("<form></form>").attr("action",url).attr("method","post");
								form.append($("<input></input>").attr("type","hidden").attr("name","paramsString").attr("value",JSON.stringify(paramsMap)));
								form.appendTo("body").submit().remove();
						});*/
						  
						  
					/*	  
						 $.ajax({     eacher/dataExport 
								url:ctxBase+"financial/exportExcel", 
								type:"post",
								dataType:"json",
								data:{province:params.name},
								success:function(respData){
									if(respData.success==true){
										alert("导出成功")
									}
								},
								error:function(errorData){
									alert("服务器异常，请稍后再试");
								}
							 });*/
						})
					
					var option = {
						title : {
							text: data.name,
							x:'center',
							y:'12',
							textStyle:{
								fontSize: 12,
								fontWeight: 'bolder',
								color: '#333'
							}
						},
						legend: {
							show:false,
							data:['全国投资者受损情况']
						},
						tooltip : {
							trigger: 'axis'
						},
						xAxis : [
							{
								type : 'category',
								data:data.legend,
								axisLabel : {
									textStyle : {color : "#666666",fontFamily:"微软雅黑"},
									interval:0,
									rotate:-15
								},
								axisLine : {
									show:true,
									lineStyle : {
										color: '#4ba5ff',
										width: 1,
										type: 'solid'
									}
								},
								splitArea : {
									show:false,
									areaStyle:{
										color: ['#fff','#e6e6e6']
									}
								},
								splitLine : {
									show:true,
									lineStyle : {
										color: '#dbdbdb',
										width: 1,
										type: 'solid'
									}
								},
								axisTick: {show: false}
							}
						],
						yAxis : [
							{
								type : 'value',
								axisLabel : {
									textStyle : {color : "#b2b2b2"}
								},
								axisLine : {
									lineStyle : {
										color: '#4ba5ff',
										width: 1,
										type: 'solid'
									}
								},
								splitArea : {
									show:true,
									areaStyle:{
										color: ['rgba(255,255,255,0.6)','rgba(230,230,230,0.6)']
									}
								},
								splitLine : {
									show:false,
									lineStyle : {
										color: '#dbdbdb',
										width: 1,
										type: 'solid'
									}
								},
								axisTick: {show: false}
							}
						],
						grid: {y:45, y2:45, x:60, x2:25,borderWidth :0},
						series : [
							{
								//name:'全国投资者受损情况',
								type:'bar',
								data:data.datasource,
								barWidth:22,
								smooth:true,
								itemStyle: {
									normal: {
										label : {
					                        show: true, //若要显示柱状值，则修改为true,且将下面注释打开
					                        position: 'top',
					                        textStyle : {color : "#333"},
					                        formatter : function (params) {
					                        	if(params.value != 0){
					                        		return params.value;
					                        	}
											}
					                    },
										color : '#4abdde'
									}
								}
							}

						]
					};
					myChart.setOption(option);
				}
			}
		);
	}else{
		$($('#eachartbar_'+i).parent()).addClass("nodata-small");
	}
}

/**
*
* @description addEchart 添加echart 弹出框
*/
var pieadd = 0;
var baradd = 0;
function addEchart(eventId){
	$('#pop').remove();
	$('body').append('<div id="pop" class="w582"></div>');
	var window = Run.create('Window',{
		id:'pop',
		dataType:'html',
		width:582,
		height:419,
		iconCls:'',
		title: "添加",
		mask:true,
		url:ctx+'/res/financial/include/popaddechart.html',
		buttons:[],
		listeners:{
			render:function(){
				//加载下拉框
//				createCombox_1('horizonCombo','json/combox.json');
//				createCombox_2('verticalCombo','json/combox1.json');
//				createCombox_3('typeCombo','json/combox.json');
//				createComboxTrends('cityCom','json/city.json',60);
				createCombox_1('horizonCombo',ctx+'/financial/initHorizon?eventId='+eventId,'全国', eventId); //加载全国横向
				//createCombox_2('verticalCombo',ctx+'/res/financial/json/qg_vertical.json');
				createCombox_2('verticalCombo',ctx+'/financial/initVertical?eventId='+eventId);
				createCombox_3('typeCombo',ctx+'/financial/initHorizon?eventId='+eventId,'全国'); //加载全国横向
				createComboxTrends('cityCom',ctx+'/res/financial/json/city.json',60,eventId); //柱状图选择项：全国、北京
				//首页柱状图和并不划过点击效果
				$('.charType').off().on('click',function(){
					if($(this).hasClass('slt')){
						//$(this).removeClass('slt');
					}else{
						$(this).addClass('slt');
						$(this).siblings('.charType').removeClass('slt');
					}
				});

				//下一步点击
				$('.nextStep').off('click').on('click',function(){
					var titleName = $(this).parents('.popCon').find('.cityinput').val();
					if(titleName.trim() == ""){ //请输入标题
						titleName = "自定义图表";
					}
					var titleCity = $(this).parents('.popCon').find('#cityCom').find('.r-combobox-slt').text();
					if($(this).parents('.popCon').find('.charType.slt').hasClass('bar')){//柱状图
						$('.popCon').eq(1).removeClass('hide');
						$('.popCon').eq(1).siblings('.popCon').addClass('hide');
						$('.popCon').eq(1).find('.titleSpan').text("["+titleCity+"] "+titleName);
					}else{//饼图
						$('.popCon').eq(2).removeClass('hide');
						$('.popCon').eq(2).siblings('.popCon').addClass('hide');
						$('.popCon').eq(2).find('.titleSpan').text("["+titleCity+"] "+titleName);
						echartPieWin(datavalue,colors);
					}
				});

				//上一步点击
				$('.preStep').off().on('click',function(){
					$('.popCon').eq(0).removeClass('hide');
					$('.popCon').eq(0).siblings('.popCon').addClass('hide');
				});

				//点击取消
				$('.cancelBtn').off().on('click',function(){
					$('#pop').remove();
				});

				var dataechart = {};
				var long = '';
				//柱状图点击确定
				$('.barSure').off().on('click',function(){
					dataechart.name = $(this).parents('.popCon').find('.titleSpan').text();
					dataechart.axisx = $(this).parents('.popCon').find('.horizonCombo .r-combobox-slt').text();
					dataechart.axisy = $(this).parents('.popCon').find('.verticalCombo .r-combobox-slt').text();
					dataechart.legend = [];
					dataechart.datasource = [];
					
					//页面添加放bar的位置
					var _html='<li class="left relative liL '+long+'">'
						+'<div class="liR">'
						+'<div class="liC">'
						+'<div class="eachartSize"  id="eachartbar_add'+baradd+'""></div>'
						+'<a href="javascript:;" class="closeIcon_1"></a>'
						+'</div>'
						+'</div>'
						+'</li>';
					$('.addli').parents('li').before(_html);
					
					//打开loading
					var _loaddinghtml = '<div class="loaddingBox"><img src="res/images/loading.gif" class="loaddingImg"><div>数据加载中...</div></div>';
					$('#eachartbar_add'+baradd).parent().append(_loaddinghtml);
					//查询数据
					var legendList = [];
					$(this).parents('.popCon').find('.inputBox').each(function(i,item){
						legendList.push($(item).text());
					});
					var qgOrbj = $("#cityCom .r-combobox-slt").text();
					var horizon = $("#horizonCombo .r-combobox-slt").text();
					var vertical = $("#verticalCombo .r-combobox-slt").text();
					var supportInterval = "0"; // 定制属性不支持区间
					if($("#custSettingChk").attr("checked")){
						supportInterval = "1"; // 定制属性支持区间
					}
					
					$('#pop').remove(); //$(this)用完即可关闭弹出页面
					$.ajax({
						type:"post",
						url:$("#ctxValue").val()+"/financialData/getCostomDataByLegendList",
						data:{"qgOrbj":qgOrbj,"horizon":horizon,"vertical":vertical,"legendList":JSON.stringify(legendList),"eventId":eventId,"supportInterval":supportInterval},
						success:function(data){
							if(data.status==0){
								var noData = true;
								$.each(data.data,function(i,item){
									if(horizon.indexOf("金额")>-1){ //金额相关带上单位(万)
										dataechart.legend[i] = item.name+"(万)";
										dataechart.datasource[i] = item.value;
										if(item.value>0){
											noData = false;
										}
									}else{
										dataechart.legend[i] = item.name;
										dataechart.datasource[i] = item.value;
										if(item.value>0){
											noData = false;
										}
									}
									
									
								});
								if(noData){//没数据
									//打开loading
									var noDatahtml = '<div class="nodataBox"><img src="res/financial/images/nodata_1.png" class="nodataImg"></div>';
									$('#eachartbar_add'+baradd).append(noDatahtml);
								}else{
									echartBar('add'+baradd,dataechart);
								}	
								
								
								//关闭loading
								$('#eachartbar_add'+baradd).parent().find('.loaddingBox').remove();
								
								baradd++;
							
							}else{
								alertMsg(data.message);
							}
						}
					});
					
					if(dataechart.legend.length <= 7){
						long = '';
					}else if(dataechart.legend.length <= 14 && dataechart.legend.length > 7 ){
						long = 'w65p';
					}else if(dataechart.legend.length > 14){
						long = 'w99p';
					}
					
				});
				//饼图点击确定
				$('.pieSure').off().on('click',function(){
					dataechart.name = $(this).parents('.popCon').find('.titleSpan').text();
					dataechart.axisx = $(this).parents('.popCon').find('.horizonCombo .r-combobox-slt').text();
					dataechart.legend = [];
					dataechart.datasource = [];
					
					//页面添加放pie的位置
					var _html='<li class="left relative liL '+long+'">'
						+'<div class="liR">'
						+'<div class="liC">'
						+'<div class="pieLi">'
						+'<div class="eachartSize" id="eachartpie_add'+pieadd+'"></div>'
						+'<a href="javascript:;" class="closeIcon_1"></a>'
						+'</div>'
						+'</div>'
						+'</div>'
						+'</li>';
					$('.addli').parents('li').before(_html);
					initlayout();
					
					//打开loading
					var _loaddinghtml = '<div class="loaddingBox"><img src="res/images/loading.gif" class="loaddingImg"><div>数据加载中...</div></div>';
					$('#eachartpie_add'+pieadd).parent().append(_loaddinghtml);
					//查询数据
					var legendList = [];
					$(this).parents('.popCon').find('.iniputbg.sm').each(function(i,item){
						legendList.push($(item).val());
					});
					//查询后台数据 全国/北京、年龄/地域/盈利金额/受损金额/投资金额/会员等级
					var qgOrbj = $("#cityCom .r-combobox-slt").text();
					var horizon = $("#typeCombo .r-combobox-slt").text();
					var vertical = "饼图"; //饼图没有纵向，进行固定 
					var supportInterval = "0"; // 定制属性不支持区间
					if($("#custSettingChk2").attr("checked")){
						supportInterval = "1"; // 定制属性支持区间
					}
					
					$('#pop').remove();//$(this)用完即可关闭弹出页面
					$.ajax({
						type:"post",
						url:$("#ctxValue").val()+"/financialData/getCostomDataByLegendList",
						data:{"qgOrbj":qgOrbj,"horizon":horizon,"vertical":vertical,"legendList":JSON.stringify(legendList),"eventId":eventId,"supportInterval":supportInterval},
						success:function(data){
							if(data.status==0){
								var noData = true;
								
								$.each(data.data,function(i,item){
									
									if(horizon.indexOf("金额")>-1){ //金额相关带上单位(万)
										dataechart.legend[i] = item.name+"(万)";
										dataechart.datasource[i] = {};
										dataechart.datasource[i].name = item.name+"(万)";
										dataechart.datasource[i].value = item.value;
										if(item.value>0){
											noData = false;
										}
									}else{
										dataechart.legend[i] = item.name;
										dataechart.datasource[i] = {};
										dataechart.datasource[i].name = item.name;
										dataechart.datasource[i].value = item.value;
										if(item.value>0){
											noData = false;
										}
									}
									
								});
									
								
								if(noData){//没数据
									var noDatahtml = '<div class="nodataBox"><img src="res/financial/images/nodata_1.png" class="nodataImg"></div>';
									$('#eachartpie_add'+pieadd).parent().removeClass("pieLi");
									$('#eachartpie_add'+pieadd).append(noDatahtml);
									
								}else{
									echartPie('add'+pieadd,dataechart,colors);
								}	
								
								//关闭loading
								$('#eachartpie_add'+pieadd).parent().find('.loaddingBox').remove();
								
								pieadd++;
							
							}else{
								alertMsg(data.message);
							}
						}
					});
					
				});
			}
		}
	});
}


/**
 *
 * @description delEchart 删除echart 弹出框
 */
function delEchart(elem){
	$('#pop').remove();
	$('body').append('<div id="pop" class="w208"></div>');
	var window = Run.create('Window',{
		id:'pop',
		dataType:'html',
		width:280,
		height:180,
		iconCls:'',
		title: "提示",
		mask:true,
		url:ctx+'/res/financial/include/popdel.html',
		buttons:[{
			'className':'btn_save',
			'text':'确定',
			args:[11,222],
			'handle': function (button,arg1, arg2) {
				//删除obj_arrays中存的该表数据
				var delId = $(elem.parents('li')).find(".eachartSize")[0].id;
				$.each(obj_arrays,function(i,item){
					if((obj_arrays.length != i) && obj_arrays[i].chart.bar){
						if(delId == obj_arrays[i].chart.bar.myChart.dom.id){
							obj_arrays.splice(i,1);
						}
					}else if((obj_arrays.length != i) && obj_arrays[i].chart.pie){
						if(delId == obj_arrays[i].chart.pie.myChart.dom.id){
							obj_arrays.splice(i,1);
						}
					}
				});
				
				elem.parents('li').remove();
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

/**
 *
 * @description addCase 添加事件 弹出框
 */
function addCase(){
	$('#pop').remove();
	$('body').append('<div id="pop" class="w208"></div>');
	var window = Run.create('Window',{
		id:'pop',
		dataType:'html',
		width:280,
		height:180,
		iconCls:'',
		title: "新建事件",
		mask:true,
		url:ctx+'/res/financial/include/popaddcase.html',
		buttons:[{
			'className':'btn_save',
			'text':'确定',
			args:[11,222],
			'handle': function (button,arg1, arg2) {
				if(!$('.caseName').val().trim()){
					alertMsg("事件名不能为空！");
				}else{
					$.ajax({
						type:"post",
						url:$("#ctxValue").val()+"/financial/addFinancialEvent",
						data:{"financialEventName":$('.caseName').val()},
						success:function(data){
							if(data.status==0){
								var _html='<div class="navli" id="'+ data.data +'" name="'+ $('.caseName').val().trim() +'">'
								+'<div class="clearfix">'
									+'<a href="javascript:;" class="navA left">'+$('.caseName').val().trim()+'</a>'
									+'<a href="javascript:;" class="setting right"></a>'
									+'<a href="javascript:;" class="delBtn right"></a>'
									+'<input type="file" class="hide fileInput"/>'
									+'<a href="javascript:;" class="import right"></a>'
									+'<a href="javascript:;" class="edit right"></a>'
								+'</div>'
							+'</div><dl class="hide"></dl>';
							
							$('.navUl').append(_html);
							//修改事件条数
							var scount = $("#event_Count").text();
							var scountNum = scount.substring(scount.indexOf("(")+1,scount.lastIndexOf(")"));
							var newcount = parseInt(scountNum)+1;
							var newscount ="("+ newcount +")";
							$("#event_Count").text(newscount);
							button.close();
						}else{
							alertMsg(data.message);
						}
					}
							
							
					});
				}
				
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
/**
*
* @description editCase 修改事件 弹出框
*/
function editCase(eventId){
	$('#pop').remove();
	$('body').append('<div id="pop" class="w208"></div>');
	var window = Run.create('Window',{
		id:'pop',
		dataType:'html',
		width:280,
		height:180,
		iconCls:'',
		title: "修改事件",
		mask:true,
		url:ctx+'/res/financial/include/popaddcase.html',
		buttons:[{
			'className':'btn_save',
			'text':'确定',
			args:[11,222],
			'handle': function (button,arg1, arg2) {
				if(!$('.caseName').val().trim()){
					alertMsg("事件名不能为空！");
				}else{
					$.ajax({
						type:"post",
						url:$("#ctxValue").val()+"/financial/editEventName",
						data:{"eventName":$('.caseName').val(),"eventId":eventId},
						success:function(data){
							if(data.status==0){
								//修改事件名
								$("#"+eventId ).attr("name",$('.caseName').val());
								$("#"+eventId +" .navA").text($('.caseName').val());
								
								button.close();
						}else{
							alertMsg(data.message);
						}
					}
							
							
					});
				}
				
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

/**
*
* @description settingCase 设置事件 弹出框
*/
function settingCase(eventId){
	$('#pop').remove();
	$('body').append('<div id="pop" class="w582 special"></div>');
	var window = Run.create('Window',{
		id:'pop',
		dataType:'html',
		width:582,
		height:285,
		iconCls:'',
		title: "设置事件",
		mask:true,
		url:ctx+'/res/financial/include/popsetcase.html',
		buttons:[{
			'className':'btn_save',
			'text':'新增',
			'handle': function (button) {
				var custSize = $("#popSetCase").find(".custSetting").length;
				
				var custSettingId = 'custSetting'+(custSize +1);
				var custEventHtml ='<div class="clearfix labelBox custSetting">'
		            +'<div class="left"><input type="text" style="width:100px" id="in_'+custSettingId+'" class="input_default left" />：</div>'
		            +'<div class="left" id="'+custSettingId+'"></div>'
		            +'<a href="javascript:" class="delCustSettingBtn left"></a>'
		            +'</div>';
				
				$("#popSetCase").append(custEventHtml);
				createCombox(custSettingId, ctx+'/financialData/getTableExcelColumnNames?eventId='+eventId);
				$("#in_"+custSettingId).focus();
				
				//删除按钮
				$('.delCustSettingBtn').die().live('click',function(e){
					$(this).parent().remove();	
				});
			}
		},{
			'className':'btn_save',
			'text':'确定',
			args:[11,222],
			'handle': function (button,arg1, arg2) {

				var isValid = "1";
				var custSettings = "";
				$(".custSetting").each(function(){
					var that = $(this);
					var label = $($(that).find("input")[0]).val();
					var columnName = $(that).find(".r-combobox-slt").text();
					
					if("" == label){
						$($(that).find("input")[0]).focus();
						isValid="0";
						return false;
					}else if("" == columnName){
						$(that).find(".r-combobox-input").focus();
						isValid="0";
						return false;
					}
					custSettings += label+":"+columnName+";";
				});
				if("0" == isValid){
					return;
				}
				
				//字段设置后发送后台存放数据库
				$.ajax({
					type:"post",
					url:$("#ctxValue").val()+"/financial/setSetting",
					data:{"eventId":eventId,
						"loss1":$("#popCombloss_1 .r-combobox-slt").text(),
						"loss2":$("#popCombloss_2 .r-combobox-slt").text(),
						"succ1":$("#popCombsucc_1 .r-combobox-slt").text(),
						"succ2":$("#popCombsucc_2 .r-combobox-slt").text(),
						"invest1":$("#popCombinvest_1 .r-combobox-slt").text(),
						"addr1":$("#popaddress .r-combobox-slt").text(),
						"level1":$("#popuserLevel .r-combobox-slt").text(),
						"levelbelow1":$("#popLevelbelow .r-combobox-slt").text(),
						"custSettings":custSettings
					},
					success:function(data){
						alertMsg(data.message);
						
						if(data.status == '0'){
							button.close();			
						}
					}
				});
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
				initCustSetting(eventId);
			}
		}
	});
}

function initCustSetting(eventId){
	$.ajax({
		type:"post",
		url:$("#ctxValue").val()+"/financialData/popsetcase",
		data:{"eventId":eventId},
		success:function(data){
			var custSettings = data.popCustSetCombData;
			var popCombData = data.popCombData;
			if(custSettings && custSettings.length > 0){
				var custEventHtml = "";
				
				var i = 0;
				for(i=0; i< custSettings.length; i++){
					
					var custSettingId = 'custSetting'+(i +1);
					custEventHtml ='<div class="clearfix labelBox custSetting">'
			            +'<div class="left"><input type="text" style="width:100px" id="in_'+custSettingId+'" class="input_default left" value="'+custSettings[i].label+'"/>：</div>'
			            +'<div class="left" id="'+custSettingId+'">'
			            +'</div>';
					
					$("#popSetCase").append(custEventHtml);
					$($("#"+custSettingId).parent()).append('<a href="javascript:;" class="delCustSettingBtn left"></a>');
					createComboxByData(custSettingId, custSettings[i]);
				}
				
				//删除按钮
				$('.delCustSettingBtn').die().live('click',function(e){
					$(this).parent().remove();	
				});
			}
			createComboxByData('popCombloss_1', popCombData.loss1);
			createComboxByData('popCombloss_2',popCombData.loss2);
			createComboxByData('popCombsucc_1',popCombData.succ1);
			createComboxByData('popCombsucc_2',popCombData.succ2);
			createComboxByData('popCombinvest_1',popCombData.invest1);
			createComboxByData('popaddress', popCombData.addr1);
			createComboxByData('popuserLevel', popCombData.level1);
			createComboxByData('popLevelbelow', popCombData.levelbelow1);
		}
	});
}

/**
 * 创建下拉框
 */
function createCombox_1(id, url,qgorbj, eventId){
	combobox = Run.create("ComboBox",{
		id : id,
		url : url,
		width : 120,
		listHeight : 90,
		isMultiple : false,
		editable : false,
		autoLoad : true,
		onSelect : function(combo,record){
			var selectVal=record.value[0];
			if(selectVal.indexOf("cust_") == 0){
				$('#custSettingChk').closest("li").removeClass("hide");
			}else{
				$('#custSettingChk').closest("li").addClass("hide");
			}
			$('.horName').text(record.text);
			//刷新纵向
			$('#verticalCombo').html('');
			
			//根据横向选择对应纵向
			var selected = $("#"+id+" .r-combobox-slt").text();
			if(selected=="年龄"){
				//清除横轴内容
				$.each($(".myBar .normalLi"),function(i,item){
					if(i>0 && $(".myBar .normalLi").length>1){
						$(".myBar .normalLi")[1].remove();
					}
				});
				
				$(".myBar .normalLi .inputBox").text("0-20");
				
				
				//清除横轴内容 (饼图)
				$.each($(".pieUl .normalLi"),function(i,item){
					if(i>0 && $(".pieUl .normalLi").length>1){
						$(".pieUl .normalLi")[1].remove();
					}
				});
				$(".pieUl .normalLi .iniputbg").text("0-20");
				
			}else if(selected=="地域"){
				
				//清除横轴内容
				$.each($(".myBar .normalLi"),function(i,item){
					if(i>0 && $(".myBar .normalLi").length>1){
						$(".myBar .normalLi")[1].remove();
					}
				});
				if(qgorbj=="全国"){
					$(".myBar .normalLi .inputBox").text("北京");
				}else if(qgorbj=="北京"){
					$(".myBar .normalLi .inputBox").text("东城区");
				}
				//清除横轴内容 (饼图)
				$.each($(".pieUl .normalLi"),function(i,item){
					if(i>0 && $(".pieUl .normalLi").length>1){
						$(".pieUl .normalLi")[1].remove();
					}
				});
				if(qgorbj=="全国"){
					$(".pieUl .normalLi .iniputbg").text("北京");
				}else if(qgorbj=="北京"){
					$(".pieUl .normalLi .iniputbg").text("东城区");
				}
				
			}else if(selected=="盈利金额(万)"){
				if(qgorbj=="全国"){
					
					//清除横轴内容
					$.each($(".myBar .normalLi"),function(i,item){
						if(i>0 && $(".myBar .normalLi").length>1){
							$(".myBar .normalLi")[1].remove();
						}
					});
					$(".myBar .normalLi .inputBox").text("0-20");
					
				}else if(qgorbj=="北京"){
					
					//清除横轴内容
					$.each($(".myBar .normalLi"),function(i,item){
						if(i>0 && $(".myBar .normalLi").length>1){
							$(".myBar .normalLi")[1].remove();
						}
					});
					$(".myBar .normalLi .inputBox").text("0-20");
				}
				
			}else if(selected=="受损金额(万)"){
				
				if(qgorbj=="全国"){
					
					//清除横轴内容
					$.each($(".myBar .normalLi"),function(i,item){
						if(i>0 && $(".myBar .normalLi").length>1){
							$(".myBar .normalLi")[1].remove();
						}
					});
					$(".myBar .normalLi .inputBox").text("0-20");
					
				}else if(qgorbj=="北京"){
					
					//清除横轴内容
					$.each($(".myBar .normalLi"),function(i,item){
						if(i>0 && $(".myBar .normalLi").length>1){
							$(".myBar .normalLi")[1].remove();
						}
					});
					$(".myBar .normalLi .inputBox").text("0-20");
					
				}
				
			}else if(selected=="投资金额(万)"){
				
				if(qgorbj=="全国"){
					
					//清除横轴内容
					$.each($(".myBar .normalLi"),function(i,item){
						if(i>0 && $(".myBar .normalLi").length>1){
							$(".myBar .normalLi")[1].remove();
						}
					});
					$(".myBar .normalLi .inputBox").text("0-20");
					
				}else if(qgorbj=="北京"){
					
					//清除横轴内容
					$.each($(".myBar .normalLi"),function(i,item){
						if(i>0 && $(".myBar .normalLi").length>1){
							$(".myBar .normalLi")[1].remove();
						}
					});
					$(".myBar .normalLi .inputBox").text("0-20");
					
				}
			}else if(selected=="会员等级" && qgorbj !="全国"){
				
				//清除横轴内容
				$.each($(".myBar .normalLi"),function(i,item){
					if(i>0 && $(".myBar .normalLi").length>1){
						$(".myBar .normalLi")[1].remove();
					}
				});
				$(".myBar .normalLi .inputBox").text("0-20");
				
			}else if(selected=="下线人数"){
				
				//清除横轴内容
				$.each($(".myBar .normalLi"),function(i,item){
					if(i>0 && $(".myBar .normalLi").length>1){
						$(".myBar .normalLi")[1].remove();
					}
				});
				$(".myBar .normalLi .inputBox").text("0-20");
				
			}else{
				//清除横轴内容
				$.each($(".myBar .normalLi"),function(i,item){
					if(i>0 && $(".myBar .normalLi").length>1){
						$(".myBar .normalLi")[1].remove();
					}
				});
				
				$(".myBar .normalLi .inputBox").text("值1");
				
				
				//清除横轴内容 (饼图)
				$.each($(".pieUl .normalLi"),function(i,item){
					if(i>0 && $(".pieUl .normalLi").length>1){
						$(".pieUl .normalLi")[1].remove();
					}
				});
				
				$(".pieUl .normalLi .iniputbg").text("值1");
			}
			
			if(qgorbj=="全国"){
				createCombox_2('verticalCombo',ctx+'/financial/initVertical?eventId='+eventId+'&horizonName='+selected);
			}else if(qgorbj=="北京"){
				createCombox_2('verticalCombo',ctx+'/financial/initVertical?eventId='+eventId+'&city=BJ&horizonName='+selected);
			}
			
		},
		placeholder:"请选择",
		listeners:{
			render:function(){
				//alert(combobox+"1");
				//alert(grid.getData());
			}
		}
	});
}
/**
 * 创建下拉框
 */
function createCombox_2(id, url){
	combobox = Run.create("ComboBox",{
		id : id,
		url : url,
		width : 120,
		listHeight : 90,
		isMultiple : false,
		editable : false,
		autoLoad : true,
		onSelect : function(combo,record){
			$('.verName').text(record.text);
		},
		placeholder:"请选择",
		listeners:{
			render:function(){
				//alert(combobox+"1");
				//alert(grid.getData());
			}
		}
	});
}
/**
 * 创建下拉框
 */
function createCombox_3(id, url,qgorbj){
	combobox = Run.create("ComboBox",{
		id : id,
		url : url,
		width : 100,
		listHeight : 90,
		isMultiple : false,
		editable : false,
		autoLoad : true,
		onSelect : function(combo,record){
			var selectVal = record.value[0];
			if(selectVal.indexOf("cust_") == 0){
				$('#custSettingChk2').closest("li").removeClass("hide");
			}else{
				$('#custSettingChk2').closest("li").addClass("hide");
			}
			
			$('.typespan em').text(record.text);
			echartPieWin(datavalue,colors);
			
			//根据横向选择对应纵向
			var selected = $("#"+id+" .r-combobox-slt").text();
			if(selected=="年龄"){
				//清除横轴内容 (饼图)
				$.each($(".pieUl .normal"),function(i,item){
					if(i>0 && $(".pieUl .normalLi").length>1){
						$(".pieUl .normal")[1].remove();
					}
				});
				var datavalue=[
					{value:100, name:'0-20'}
				];
				echartPieWin(datavalue,colors);
				$(".pieUl .normal .iniputbg").val("0-20");
				
			}else if(selected=="地域"){
				//清除横轴内容 (饼图)
				$.each($(".pieUl .normal"),function(i,item){
					if(i>0 && $(".pieUl .normal").length>1){
						$(".pieUl .normal")[1].remove();
					}
				});
				if(qgorbj=="全国"){
					var datavalue=[
						{value:100, name:'北京'}
					];
					echartPieWin(datavalue,colors);
					
					$(".pieUl .normal .iniputbg").val("北京");
				}else if(qgorbj=="北京"){
					var datavalue=[
						{value:100, name:'东城区'}
					];
					echartPieWin(datavalue,colors);
					
					$(".pieUl .normal .iniputbg").val("东城区");
				}
				
			}else if(selected=="盈利金额(万)"){
				if(qgorbj=="全国"){
					
					//清除横轴内容
					$.each($(".pieUl .normal"),function(i,item){
						if(i>0 && $(".pieUl .normal").length>1){
							$(".pieUl .normal")[1].remove();
						}
					});
					
					var datavalue=[
						{value:100, name:'0-20'}
					];
					echartPieWin(datavalue,colors);
					$(".pieUl .normal .iniputbg").val("0-20");
					
				}else if(qgorbj=="北京"){
					
					//清除横轴内容
					$.each($(".pieUl .normal"),function(i,item){
						if(i>0 && $(".pieUl .normal").length>1){
							$(".pieUl .normal")[1].remove();
						}
					});
					var datavalue=[
						{value:100, name:'0-20'}
					];
					echartPieWin(datavalue,colors);
					$(".pieUl .normal .iniputbg").val("0-20");
					
				}
				
			}else if(selected=="受损金额(万)"){
				
				if(qgorbj=="全国"){
					
					//清除横轴内容
					$.each($(".pieUl .normal"),function(i,item){
						if(i>0 && $(".pieUl .normal").length>1){
							$(".pieUl .normal")[1].remove();
						}
					});
					var datavalue=[
						{value:100, name:'0-20'}
					];
					echartPieWin(datavalue,colors);
					$(".pieUl .normal .iniputbg").val("0-20");
					
				}else if(qgorbj=="北京"){
					
					//清除横轴内容
					$.each($(".pieUl .normal"),function(i,item){
						if(i>0 && $(".pieUl .normal").length>1){
							$(".pieUl .normal")[1].remove();
						}
					});
					var datavalue=[
						{value:100, name:'0-20'}
					];
					echartPieWin(datavalue,colors);
					$(".pieUl .normal .iniputbg").val("0-20");
					
				}
				
			}else if(selected=="投资金额(万)"){
				
				if(qgorbj=="全国"){
					
					//清除横轴内容
					$.each($(".pieUl .normal"),function(i,item){
						if(i>0 && $(".pieUl .normal").length>1){
							$(".pieUl .normal")[1].remove();
						}
					});
					var datavalue=[
						{value:100, name:'0-20'}
					];
					echartPieWin(datavalue,colors);
					$(".pieUl .normal .iniputbg").val("0-20");
					
				}else if(qgorbj=="北京"){
					
					//清除横轴内容
					$.each($(".pieUl .normal"),function(i,item){
						if(i>0 && $(".pieUl .normal").length>1){
							$(".pieUl .normal")[1].remove();
						}
					});
					var datavalue=[
						{value:100, name:'0-20'}
					];
					echartPieWin(datavalue,colors);
					$(".pieUl .normal .iniputbg").val("0-20");
					
				}
			}else if(selected=="会员等级" && qgorbj !="全国"){
				
				//清除横轴内容
				$.each($(".pieUl .normal"),function(i,item){
					if(i>0 && $(".pieUl .normal").length>1){
						$(".pieUl .normal")[1].remove();
					}
				});
				var datavalue=[
					{value:100, name:'0-20'}
				];
				echartPieWin(datavalue,colors);
				$(".pieUl .normal .iniputbg").val("0-20");
				
			}else if(selected=="下线人数"){
				
				//清除横轴内容
				$.each($(".pieUl .normal"),function(i,item){
					if(i>0 && $(".pieUl .normal").length>1){
						$(".pieUl .normal")[1].remove();
					}
				});
				var datavalue=[
					{value:100, name:'0-20'}
				];
				echartPieWin(datavalue,colors);
				$(".pieUl .normal .iniputbg").val("0-20");
				
			}else{
				//清除横轴内容 (饼图)
				$.each($(".pieUl .normal"),function(i,item){
					if(i>0 && $(".pieUl .normal").length>1){
						$(".pieUl .normal")[1].remove();
					}
				});
				var datavalue=[ {value:100, name:'值1'}];
				echartPieWin(datavalue,colors);
							
				$(".pieUl .normal .iniputbg").val("值1");
			}
			
		},
		placeholder:"请选择",
		listeners:{
			render:function(){
				//alert(combobox+"1");
				//alert(grid.getData());
			}
		}
	});
}

/**
 * 创建下拉框
 */
function createCombox(id, url){
	combobox = Run.create("ComboBox",{
		id : id,
		url : url,
		width : 150,
		listHeight : 200,
		isMultiple : false,
		editable : false,
		autoLoad : true,
		onSelect : function(combo,record){
		},
		placeholder:"请选择",
		listeners:{
			render:function(){
				//alert(combobox+"1");
				//alert(grid.getData());
				if($("#" + id).closest(".specialCombobox").size() !== 0){
					$("#" + id).find(".r-combobox-slider-box").css("top",($("#" + id).offset().top + 22) + "px");
				
				}
			}
		}
	});
}

/**
 * 创建下拉框
 */
function createComboxByData(id, data){
	combobox = Run.create("ComboBox",{
		id : id,
		data : data,
		width : 150,
		listHeight : 200,
		isMultiple : false,
		editable : false,
		autoLoad : true,
		onSelect : function(combo,record){
		},
		placeholder:"请选择",
		listeners:{
			render:function(){
				//alert(combobox+"1");
				//alert(grid.getData());
				if($("#" + id).closest(".specialCombobox").size() !== 0){
					$("#" + id).find(".r-combobox-slider-box").css("top",($("#" + id).offset().top + 22) + "px");
				
				}
			}
		}
	});
}


/**
 * 创建下拉框(动态联动)
 */
function createComboxTrends(id, url,width,eventId){
	combobox = Run.create("ComboBox",{
		id : id,
		url : url,
		width : width,
		listHeight : 90,
		isMultiple : false,
		editable : false,
		autoLoad : true,
		onSelect : function(combo,record){
			if(id == 'cityCom'){ //柱状图
				$('#horizonCombo').html('');
				$('#verticalCombo').html('');
				
				//根据条件选择对应下拉选项
				var selected = $("#"+id +" .r-combobox-slt").text(); //当前选择
				if(selected=="全国"){
					createCombox_1('horizonCombo',ctx+'/financial/initHorizon?eventId='+eventId, "全国", eventId);
					createCombox_2('verticalCombo',ctx+'/financial/initVertical?eventId='+eventId);
				}else if(selected=="北京"){
					createCombox_1('horizonCombo',ctx+'/financial/initHorizon?eventId='+eventId+'&city=BJ', "北京", eventId);
					createCombox_2('verticalCombo',ctx+'/financial/initVertical?eventId='+eventId+'&city=BJ');
				}
			}else{ //饼图
				$('#typeCombo').html('');
				
				var selected = $("#"+id +" .r-combobox-slt").text(); //当前选择
				if(selected=="全国"){
					createCombox_3('typeCombo',ctx+'/res/financial/json/qg_horizon.json',"全国");
				}else if(selected=="北京"){
					createCombox_3('typeCombo',ctx+'/res/financial/json/qg_horizon.json',"北京");
				}
				
				
			}
		},
		placeholder:"请选择",
		listeners:{
			render:function(){
				//alert(combobox+"1");
				//alert(grid.getData());
			}
		}
	});
}

//获取金融事件列表
function getFinancialEventList(){
	//获取事件列表
	$.ajax({
		type:"post",
		//url:$("#ctxValue").val()+"/financial/getFinancialEventList",
		url:$("#ctxValue").val()+"/financial/getFinancialEventListByIds",//带用户权限
		success:function(data){
			if(data.status==0){
				var financialEventList = data.data;
				var datalength = financialEventList.length;
				
				//datalength=0;
				if(datalength==0){//系统初始化时第一次进入页面，还没有事件
					$(".navUl").addClass("first");//左侧事件列表
					$("#firstLogin").addClass("firstLogin");//底部第一次进入样式遮罩
					$($(".rightMain.clearfix")[0]).addClass("hide");//右边数据展示部分隐藏
					$(".phoneNum2").addClass("hide");
					$(".phoneNum3").addClass("hide");
					$(".myCounts").addClass("hide");//右侧事件数据统计隐藏
					return 0; //直接返回，不往下走
				}else{
					$(".navUl").removeClass("first");
					$("#firstLogin").removeClass("firstLogin");
					$($(".rightMain.clearfix")[0]).removeClass("hide");
					$(".phoneNum2").removeClass("hide");
					$(".phoneNum3").removeClass("hide");
					$('.nodataBig').addClass('hide'); //关闭无数据大图片
					$(".myCounts").removeClass("hide");//右侧事件数据统计隐藏
				}
				
				var eventHtml="";
				
				$.each(financialEventList,function(i,item){
					eventHtml+='<div class="navli relative" id="'+ item.eventId +'" name="'+ item.eventName +'">'
					+'<div class="editedBox clearfix" id="'+ item.eventId +'" name="'+ item.eventName +'">'
						+'<a href="javascript:;" class="navA left">'+item.eventName+'</a>'
						+'<a href="javascript:;" class="delBtn right"></a>'
						+'<a href="javascript:;" class="setting right"></a>'
						+'<input type="file" class="hide fileInput"/>'
						+'<a href="javascript:;" class="import right" title="导入本地数据"></a>'
						+'<a href="javascript:;" class="edit right"></a>'
					+'</div>'
					+'<div class="editBox clearfix hide" >'
						+'<input type="text" class="editInput" placeholder="请输入事件名"/>'
						+'<a href="javascript:;" class="delBtn right"></a>'
						+'<a href="javascript:;" class="yesBtn right"></a>'
					+'</div>'
				  +'</div>';
					
					//判断事件下是否有文件，没有就隐藏删除按钮
					$.ajax({
						type:"post",
						url:$("#ctxValue").val()+"/financial/getFinancialEventFileListByEventId",
						data:{"eventId":item.eventId},
						success:function(data){
							if(data.status==0){
								if(data.data&&data.data.length>0){
									//隐藏删除按钮
//									$("#"+item.eventId+" .editedBox .delBtn").addClass("hide");
								}
							}
						}
					});
					
				});
				
				$("#event_Count").html("("+datalength+")");
				$(".navUl").append(eventHtml);
				
				if(financialEventList[0].eventId){
					getFirstFinancialTableData(financialEventList[0].eventId);//加载第一个事件的数据
				}
			}else{//错误、失败
				console.log(data.message);
			}
		}
	});
}
//加载第一个事件的数据
function getFirstFinancialTableData(){怎么
	var firstEventId = $(".navUl .navli").first().attr("id");
	$("#eventNamerightTop").text($(".navUl .navli").first().attr("name")); //右侧展示图表数据头部
	$("#eventNamerightTop").attr("name",firstEventId); //本身有id只好将事件id放到name属性
	//根据事件id获取事件分析数据
	getFinancialTableDataByEventId(firstEventId);
}

var reqArray = [];//存放ajax请求对象

//根据事件id加载事件的数据
function getFinancialTableDataByEventId(eventId, IDIsEffect, phoneIsEffect){
	if(IDIsEffect == undefined || IDIsEffect == null || IDIsEffect == ''){
		IDIsEffect = "0";
	}
	if(phoneIsEffect == undefined || phoneIsEffect == null || phoneIsEffect == ''){
		phoneIsEffect = "0";
	}
	
	$.each(reqArray,function(i,item){ //取消之前未完成的ajax请求
		item.abort(); 
	});
	reqArray.length=0; //清除ajax请求对象数组内容
	obj_arrays.length=0;//清除之前事件的图表数据
	
	//清除之前自定义的图表
	for(var pie=0;pie<pieadd;pie++){ //清除自定义饼图
		$('#eachartpie_add'+pie).parents(".relative.liL").remove();
	}
	pieadd = 0;
	for(var bar=0;bar<baradd;bar++){ //清除自定义柱状图
		$('#eachartbar_add'+bar).parents(".relative.liL").remove();
	}
	baradd = 0;
	
	var req_eventId = $.ajax({
		type:"post",
		url:$("#ctxValue").val()+"/financialData/getDataShowFromPerResultData",
		data:{"eventId":eventId,"IDIsEffect":IDIsEffect,"phoneIsEffect":phoneIsEffect},
		success:function(data){
			if(data.status==2){
				$($(".rightMain.clearfix")[0]).addClass("hide");//右边数据展示部分隐藏
				$(".phoneNum2").addClass("hide");
				$(".phoneNum3").addClass("hide");
				$('.nodataBig').removeClass('hide'); //打开无数据大图片
				$(".myCounts").addClass("hide");//右侧事件数据统计隐藏
				return; //直接返回，不往下走
			}else if(data.status==0){
				$($(".rightMain.clearfix")[0]).removeClass("hide");//右边数据展示部分去除隐藏
				$(".phoneNum2").removeClass("hide");
				$(".phoneNum3").removeClass("hide");
				$('.nodataBig').addClass('hide'); //关闭无数据大图片
				$(".myCounts").removeClass("hide");//右侧事件数据统计去除隐藏
				
				var isEmpty = true;
				var defaultData_x;
				var defaultData_y;
				
				//bar1.全国31个省区市人数分布统计(柱状图)
				try {
					$.each(data.valueListBar1,function(i,item){
						if (item != 0){
							isEmpty = false;
						}
					});
					
					$('#total_bar1').remove();
					if(isEmpty){
						delNoDataEchart($('#eachartbar_1').parent());
					}else{
						$('#eachartbar_1').parent().parents('li').show();
						
						defaultData_x = ["北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆"];
						defaultData_y = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
						//先清空图表数据
						$("#eachartbar_1").empty(); 
						//去掉前面显示的无数据小图
						$($('#eachartbar_1').parent()).removeClass("nodata-small");
						//打开loading
						var _html = '<div class="loaddingBox"><img src="res/images/loading.gif" class="loaddingImg"><div>数据加载中...</div></div>';
						$('#eachartbar_1').parent().append(_html);
						
						echartBar(1,{name:'全国31个省区市人数分布统计',axisx:'省份',axisy:'人数',legend:$.extend(defaultData_x,data.nameListBar1),datasource:$.extend(defaultData_y,data.valueListBar1)}); //显示后台数据
						
						//关闭loading
						$('#eachartbar_1').parent().find('.loaddingBox').remove();
						$('#eachartbar_1').parent().find('.shadow').remove();
						
						//在柱状图上增加总数统计
						var total_bar1 = 0;
						$.each(data.valueListBar1,function(i,item){
							if (item != 0){
								total_bar1 += parseInt(item);
							}
						});
						var totalStr = parseInt(total_bar1).toLocaleString(); //千位分隔符
						var totalHtml = '<li id="total_bar1" class="left" style="width: 99%;height: 25px;background-color: #fff;padding-left: 0px;">'
									  + '  <div class="left" style="width: 97%;height: 22px;margin-top: 1px;margin-bottom: 11px;margin-left: 5px;line-height: 22px;border: 1px solid #555;padding: 0 10px;">'
									  + '    <h4 class="left" style="color: green;" id="IDAndPhoneValidCount">全国31个省区市人数合计：'+totalStr+'</h4>'
									  + '  </div>'
									  + '</li>';
						$('#eachartbar_1').parent().parents('li').before(totalHtml);
						
						//身份证、手机号有效无效数据统计
						/*$('#IDPhoneTotal').remove();
						var IDValidCount = parseInt(data.IDValidCount).toLocaleString();
						var IDInvalidCount = parseInt(data.IDInvalidCount).toLocaleString();
						var phoneValidCount = parseInt(data.phoneValidCount).toLocaleString();
						var phoneInvalidCount = parseInt(data.phoneInvalidCount).toLocaleString();
						var IDPhoneTotalHtml = '<li id="IDPhoneTotal" class="left" style="width: 99%;height: 25px;background-color: #fff;padding-left: 0px;">'
							+ '  <div class="left" style="width: 97%;height: 22px;margin-top: 1px;margin-bottom: 11px;margin-left: 5px;line-height: 22px;border: 1px solid #555;padding: 0 10px;">'
							+ '    <h4 class="left" style="color: green;" id="IDAndPhoneValidCount">身份证有效数据条数：'+IDValidCount+'&nbsp;&nbsp;&nbsp;&nbsp;</h4>'
							+ '    <h4 class="left" style="color: green;" id="IDAndPhoneValidCount">身份证无效数据条数：'+IDInvalidCount+'&nbsp;&nbsp;&nbsp;&nbsp;</h4>'
							+ '    <h4 class="left" style="color: green;" id="IDAndPhoneValidCount">手机号有效数据条数：'+phoneValidCount+'&nbsp;&nbsp;&nbsp;&nbsp;</h4>'
							+ '    <h4 class="left" style="color: green;" id="IDAndPhoneValidCount">手机号无效数据条数：'+phoneInvalidCount+'</h4>'
							+ '  </div>'
							+ '</li>';
						$("#sxSearch").parent().parent().parent().parent().before(IDPhoneTotalHtml);*/
						
					}
				} catch (e) {
					console.log("异常——bar1.全国31个省区市人数分布统计(柱状图)");
					echartBar(1,'',colors);
				}
				
				//pie1.男女人数及占比统计(饼图)
				try {
					isEmpty = true;
					$.each(data.valueListPie1,function(i,item){
						if (item != 0){
							isEmpty = false;
						}
					});
					if(isEmpty){
						delNoDataEchart($('#eachartpie_1').parent());
					}else{
						$('#eachartpie_1').parent().parents('li').show();
						
						defaultData_x = [ '男', '女' ];
						defaultData_y = [
						                 {value:0, name:'男'},
						                 {value:0, name:'女'}
						                 ];
						//先清空图表数据
						$("#eachartpie_1").empty(); 
						//去掉前面显示的无数据小图
						$($('#eachartpie_1').parent()).removeClass("nodata-small");
						//打开loading
						var _html = '<div class="loaddingBox"><img src="res/images/loading.gif" class="loaddingImg"><div>数据加载中...</div></div>';
						$('#eachartpie_1').parent().append(_html);
						
						echartPie(1,{name:'男女人数及占比统计',axisx:'年龄',legend:$.extend(defaultData_x,data.nameListPie1),datasource:$.extend(defaultData_y,data.valueListPie1)},colors); // 显示后台数据
						
						//关闭loading
						$('#eachartpie_1').parent().find('.loaddingBox').remove();
						$('#eachartpie_1').parent().find('.shadow').remove();
					}
				} catch (e) {
					console.log("异常——pie1.男女人数及占比统计(饼图)");
					echartPie(1,'',colors);
				}
				
				//pie2.全国投资者年龄结构统计(饼图)
				try {
					isEmpty = true;
					$.each(data.valueListPie2,function(i,item){
						if (item != 0){
							isEmpty = false;
						}
					});
					if(isEmpty){
						delNoDataEchart($('#eachartpie_2').parent());
					}else{
						$('#eachartpie_2').parent().parents('li').show();
						
						defaultData_x=['20岁以下','20-29岁','30-39岁','40-49岁','50-60岁','60岁以上'];
						defaultData_y=[
						               {value:0, name:'20岁以下'},
						               {value:0, name:'20-29岁'},
						               {value:0, name:'30-39岁'},
						               {value:0, name:'40-49岁'},
						               {value:0, name:'50-60岁'},
						               {value:0, name:'60岁以上'}];
						//先清空图表数据
						$("#eachartpie_2").empty();
						//去掉前面显示的无数据小图
						$($('#eachartpie_2').parent()).removeClass("nodata-small");
						//打开loading
						var _html = '<div class="loaddingBox"><img src="res/images/loading.gif" class="loaddingImg"><div>数据加载中...</div></div>';
						$('#eachartpie_2').parent().append(_html);
						
						echartPie(2,{name:'全国投资者年龄结构统计',axisx:'年龄',legend:$.extend(defaultData_x,data.nameListPie2),datasource:$.extend(defaultData_y,data.valueListPie2)},colors); // 显示后台数据
						
						//关闭loading
						$('#eachartpie_2').parent().find('.loaddingBox').remove();
						$('#eachartpie_2').parent().find('.shadow').remove();
					}
				} catch (e) {
					console.log("异常——pie2.全国投资者年龄结构统计(饼图)");
					echartPie(2,'',colors);
				}
				
				//pie3.投资者涉京人员年龄结构统计(饼图)
				try {
					isEmpty = true;
					$.each(data.valueListPie3,function(i,item){
						if (item != 0){
							isEmpty = false;
						}
					});
					if(isEmpty){
						delNoDataEchart($('#eachartpie_3').parent());
					}else{
						$('#eachartpie_3').parent().parents('li').show();
						
						var defaultData_x=['20岁以下','20-29岁','30-39岁','40-49岁','50-60岁','60岁以上'];
						var defaultData_y=[
						                   {value:0, name:'20岁以下'},
						                   {value:0, name:'20-29岁'},
						                   {value:0, name:'30-39岁'},
						                   {value:0, name:'40-49岁'},
						                   {value:0, name:'50-60岁'},
						                   {value:0, name:'60岁以上'}];
						//先清空图表数据
						$("#eachartpie_3").empty();
						//去掉前面显示的无数据小图
						$($('#eachartpie_3').parent()).removeClass("nodata-small");
						//打开loading
						var _html = '<div class="loaddingBox"><img src="res/images/loading.gif" class="loaddingImg"><div>数据加载中...</div></div>';
						$('#eachartpie_3').parent().append(_html);
						
						echartPie(3,{name:'投资者涉京人员年龄结构统计',axisx:'年龄',legend:$.extend(defaultData_x,data.nameListPie3),datasource:$.extend(defaultData_y,data.valueListPie3)},colors); // 显示后台数据
						
						//关闭loading
						$('#eachartpie_3').parent().find('.loaddingBox').remove();
						$('#eachartpie_3').parent().find('.shadow').remove();
					}
				} catch (e) {
					console.log("异常——pie3.投资者涉京人员年龄结构统计(饼图)");
					echartPie(3,'',colors);
				}
				
				//bar2.涉京人员各行政区人数分布统计(柱状图)
				try {
					isEmpty = true;
					$.each(data.valueListBar2,function(i,item){
						if (item != 0){
							isEmpty = false;
						}
					});
					
					$('#total_bar2').remove();
					if(isEmpty){
						delNoDataEchart($('#eachartbar_2').parent());
					}else{
						$('#eachartbar_2').parent().parents('li').show();
						
						defaultData_x = ["东城区", "西城区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云县", "延庆县"];
						defaultData_y = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
						$("#eachartbar_2").empty();//先清空图表数据
						$($('#eachartbar_2').parent()).removeClass("nodata-small");//去掉前面显示的无数据小图
						//打开loading
						var _html = '<div class="loaddingBox"><img src="res/images/loading.gif" class="loaddingImg"><div>数据加载中...</div></div>';
						$('#eachartbar_2').parent().append(_html);
						
						echartBar(2,{name:'涉京人员各行政区人数分布统计',axisx:'行政区',axisy:'人数',legend:$.extend(defaultData_x,data.nameListBar2),datasource:$.extend(defaultData_y,data.valueListBar2)}); //显示后台数据
						
						//关闭loading
						$('#eachartbar_2').parent().find('.loaddingBox').remove();
						$('#eachartbar_2').parent().find('.shadow').remove();
						
						//在柱状图上增加总数统计
						var total_bar2 = 0;
						$.each(data.valueListBar2,function(i,item){
							if (item != 0){
								total_bar2 += parseInt(item);
							}
						});
						var totalStr = parseInt(total_bar2).toLocaleString(); //千位分隔符
						var totalHtml = '<li id="total_bar2" class="left" style="width: 99%;height: 25px;background-color: #fff;padding-left: 0px;">'
									  + '  <div class="left" style="width: 97%;height: 22px;margin-top: 1px;margin-bottom: 11px;margin-left: 5px;line-height: 22px;border: 1px solid #555;padding: 0 10px;">'
									  + '    <h4 class="left" style="color: green;" id="IDAndPhoneValidCount">涉京人员各行政区人数合计：'+totalStr+'</h4>'
									  + '  </div>'
									  + '</li>';
						$('#eachartbar_2').parent().parents('li').before(totalHtml);
					}
				} catch (e) {
					console.log("异常——bar2.涉京人员各行政区人数分布统计(柱状图)");
					echartBar(2,'',colors);
				}
				
				//bar3.涉京外地人员各省区市人数分布统计(柱状图)
				try {
					isEmpty = true;
					$.each(data.valueListBar3,function(i,item){
						if (item != 0){
							isEmpty = false;
						}
					});
					
					$('#total_bar3').remove();
					if(isEmpty){
						delNoDataEchart($('#eachartbar_3').parent());
					}else{
						$('#eachartbar_3').parent().parents('li').show();
						
						defaultData_x = ["北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆"];
						defaultData_y = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
						//先清空图表数据
						$("#eachartbar_3").empty(); 
						//去掉前面显示的无数据小图
						$($('#eachartbar_3').parent()).removeClass("nodata-small");
						//打开loading
						var _html = '<div class="loaddingBox"><img src="res/images/loading.gif" class="loaddingImg"><div>数据加载中...</div></div>';
						$('#eachartbar_3').parent().append(_html);
						
						echartBar(3,{name:'涉京外地人员各省区市人数分布统计',axisx:'省份',axisy:'人数',legend:$.extend(defaultData_x,data.nameListBar3),datasource:$.extend(defaultData_y,data.valueListBar3)}); //显示后台数据
						
						//关闭loading
						$('#eachartbar_3').parent().find('.loaddingBox').remove();
						$('#eachartbar_3').parent().find('.shadow').remove();
						
						//在柱状图上增加总数统计
						var total_bar3 = 0;
						$.each(data.valueListBar3,function(i,item){
							if (item != 0){
								total_bar3 += parseInt(item);
							}
						});
						var totalStr = parseInt(total_bar3).toLocaleString(); //千位分隔符
						var totalHtml = '<li id="total_bar3" class="left" style="width: 99%;height: 46px;background-color: #fff;padding-left: 0px;">'
									  + '  <div class="left" style="width: 97%;height: 42px;margin-top: 1px;margin-bottom: 11px;margin-left: 5px;line-height: 22px;border: 1px solid #555;padding: 0 10px;">'
									  + '    <h4 class="left" style="color: green;" id="IDAndPhoneValidCount">涉京外地人员各省区市人数合计：'+totalStr+'</h4><br>'
									  + '    <h4 class="left" style="color: green;" id="IDAndPhoneValidCount">即：身份证有效，归属地为外地（非北京）；</h4>'
									  + '    <h4 class="left" style="color: green;" id="IDAndPhoneValidCount">手机号有效，归属地为北京</h4>'
									  + '  </div>'
									  + '</li>';
						$('#eachartbar_3').parent().parents('li').before(totalHtml);
					}
				} catch (e) {
					console.log("异常——bar3.涉京外地人员各省区市人数分布统计(柱状图)");
					echartBar(3,'',colors);
				}
				
				//count1.涉京人员按手机归属地统计人数
				//count2.涉京人员按身份证统计人数
				try {
					$(".phoneNum2").removeClass("hide");
					$("#bjsjcount").text(data.valueCount1);
					$("#bjsfzcount").text(data.valueCount2);
					
				} catch (e) {
					console.log("异常——count1&count2.涉京人员统计");
				}
				//导入数据总条数、有效数据总条数、无效数据总条数
				try {
					$(".phoneNum2").removeClass("hide");
					$("#impCount").text(0);
					if (data.impCount != '0') {
						//impCount.导入数据总条数
						var total = parseInt(data.impCount);
						var totalStr = parseInt(total).toLocaleString(); //千位分隔符
						$("#impCount").text(totalStr);
					}
					$("#validCount").text(0);
					if (data.validCount != '0') {
						//validCount.有效数据总条数
						var total = parseInt(data.validCount);
						var totalStr = parseInt(total).toLocaleString(); //千位分隔符
						$("#validCount").text(totalStr);
					}
					$("#invalidCount").text(0);
					if (data.invalidCount != '0') {
						//invalidCount.无效数据总条数
						var total = parseInt(data.invalidCount);
						var totalStr = parseInt(total).toLocaleString(); //千位分隔符
						$("#invalidCount").text(totalStr);
					}
					
					$(".phoneNum3").removeClass("hide");
					$("#IDValidCount").text(0);
					if (data.IDValidCount != '0') {
						//IDValidCount.身份证有效数据条数
						var total = parseInt(data.IDValidCount);
						var totalStr = parseInt(total).toLocaleString(); //千位分隔符
						$("#IDValidCount").text(totalStr);
					}
					$("#IDInvalidCount").text(0);
					if (data.IDInvalidCount != '0') {
						//IDInvalidCount.身份证无效数据条数
						var total = parseInt(data.IDInvalidCount);
						var totalStr = parseInt(total).toLocaleString(); //千位分隔符
						$("#IDInvalidCount").text(totalStr);
					}
					$("#phoneValidCount").text(0);
					if (data.phoneValidCount != '0') {
						//phoneValidCount.手机号有效数据条数
						var total = parseInt(data.phoneValidCount);
						var totalStr = parseInt(total).toLocaleString(); //千位分隔符
						$("#phoneValidCount").text(totalStr);
					}
					$("#phoneInvalidCount").text(0);
					if (data.phoneInvalidCount != '0') {
						//phoneInvalidCount.手机号无效数据条数
						var total = parseInt(data.phoneInvalidCount);
						var totalStr = parseInt(total).toLocaleString(); //千位分隔符
						$("#phoneInvalidCount").text(totalStr);
					}
					
				} catch (e) {
					console.log("异常——6.涉京人员按手机归属地统计人数");
				}
			}else{
				echartBar(1,'',colors);
			}
		}
	});
	reqArray.push(req_eventId);
}

/**
 * 不需要点击确认按钮，直接隐藏无数据的图表块
 * @param elem
 */
function delNoDataEchart(elem){
	//删除obj_arrays中存的该表数据
	var delId = $(elem.parents('li')).find(".eachartSize")[0].id;
	$.each(obj_arrays,function(i,item){
		if((obj_arrays.length != i) && obj_arrays[i].chart.bar){
			if(delId == obj_arrays[i].chart.bar.myChart.dom.id){
				obj_arrays.splice(i,1);
			}
		}else if((obj_arrays.length != i) && obj_arrays[i].chart.pie){
			if(delId == obj_arrays[i].chart.pie.myChart.dom.id){
				obj_arrays.splice(i,1);
			}
		}
	});
	
	elem.parents('li').hide();
}
/**
 *点击身份证无效时，隐藏后面的按钮
 */
function idIsUnableSet(){
//	$('#phoneIsUnableOrAble').addClass('hide');
//	$('#phoneIsUnable').addClass('hide');
	$('#eachartpie_13').addClass('hide');
	$('#eachartpie_12').addClass('hide');
	$('#eachartpie_11').addClass('hide');
	
}
function idIsUnableSetsjh(){
	$('#phoneIsUnableOrAble').addClass('hide');
	$('#phoneIsUnable').addClass('hide');
	$('input[name="sjh"][value="0"]').attr("checked",true); 
}
function idIsAbleSet(){
	$('#phoneIsUnableOrAble').removeClass('hide');
	$('#phoneIsUnable').removeClass('hide');
	$('#eachartpie_13').removeClass('hide');
	$('#eachartpie_12').removeClass('hide');
	$('#eachartpie_11').removeClass('hide');
}
function idIsAbleSet1(){
	$('#phoneIsUnableOrAble').removeClass('hide');
	$('#phoneIsUnable').removeClass('hide');
}