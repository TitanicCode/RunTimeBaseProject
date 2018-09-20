/**
 * @descript
 * 		初始化
 */
var obj_arrays = [];
var ctx = $('#ctxValue').val(); //获取根路径
var paramsMap={};//查询条件参数的map集合
var colModelArray;//表头集合
//var comboxResult = '';//数值类型的查询条件集合
var comboxResultModel;//数值类型的查询条件集合-json

$(function() {
	// 绑定通用方法
	initBindMethod();
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
	var colModel = JSON.parse($("#colModelJSON").val());
	colModelArray = colModel["colModelArray"];
	showTable(null);
	
	$("#search").off("click").on("click",function(){ //点击查询
		$("#t1").html("");//清除原来内容
		if(colModelArray == null || colModelArray == ""){
			var colModel = JSON.parse($("#colModelJSON").val());
			colModelArray = colModel["colModelArray"];
		}
		showTable("search");
	});
	
	$("#export").off("click").on("click",function(){ //点击导出
		//模拟表单提交
		var url= ctx+"/financial/exportExcelData";
		var form = $("<form></form>").attr("action",url).attr("method","post");
		form.append($("<input></input>").attr("type","hidden").attr("name","paramsString").attr("value",JSON.stringify(paramsMap)));
		form.appendTo("body").submit().remove();
	});
	
	$("#counts").off("click").on("click",function(){ //点击自定义统计
		//自定义统计项
		countsSetting($("#eventId").val().trim());
	});
	
	//回车事件
	document.onkeydown = function(e){
	    if(!e) e = window.event;//火狐中是 window.event
	    if((e.keyCode || e.which) == 13){
	        document.getElementById("search").click();
	    }
	}
	
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
	W_height_item = W_height < H_body ? H_body : W_height;
	var h_scroll = w_width < 1400 ? 17 : 0;
	if(W_height < H_body){
		$('.leftNav').height(W_height_item+8);
	}else{
		$('.leftNav').height(W_height_item);
	}
	$('#staticTable').height(W_height_item-285);
}

/**
 * @descript
 * 		绑定通用方法
 */
function initBindMethod(){
	$('.navUl').find('a').off().on('click', function(){
		if(!$(this).hasClass('slt')){
			var page = $(this).attr('page');
			$('.btn_exportlist').removeClass('slt'); 
			$('.navUl').find('a').removeClass('slt');
			$(this).addClass('slt');
			// 动态加载页面
			ajaxHtml(page);
		}
	});
}
	/**
	 * @descript
	 * 		加载表格
	 */
	function showTable(obj) {
		paramsMap={};
		paramsMap["eventId"] = $("#eventId").val().trim();
		$('ul input[type="text"]').each(function() {
			if($(this).val().trim() != null && $(this).val().trim() != '') {
				paramsMap[$(this).attr('id')] = $(this).val().trim();
			}
		})
		$('ul input[type="radio"]').each(function() {
			paramsMap[$(this).attr('name')] = $('input[name="'+$(this).attr('name')+'"]:checked').val();
		})
		$('ul input[type="hidden"]').each(function() {
			if($(this).val().trim() != null && $(this).val().trim() != '') {
				paramsMap[$(this).attr('id')] = $(this).val().trim();
			}
		})
		//加载知识库表格
		var grid = obj_arrays[obj_arrays.length] = Run.create("Grid", {
			id : "t1", //调用表格组件需要的ID
			url : ctx+"/financial/getExcelDataList", //调用表格组件的JSON路径
			query : paramsMap, //调用表格组件传入的参数
			isMultiple : false, //配置表格组件是否需要复选框
			cache:true,
			autoIncrement : true, //配置表格组件是否有自增序号
			alignWay : "center", //配置表格组件对齐方式
			dragable : true, //配置表格是否可拖拽
			colHover : true, //配置表格组件是否有鼠标经过行效果
			zebra : true, //配置表格组件是否有隔行换色效果
			cellEmpty : "-", //当个单元格内容检索为undefined时使用临时替代字符
			usepage : {//配置表格组件分页
				type : 2,
				position : "bottom",
				align : "center",
				pageGoAble : true,
				pageSizeAble : true,
				pageDescription : false
			},
			dataSuccess : function() {
				$('#showGridTotal').html(this.getTotal());
				if(this.rawData!=null && this.rawData.hejiTotal!=null && this.rawData.hejiTotal!=''){
					$('#hejiTotal').parent().remove();
					var hejiTotalHtml = '<span class="right title">统计结果合计（<em id="hejiTotal">'+this.rawData.hejiTotal+'</em>）</span>';
					$('#showGridTotal').parent().parent().append(hejiTotalHtml);
				}
				//数值字段查询输入框，修改为区间值输入
				if(obj != "search"){
					$('ul input[type="text"]').each(function() {
						if(columnIsNum($(this).attr('id'))) {
							var item_input_checkbox = $(this).parent().find('input[type="checkbox"]');
							
							var item = item_input_checkbox.prev();
							var item_span = item.prev();
							
							var chkVal = item.attr('id');
							var chkDisplay = item.prev().text().trim().replace("：","");
							if (comboxResultModel == undefined || comboxResultModel["result"] == '') {
								var str1 = '{"chkVal":"'+chkVal+'","chkDisplay":"'+chkDisplay+'","selected":'+true+'}';
								comboxResultModel = StringOfJSON(str1, comboxResultModel, "result", "add");
							} else {
								var str2 = '{"chkVal":"'+chkVal+'","chkDisplay":"'+chkDisplay+'"}';
								comboxResultModel = StringOfJSON(str2, comboxResultModel, "result", "add");
							}
							
							var html = '<input type="text" style="width: 40px;" class="input_default left" id="'+chkVal+'_1"> ' 
							+ ' <span class="sep left">-</span>                                             '
							+ ' <input type="text" style="width: 40px;" class="input_default left" id="'+chkVal+'_2"> ';
							item.remove();
							item_span.after(html);
							
							item_input_checkbox.attr("checked","checked");
						}
					});
				}
			},
			colModel : colModelArray,//获取动态表中的所有字段
			listeners : {
				render : function() {
				},
				reloadGrid : function() {
				}
			}
		});
	}

//先判断是否为数值，再判断该数值是否为金额金钱数（根据是否带小数点.判断）
function columnIsNum(obj){
	var flag = true;
	for (var int = 0; int < Run.get('t1').getData().length; int++) {
		var rowData = Run.get('t1').getData()[int]
		$.each(rowData, function(name, value){
			var iname = name;
			if(iname == obj) {
				var ivalue = parseInt(value);
				//不是邮箱，且必须含有小数点；
				//例如："101".indexOf(".")=-1; "10.1".indexOf(".")=2
				var index1 = (value+"").indexOf("@");
				var index2 = (value+"").indexOf(".");
				if(!isNaN(ivalue) && index1 == -1 && index2 != -1) {
//					console.log(ivalue+"是数字");
					flag = true;
				}else {
//					console.log(ivalue+"不是数字");
					flag = false;
					return flag;
				}
			}
		});
	}
	return flag;
}

//更多查询条件;隐藏第15个以上的input输入框
function moreSearch(){
	$(".liDisplay").each(function() {
		if ($(this).hasClass("hide")) {
			$(this).removeClass("hide");
		} else {
			$(this).addClass("hide");
		}
    });
}

//自定义统计项
function countsSetting(eventId){
	$('#popCounts').remove();
	var popCountsHtml = ''
		+ ' <div id="popCounts" class="w582 special">                                                                                    '
		+ ' 	<div class="r-window" style="visibility: visible; width: 582px; height: 285px; left: 420.5px; top: 30%; opacity: 1;"> '
		+ ' 		<div class="r-window-main r-window-radius" style="width:582px;">                                                     '
		+ ' 			<div class="r-window-title r-window-radius clearfix">                                                            '
		+ ' 				<span class="left r-window-title-txt ">设置自定义统计项</span>                                               '
		+ ' 				<div class="right r-window-title-oplist">                                                                    '
		+ ' 					<a href="#" class="left r-window-title-close" title="关闭">                                              '
		+ ' 						<span></span><em></em>                                                                               '
		+ ' 					</a>                                                                                                     '
		+ ' 				</div>                                                                                                       '
		+ ' 			</div>                                                                                                           '
		+ ' 			<div style="height: 213px; overflow: auto; background-color: #f5f5f5; padding: 0px 4px 0px 4px;">                                                                '
		+ ' 				<div class="popCon specialCombobox">                                                         '
		+ ' 				        <label style="float: left; width: 99%; margin-left: 5px; margin-top: 4px;">统计结果计算公式 = </label>                       '
		+ ' 				        <span id="formula" style="float: left; margin-left: 72px; margin-top: 4px;"></span>                       '
		+ ' 				        <label style="float: left; width: 99%; margin-left: 5px; margin-top: 4px;">-----------------------------------------------------------------------------------------------------------------</label> '
		+ ' 				</div>                                                                                                       '
		+ ' 				<div class="popCon specialCombobox" id="popSetCase">                                                         '
		+ ' 				        <label style="float: left; margin-left: 5px; margin-top: 4px;">统计结果 = </label>                       '
		+ ' 				        <div class="left" id="popCombloss_1"></div>                                                          '
		+ ' 				        <div class="left" id="popComblossSigns_1"></div>                                                          '
		+ ' 				        <div class="left" id="popCombloss_2"></div>                                                          '
		+ ' 				</div>                                                                                                       '
		+ ' 			</div>                                                                                                           '
		+ ' 			<div style="padding: 8px 0px 8px 0px; text-align: center; background-color: #3e3e3e;">                                                                                '
		+ ' 				<a href="javascript:void(0)" class="r-window-button btn_save" id="popCounts_btn0">新增</a>                   '
		+ ' 				<a href="javascript:void(0)" class="r-window-button btn_save" id="popCounts_btn1">确定</a>                   '
		+ ' 				<a href="javascript:void(0)" class="r-window-button btn_cancel" id="popCounts_btn2">取消</a>                 '
		+ ' 			</div>                                                                                                           '
		+ ' 		</div>                                                                                                               '
		+ ' 	</div>                                                                                                                   '
		+ ' </div>                                                                                                                       '
		+ '';
	$('body').append(popCountsHtml);
	//加载下拉框
	if (comboxResultModel != undefined && comboxResultModel["result"] != '') {
		createComboxByData('popCombloss_1', comboxResultModel);
		createComboxByData('popComblossSigns_1', {"result":[{"chkVal":'+',"chkDisplay":"+","selected":true},{"chkVal":'-',"chkDisplay":"-"}]});
		createComboxByData('popCombloss_2', comboxResultModel);
	}
	//显示公式
	toFormula();
	//新增
	$("#popCounts_btn0").off("click").on("click",function(){
		if($("#popSetCase input[type=hidden]").eq(-1).attr("name")!=undefined && $("#popSetCase input[type=hidden]").eq(-1).attr("name")!=null) {
			var v1 = parseInt($("#popSetCase input[type=hidden]").eq(-1).attr("name").split("_")[1]);
			var v2 = parseInt($("#popSetCase input[type=hidden]").eq(-2).attr("name").split("_")[1]);
			var id1 = "popCombloss_"+(v1+1);
			var id2 = "popComblossSigns_"+(v2+1);
			var html = ''
				+ ' <div class="left" id="'+id2+'"></div> '
				+ ' <div class="left" id="'+id1+'"></div> '
				+ '';
			$("#popSetCase").append(html);
			createComboxByData(id1, comboxResultModel);
			createComboxByData(id2, {"result":[{"chkVal":'+',"chkDisplay":"+","selected":true},{"chkVal":'-',"chkDisplay":"-"}]});
			//显示公式
			toFormula();
		} else {
			alertMsg("无数值项，请先设置数值项！");
		}
	});
	//确定提交
	$("#popCounts_btn1").off("click").on("click",function(){
		//1.获得统计结果的算式
		var formulaText = "";
		$("#popSetCase input[type=hidden]").each(function() {
			var id = $(this).attr("name");
			formulaText += $('#'+id+' input[type=hidden]').val();
	    });
		//2.将算式提交查询
		$("#t1").html("");//清除原来内容
		var ca = JSON.stringify(colModelArray);
		if(ca.indexOf('{"display":"统计结果","name":"heji"}')==-1) {
			colModelArray = JSON.parse('[{"display":"统计结果","name":"heji"},'+JSON.stringify(colModelArray).split("[")[1]);
		}
		$('#heji').remove();
		var html = '<input type="hidden" id="heji" value="'+formulaText+'">'; 
//		$("#phone_is_effect").after(html);
		$('ul li').eq(0).before(html);
		
		showTable("search");
//		$('#popCounts').remove();
		
	});
	//取消
	$("#popCounts_btn2").off("click").on("click",function(){
		$('#popCounts').remove();
	});
	//关闭
	$(".r-window-title-close").off("click").on("click",function(){
		$('#popCounts').remove();
	});
	
}

//打印公式到页面
function toFormula(){
	var formulaText = "";
	$("#popSetCase input[type=hidden]").each(function() {
		var id = $(this).attr("name");
		formulaText += $('#'+id+' input[type=hidden]').prev().find(".r-combobox-slt").find("span").text();
//		$("#formula").text($('#popCombloss_1 input[type=hidden]').prev().find(".r-combobox-slt").find("span").text()+$('#popCombloss_signs input[type=hidden]').val()+$('#popCombloss_2 input[type=hidden]').prev().find(".r-combobox-slt").find("span").text());
    });
	$("#formula").text(formulaText);
}

/**
 * 创建下拉框
 */
function createComboxByData(id, data){
	combobox = Run.create("ComboBox",{
		id : id,
		data : data,
		width : 120,
		listHeight : 90,
		isMultiple : false,
		editable : false,
		autoLoad : true,
		onSelect : function(combo,record){
			//显示公式
			toFormula();
		},
		placeholder:"请选择",
		listeners:{
			render:function(){
				$('#'+id+' .r-combobox-slider-box').jScrollPane({'autoReinitialise':true});
			}
		}
	});
}

//点击勾选框，将查询项变更为数值项
function toNum(obj){
	var item_input_checkbox = $(obj);
	if (item_input_checkbox.attr("checked")=="checked") {
		var item = item_input_checkbox.prev();
		var item_span = item.prev();
		
		var chkVal = item.attr('id');
		var chkDisplay = item.prev().text().trim().replace("：","");
		if (comboxResultModel == undefined || comboxResultModel["result"] == '') {
			var str1 = '{"chkVal":"'+chkVal+'","chkDisplay":"'+chkDisplay+'","selected":'+true+'}';
			comboxResultModel = StringOfJSON(str1, comboxResultModel, "result", "add");
		} else {
			var str2 = '{"chkVal":"'+chkVal+'","chkDisplay":"'+chkDisplay+'"}';
			comboxResultModel = StringOfJSON(str2, comboxResultModel, "result", "add");
		}
		
		var html = '<input type="text" style="width: 40px;" class="input_default left" id="'+chkVal+'_1"> ' 
		+ ' <span class="sep left">-</span>                                             '
		+ ' <input type="text" style="width: 40px;" class="input_default left" id="'+chkVal+'_2"> ';
		item.remove();
		item_span.after(html);
		alertMsg("已变更查询项为数值项！");
	} else {
		var item2 = item_input_checkbox.prev();
		var item_span2 = item2.prev();
		var item1 = item_span2.prev();
		var item_span = item1.prev();
		
		var chkVal = item2.attr('id').split("_")[0];
		var chkDisplay = item_span.text().trim().replace("：","");
		var str1 = '{"chkVal":"'+chkVal+'","chkDisplay":"'+chkDisplay+'","selected":'+true+'}';
		comboxResultModel = StringOfJSON(str1, comboxResultModel, "result", "remove");
		var str2 = '{"chkVal":"'+chkVal+'","chkDisplay":"'+chkDisplay+'"}';
		comboxResultModel = StringOfJSON(str2, comboxResultModel, "result", "remove");
		
		var html = '<input type="text" id="'+chkVal+'" class="input_default_s left">';
		item2.remove();
		item_span2.remove();
		item1.remove();
		item_span.after(html);
		alertMsg("已变更查询项为非数值项！");
	}
	
}

//在JSON中增删字符串
function StringOfJSON(str, jsonMap, jsonStr, addOrRemove){
	var resultStr;
	if (jsonMap == undefined) {
		resultStr = '';
	} else {
		resultStr = JSON.stringify(jsonMap[jsonStr]);
		resultStr = resultStr.replace('[','');
		resultStr = resultStr.replace(']','');
	}
	if (addOrRemove == "add") {
		if (resultStr != null && resultStr != '') {
			resultStr = resultStr + ',' + str;
		} else {
			resultStr = str;
		}
		resultStr = '{"'+jsonStr+'":['+resultStr+']}';
	} else if (addOrRemove == "remove") {
		resultStr = resultStr.replace(str,'');
		resultStr = resultStr.replace(',,',',');
		resultStr = '{"'+jsonStr+'":['+resultStr+']}';
		resultStr = resultStr.replace('[,','[');
		resultStr = resultStr.replace(',]',']');
	}
	var json = JSON.parse(resultStr);
	return json;
}

/*function isRemoveHeji(){
	var flag = true;
	$('ul input[type="checkbox"]').each(function() {
		if($(this).attr("checked")=="checked") {
			flag = false;
		}
	})
}*/
