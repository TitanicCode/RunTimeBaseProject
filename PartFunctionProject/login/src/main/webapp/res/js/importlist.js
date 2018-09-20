/**
 * @descript
 * 		初始化
 */
var obj_arrays = [];

var ctx = $('#ctxValue').val(); //获取根路径
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
	showTable();
	
	$("#search").off("click").on("click",function(){ //点击查询
		$("#t1").html("");//清除原来内容
		showTable();
	});
	
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
	function showTable() {
		//加载知识库表格
		var grid = obj_arrays[obj_arrays.length] = Run.create("Grid", {
			id : "t1", //调用表格组件需要的ID
			//url : ctx+"/res/"+"json/t1.json", //调用表格组件的JSON路径
			url : ctx+"/getImportlist", //调用表格组件的JSON路径
			query : {
				"startTime":$("#startTime").val(),
				"endTime":$("#endTime").val(),
				"userName" : $("#userName").val(),
				"importFileName":$("#importFileName").val()
			}, //调用表格组件传入的参数
			isMultiple : false, //配置表格组件是否需要复选框
			autoIncrement : false, //配置表格组件是否有自增序号
			alignWay : "center", //配置表格组件对齐方式
			dragable : false, //配置表格是否可拖拽
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
			},
			colModel : [{
				display : '批次编号',
				name : 'batchCode',
				formatter:function(val, row){
					return '<span style="color:#2c3e50;">'+val+'</span>';
				}
			}, {
				display : '导入文件名',
				name : 'importFileName'
			}, {
				display : '导入用户名',
				name : 'importUserName'
			}, {
				display : '导入日期',
				name : 'importTimeStr'
			}, {
				display : '成功条数',
				name : 'successCounts'
			}, {
				display : '失败条数',
				name : 'failedCounts'
			}, {
				display : '异常描述',
				name : 'errDesc'
			}],
			listeners : {
				render : function() {
				},
				reloadGrid : function() {
				}
			}
		});
	}