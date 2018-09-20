var ctx = $('#ctxValue').val();
$(function(){
	showUserListPage();
	//showGrid();
	
	//回车事件
	document.onkeydown = function(e){
	    if(!e) e = window.event;//火狐中是 window.event
	    if((e.keyCode || e.which) == 13){
	        document.getElementById("search").click();
	    }
	}
});

function showUserListPage(){
	$.ajax({
		url : ctx+'/res/usermgr/include/userlist.html',
		type : 'post',
		success : function(data){
			$("#content").empty();
			$("#content").append(data);
		}
	});
}

function showUserListGrid() {
	$("#userlistGrid").html("");//清除原来内容
	paramsMap={};
	if($("#username").val().trim() != null && $("#username").val().trim() != "") {
		paramsMap["name"] = $("#username").val().trim();
	}
	//展示第一种分页
	OBJ_E_T[OBJ_E_T.length] = Run.create("Grid",{
		id : "userlistGrid",											//调用表格组件需要的ID
		url : ctx+"/usermgr/getUserList",				//调用表格组件的JSON路径
		query : paramsMap,												//调用表格组件传入的参数
		isMultiple : false,										//配置表格组件是否需要复选框
		autoIncrement : true,									//配置表格组件是否有自增序号
		alignWay : "center",									//配置表格组件对齐方式
		dragable : true,										//配置表格是否可拖拽
		colHover : true,										//配置表格组件是否有鼠标经过行效果
		zebra : true,											//配置表格组件是否有隔行换色效果
		cellEmpty : "-------",									//当个单元格内容检索为undefined时使用临时替代字符
		usepage : {												//配置表格组件分页   
			type:1,
			position : 'bottom',
			align : 'right',
			pageGoAble : false,
			pageSizeAble : false,
			pageDescription : true
		},
//		rowClick : rowClickFunc,
		colModel:[{												//配置表格各列
			display:'用户名',
			name:'name'
		},{
			display:'账号',
			name:'account'
		},{
			display:'机构',
			name:'orgName'
		},{
			display:'联系电话',
			name:'phoneNumber'
		},{
			display:'操作',
			name:'operate',
			width:200,
			formatter : opeFncUser
		}],
		listeners:{
			render:function(){
				$("#userlistGrid_grid_bd_box").css("overflow", "hidden");
			},
			reloadGrid:function(){
				$("#userlistGrid_grid_bd_box").css("overflow", "hidden");
			}
		 }
	});
}

//用户表格操作列
function opeFncUser(val,row){
	if(row.id=='1'){
		return '<a href="#" class="gridBlueLink" onclick="addEditUser(\''+row.id+'\',\'编辑用户\');">修改</a>';
	}else{
		return '<a href="#" class="gridBlueLink" onclick="addEditUser(\''+row.id+'\',\'编辑用户\');">修改</a>'
		+'<a href="#" class="gridOrangeLink" onclick="deleteUser(\''+row.id+'\');">删除</a>';
	}
}

function addEditUser(id, title){
	addEditUserFnc(id, title, function(win) {//确定
		var userId = $("#publishForm input[name='id']").val();
		if(userId!='1' && $("#publishForm input[name='usersSelect']").val()==undefined || $("#publishForm input[name='usersSelect']").val()=='') {
			$("#usersSelect input[placeholder='请选择']").focus();
			popTips('请选择直属领导！');
			return false;
		} else {
			$("#leaderid").val($("#publishForm input[name='usersSelect']").val());
		}
		// 必填校验
		//mobile: [/^1[3-9]\d{9}$/, "请填写有效的手机号"]
		//password: [/^[\S]{6,16}$/, "请填写6-16位文字，不能包含空格"]
		var mobile = /^1[3-9]\d{9}$/;
		var password = /^[\S]{6,16}$/;
		
		var flag = true;
		$("#publishForm input").each(function() {
			if($(this).val() == '' && $(this).prev().text()!="【密码】" && $(this).prev().text()!="【确认密码】"){
				$(this).focus();
				flag = false;
				popTips('请填写'+$(this).prev().text()+'！');
				return false;
			}else if($(this).prev().text()=="【手机】"){
				if(!mobile.test($(this).val())){
					$(this).focus();
					flag = false;
					popTips('请填写正确的手机号！');
					return false;
				}
			}else if($(this).prev().text()=="【密码】"){
				if($(this).val()!='' && !password.test($(this).val())){
					$(this).focus();
					flag = false;
					popTips('请填写6-16位文字，不能包含空格！');
					return false;
				}
			}else if($(this).prev().text()=="【确认密码】"){
				if($(this).val()!='' && $(this).val() != $("#publishForm input[name='password']").val()){
					$(this).focus();
					flag = false;
					popTips('两次密码不一致！');
					return false;
				}
			}
		})
		if(!flag) {
			return false;
		}
		
		$.ajax({
	        url: ctx+'/usermgr/saveUser', 
	        type: 'post',
	        data:$('#publishForm').serialize(),
	        dataType: 'json',
	        success: function(data){
	        	if (data.flag) {
	        		win.close();
	        		showUserListPage();
				}else{
					popTips('保存失败！');
				}
	        },
	        error: function(json){ 
	        	popTips('后台错误，请联系管理员！');
	        }
	    });
		
	},function(win) {//重置
		$('#popCommondMsgR .inputbg').val('');
	});
}
function addEditUserFnc(id, title, ensureFn,resetFn) {
	pop({
		id : 'popCommondMsgR',
		width : 600,
		height : 660,
		url : ctx+'/res/usermgr/include/userAddEdit.html',
		iconCls : 'iPublish',
		title : title,
		buttons : [{
			'className' : 'btnyellow_43',
			'text' : '提交',
			'handle' : ensureFn,
			args : [11, 222]
		}, {
			'className' : 'btn_43',
			'text' : '重置',
			'handle' : resetFn,
			args : [11, 222]
		},{
			'className' : 'btn_43',
			'text' : '取消',
			'handle' : function(api) {
				api.close();
			}
		}],
		listeners : {
			render : function() {
				//编辑
				if(id != null && id != "") {
					$.ajax({
						url: ctx + '/usermgr/getUserById',
				        type: 'post',
				        data: {"userId":id},
				        dataType: 'json',
				        success: function(data){
				        	if (data.flag) {
				        		var user = data.user;
				        		var html = '';
				        		if(user.id && user.id.length > 0) {
				        			html = '<input type="hidden" name="id" value="'+user.id+'"></input>';
				        			$("#publishForm").append(html);
				        		}
				        		if(user.lockout && user.lockout.length > 0) {
				        			html = '<input type="hidden" name="lockout" value="'+user.lockout+'"></input>';
				        			$("#publishForm").append(html);
				        		}
				        		if(user.delflag && user.delflag.length > 0) {
				        			html = '<input type="hidden" name="delflag" value="'+user.delflag+'"></input>';
				        			$("#publishForm").append(html);
				        		}
								$("#publishForm input[name='account']").val(user.account);
								$("#publishForm input[name='name']").val(user.name);
								$("#publishForm input[name='phoneNumber']").val(user.phoneNumber);
								$("#publishForm input[name='leaderid']").val(user.leaderid);
								$("#publishForm input[name='orgId2']").val(data.leaderOrgId);
								$("#publishForm input[name='orgName2']").val(data.leaderOrgName);
								$("#publishForm input[name='orgId']").val(data.orgId);
								$("#publishForm input[name='orgName']").val(user.orgName);
								
								if(data.orgId!=null && data.orgId!="") {
									selects_api = getSelectDatas("usersSelect", data.leaderOrgId);
								}
								
								if(user.id == '1') {
									$("#leaderid").parent().remove();
									$("#orgId").parent().remove();
				        		}
							}else{
								$("#popCommondMsgR").remove();
								popTips(data.msg);
							}
				        },
				        error: function(json){ 
				        	popTips('后台错误，请联系管理员！');
				        }
				    });
				}
			}
		}
	});
}

function deleteUser(id){
	popConfirm("确定删除该用户？", function(api) {
		$.ajax({
			url: ctx + '/usermgr/deleteUser', 
			type: 'post',
			data: {"userId":id},
			dataType: 'json',
			success: function(data){
				if (data.flag) {
					showUserListPage();
					api.close();
				}else{
					popTips(data.msg);
				}
			},
			error: function(json){ 
				popTips('后台错误，请联系管理员！');
			}
		});
	});
}

//表格操作列
function opeFnc(val,row){
	return "<a href='#' class='gridBlueLink' onclick='javascript;'>修改</a>"
	+"<a href='#' class='gridOrangeLink' onclick='deleteUser();'>删除</a>";
}

function refreshOrgListGrid(){
	$("#orglistGrid").empty();
	showOrgListGrid(1);
}
function showOrgListGrid(currPage) {
	
	//展示第一种分页
	OBJ_E_T[OBJ_E_T.length] = Run.create("Grid",{
		id : "orglistGrid",											//调用表格组件需要的ID
		url : ctx+"/usermgr/getOrgList",				//调用表格组件的JSON路径
		width:600,
		query : {},												//调用表格组件传入的参数
		isMultiple : false,										//配置表格组件是否需要复选框
		autoIncrement : true,									//配置表格组件是否有自增序号
		alignWay : "center",									//配置表格组件对齐方式
		dragable : true,										//配置表格是否可拖拽
		colHover : true,										//配置表格组件是否有鼠标经过行效果
		zebra : true,											//配置表格组件是否有隔行换色效果
		cellEmpty : "-------",									//当个单元格内容检索为undefined时使用临时替代字符
		usepage : {												//配置表格组件分页   
			type:1,
			position : 'bottom',
			align : 'right',
			pageGoAble : false,
			pageSizeAble : false,
			pageDescription : true
		},
//		rowClick : rowClickFunc,
		colModel:[{												//配置表格各列
			display:'机构名称',
			name:'orgName'
		},{
			display:'机构代码',
			name:'orgCode'
		},{
			display:'描述',
			name:'comments'
		}/*,{
			display:'操作',
			name:'operate',
			width:200,
			formatter : opeFnc
		}*/],
		listeners:{
			render:function(){
				$("#orglistGrid_grid_bd_box").css("overflow", "hidden");
			},
			reloadGrid:function(){
				$("#orglistGrid_grid_bd_box").css("overflow", "hidden");
			}
		 }
	});
}

function loadOrgTree(setting){
	$.ajax({
        url: ctx+'/usermgr/queryOrgTreeNodes', 
        type: 'post',
        dataType: 'json',
        success: function(data){
        	//调用ztree
        	$.fn.zTree.init($("#leftTree"), setting, data.treeNodes);
        	
        	// 刷新Grid
        	showOrgListGrid(1);
        },
        error: function(json){ 
        	popTips('后台错误，请联系管理员！');
        }
    });
}