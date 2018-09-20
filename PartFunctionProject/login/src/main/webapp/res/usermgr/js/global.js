/**
 * 自适应echart和table的全局变量 
 */
var OBJ_E_T = [];
var OBJ_TIMER = [];

$(function(){
	initLayout();//设置页面宽高
	window.onresize = function(){
		// 卡片和表格自适应
		$.each(OBJ_E_T,function(i, tmp){
			if(tmp && tmp!=null){
				tmp.resize();
			}
		});
		initLayout();
	};
	
	handleRadio();//单选按钮
	handleCheckbox();//单选按钮
	
	listenLeftnav();//左侧导航
	
});

/**
 * @description 设置页面宽高
 */
function initLayout () {
	var H_HEADER = 66;
	var W_body = $('body').width();
	var $bodyer = $('.bodyer').css('height','auto'),
		h_window = $(window).height();
		h_bodyer = h_window - H_HEADER;
		W_body = W_body<1366?1366:W_body;
	$bodyer.css('height',h_bodyer);
	$('.content').css('height',h_bodyer+1);
	$('.leftTree').css('width',(W_body-316-20-50)/2)
	$('.leftTree').css('height',400)
	
}

/**
 * @description ajax 
 * @param {Object} settings
 */
function load (settings) {
	$.each(OBJ_TIMER, function(i, timer){
		clearInterval(timer);
	});
	var defaults = {
		type:"post",
		dataType:"json",
		async:true
	};
	$.ajax($.extend(true, {}, defaults, settings));
}
function loadError (id, text) {
	$('#'+id).empty().append(text);
}

/**
 * @description 左侧导航
 * 				
 */
function listenLeftnav () {
	var $leftnav = $('#leftnav');
	
	$leftnav.off('click', '.link').on('click', '.link', function () {
		if (!$leftnav.hasClass('disabled')) {
			goNav(this);
		}
	});
}

function goNav (_this) {
	var $leftnav = $('#leftnav'),
		$container = $('#content'),
		_load = function (module) {
			load({
				url: module,
				dataType: 'text',
				success : function (data) {
					$container.html(data);
					$leftnav.removeClass('disabled');
					initLayout ();
					$('[placeholder]').placeholder&&$('[placeholder]').placeholder();//兼容ie8 9 placeholder
				},
				error: function () {
					$container.html('加载失败');
				}
			});
		};
	var $hook = $(_this);
	var $item = $hook.closest('.item');
	var $link = $item.find('.link')
	$leftnav.find('.cur').removeClass('cur');
	$leftnav.find('.active').removeClass('active');
	$hook.addClass('cur');
	$link.addClass('active');
	var page = $hook.attr('data-page');
	page = page?page:$item.attr('data-page');
	_load(page);
}

//单选效果 
function handleRadio(){
	$('body').off('click', '.f_radio').on('click', '.f_radio',function(){
		var $hook = $(this);
		$hook.addClass('f_radio_chk').siblings().removeClass('f_radio_chk');
	});
	$('body').off('click', '.f_radio input').on('click', '.f_radio input',function(ev){
		ev.stopPropagation();
	});
}
//复选效果 
function handleCheckbox(){
	$('body').off('click', '.f_chk').on('click', '.f_chk',function(){
		var $hook = $(this);
		$hook.toggleClass('f_chk_chk');
	});
	$('body').off('click', '.f_chk input').on('click', '.f_chk input',function(ev){
		ev.stopPropagation();
	});
}

/**
 * 创建下拉框
 * selects=[{
 * 	id:创建的id
 *  data:固定内容不需向后台请求。或者 url:异步请求下拉框
 *  width:
 * }]
 * 返回
 * 
 */
function showSelects (comboboxs) {
	var apis = {},
		defaults = {
			width:222,
			listHeight : 150,
			isMultiple : false,
			editable: false,
			listeners: {
	          	render: function() {
					
				}
			}
		},
		api = null,
		settings = null;
	$.each(comboboxs, function(i, combobox) {
		settings = $.extend(true, {}, defaults, combobox);
		if ($('#'+combobox.id).length>0) {
			api = Run.create("ComboBox", settings);
			apis[combobox.id] = api;
		}
	});
	return apis;
}

/**
 * 获取下拉框值
 * id:要获取的下拉框id
 * 
 */
function getSelect (selectApis, id) {
	var api = selectApis[id],
		arrVal = selectApis[id].getValue(),
		val='';
	if (api==undefined) {
		alert('没有 id = '+id+' 的下拉框');
	} else if (arrVal.length>0) {
		val = arrVal[0];
	}
	return val;
}

/**
 * @description 弹窗
 */
function pop(settings) {
	$('#' + settings.id).remove();
	$('body').append('<div id="' + settings.id + '"></div>');
	var settings = $.extend(true, {}, {
		id : 'pop',
		width : 600,
		height : 430,
		mask : true,
		shadow : true
	}, settings);
	var window1 = Run.create('Window', settings);
}

/**
 * @description 提示框
 */
function popConfirm(msg, ensureFn) {
	pop({
		id : 'pop',
		width : 345,
		height : 165,
		message:'<p class="popConfirmIn"><span class="txt">'+msg+'</span></p>',
		iconCls : 'iMsg',
		title : '提示',
		buttons : [{
			'className' : 'btn_43',
			'text' : '确定',
			'handle' : ensureFn
		}, {
			'className' : 'btn_43',
			'text' : '取消',
			'handle' : function(api) {
				api.close();
			}
		}]
	});
}

function popTips(msg){
	pop({
		id : 'pop',
		width : 345,
		height : 165,
		message:'<p class="popConfirmIn"><span class="txt">'+msg+'</span></p>',
		iconCls : 'iMsg',
		title : '提示',
		buttons : [{
			'className' : 'btn_43',
			'text' : '确定',
			'handle' : function(api) {
				api.close();
			}
		}]
	});
}

/**
 * 调用ztree
 * @param id tree 的容器
 * @param setting tree 的相关设置
 * @param zNodes tree 的数据
 */
function initZTree(id,setting,zNodes){
	$.fn.zTree.init($("#"+id), setting, zNodes);
}
