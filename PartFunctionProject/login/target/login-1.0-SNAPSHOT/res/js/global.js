/**
 * @descript
 * 		初始化
 */
var obj_arrays = [];
var base = $('#base').val();

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
	$('#staticTable').height(W_height_item-285-30);
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
	ajaxExportlist(this, 'inbox');
}

/**
 * @descript
 * 		动态加载页面
 */
function ajaxHtml(page){
	$.ajax({
		url:base+'/res/include/'+page+'.html',
		dataType:'text',
		success:function(data){
			$('#border').html(data);
			// 添加水印
			$('input,textarea').placeholder&&$('input,textarea').placeholder();
			$.getScript(base+'/res/js/'+page+'.js');
		},
		error:function(e){
			alert('数据格式有问题！');
		}
	});
}

/**
 * @descript
 * 		动态加载页面(导入列表)
 */
function ajaxExportlist(obj, page){
	$(obj).addClass('slt');
	ajaxHtml(page);
}

/**
 * @descript
 * 动态加载页面(导入文件)
 */
function ajaxImportFile(obj, page){
	$.ajax({
		url:base+'/res/include/'+page+'.html',
		dataType:'text',
		success:function(data){
			$('#border').append(data);
			// 添加水印
			$('input,textarea').placeholder&&$('input,textarea').placeholder();
		},
		error:function(e){
			alert('数据格式有问题！');
		}
	});
}

/**
 * @descript
 * 关系分析-Neo4j图形展示
 */
function getNeo4jRelation(obj, page){
	$.ajax({
		url:base+'/res/include/'+page+'.html?v=1.1.9',
		dataType:'text',
		success:function(data){
			$('#border').append(data);
			// 添加水印
			//$('input,textarea').placeholder&&$('input,textarea').placeholder();
		},
		error:function(e){
			alert('数据格式有问题！');
		}
	});
}

/**
 * @descript
 * 关系分析-Rt图形展示
 * 
 * 1.转化数据
 * （将es、neo4j中的数据转化为ExtDataCollection对象，再转化为json数据）
 * 请求es、neo4j中的数据
 * 按ExtDataCollection对象转化为json数据
 * 
 * 2.发行数据
 * （将数据发给RT返回dataCollectionId）
 * 请求类型： http+json(请求体)
 * 请求地址：http://ip:port/rt/saveExtDataCollection.action
 * 请求参数为json。该json为由java类型为ExtDataCollection的对象转成的json
 * 
 * 3.页面跳转
 * （弹出RT数据展示的新窗口）
 * 请求地址：http://ip:port/rt/index.do
 * 请求参数: dataCollectionId=XXXX
 * 响应参数示例如下：
 * 成功时：
 * {
 * 	"status": "200",
 * 	"dataCollectionId":"xxxxxx"
 * }
 * 失败时： 
 * { 
 * 	"status": "500", 
 * 	"errMsg": "错误描述" 
 * } 
 * 
 * 通过上传Excel文件导入的3个样例dataCollectionId数据：
 * 5ae031e64b3a090768d1fd18
 * 5ae029784b3a090768d1fc9c
 * 5ae025834b3a090768d1fb4a
 * 
 */
function getRtRelation(obj, page){
	//debugger;
	var relStr = relationArr.join(","); //relationArr在inbox.js中定义，存放待分析邮箱账号列表
	if(relStr.split(',').length < 2){
		//删除子表中已移除的勾选框
		$('.r-grid-like-check-slt').each(function(i,item){
			$(item).removeClass('r-grid-like-check-slt')
		});
		alertMsg("请选择两个及两个以上的查询账号");
	}else {
		//打开loading
		var _html = '<div class="shadow"></div><div class="loaddingBox"><img src="'+ctxBase+'/res/images/loading.gif" class="loaddingImg"><div>数据加载中...</div></div>';
		$('.main_page').append(_html);
		$.ajax({
			type:"post",
			url:ctxBase+"/rel/getRtRel",
			data:{"relStr":relStr},
			//data:{"relStr":"awang01@wesleyan.edu,wangaoxueyuan@163.com"},
			success:function(data1){
				//debugger;
				$('.loaddingBox').remove();
				$('.shadow').remove();
				if(data1.status==200){
					window.open(data1.jspurl+"?dataCollectionId="+data1.dataCollectionId);
				}else {
					alertMsg("请求RT失败，"+data1.errMsg+"！");
				}
			},
			error:function(e){
				alertMsg("异常，请联系管理员！");
			}
		});
	}
}

/**
 * 添加滚动条
 * @param {string} id 要添加滚动条的元素class
 */
function addScroll(id) {
	//添加滚动条
	$('#'+id).jScrollPane({'autoReinitialise':true});
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
