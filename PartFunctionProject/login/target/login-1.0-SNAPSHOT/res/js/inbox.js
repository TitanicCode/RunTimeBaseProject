	var apis = [];
	var timer = null;
	var relationArr = [];//待分析关系邮箱账号数组
	var ctxBase = $('#base').val();
	$(function() {
		var _html = '<div class="shadow"></div><div class="loaddingBox"><img src="'+ctxBase+'/res/images/loading.gif" class="loaddingImg"><div>数据加载中...</div></div>';
		$('.main_page').append(_html);
		//获取邮件数目
		$.ajax({
			url : base+'/email/counts',
			type : 'get',
			success : function(data){
				var count_map = data.data;
				$('#account_num').html(count_map['all']);
				$('#in_num').html(count_map['In.box']);
				$('#out_num').html(count_map['Out.box']);
				$('#laji_num').html(count_map['Spam.box']);
				$('#feijian_num').html(count_map['Trash.box']);
			}
		});
		//查询邮件账号列表
		$.ajax({
			url : base+'/email/accountList',
			type : 'post',
			data : {
				startTime : $('#startTime').val(),
				endTime : $('#endTime').val(),
				receiverAddr: $('#receiverAddr').val(),
				senderAddr: $('#senderAddr').val(),
				fullText : $('#full_text').val()
			},
			dataType : 'json',
			success : function(data){
				$('.loaddingBox').remove();
				$('.shadow').remove();
				$('#moreAccount').attr("attr-page",data.currentPage);
				if(data.total < data.currentPage * 10){
					//$('#moreAccount').attr("disabled",true);
					$('#moreAccount').hide();
				}else{
					$('#moreAccount').show();
				}
				
				var email_list = data.data;
				if(email_list.length>0){
					var in_html = '';
					for(var i = 0 ; i < email_list.length ; i ++){
						in_html += '<tr><td><span class="icon_check" data-value="t11'+i+'"></span></td>'
						+  '<td><a href="javascript:;" id="email_'+i+'" onclick="showDetail(this,\''+email_list[i].id+'\',\''+email_list[i].account+'\')" class="trange_u" title="'+email_list[i].account+'">'+email_list[i].account+'</a></td>'
						+  '<td><div id="t'+email_list[i].id+'" class="tableResult tableResult1"></div></td>';
					}
					$('#account_list').html(in_html);
					
					//默认打开第一个邮件账号
					if(email_list.length>0){
						var that = $('#t'+email_list[0].id);
						that.parent().prev().children().click();
					}
					//showTable(email_list[0].id, $('.tableResult').parent().width()-10);
				}
			}
		});
		//加载更多
		$('#moreAccount').click(function(){
			//去掉全选
			$('.bottomBox').html('');
			//清空待分析关系数组中
			relationArr = [];
			$.ajax({
				url : base+'/email/accountList',
				type : 'post',
				data : {
					startTime : $('#startTime').val(),
					endTime : $('#endTime').val(),
					receiverAddr: $('#receiverAddr').val(),
					senderAddr: $('#senderAddr').val(),
					fullText : $('#full_text').val(),
					currentPage : parseInt($('#moreAccount').attr("attr-page")) + 1
				},
				dataType : 'json',
				success : function(data){
					$('#moreAccount').attr("attr-page",data.currentPage);
					if(data.total < data.currentPage * 10){
						//$('#moreAccount').attr("disabled",true);
						$('#moreAccount').hide();
					}else{
						$('#moreAccount').show();
					}
					var in_html = '';
					var email_list = data.data;
					for(var i = 0 ; i < email_list.length ; i ++){
						in_html += '<tr><td><span class="icon_check" data-value="t110"></span></td>'
								+  '<td><a href="javascript:;" id="email_'+i+'" onclick="showDetail(this,\''+email_list[i].id+'\',\''+email_list[i].account+'\')" class="trange_u" title="'+email_list[i].account+'">'+email_list[i].account+'</a></td>'
								+  '<td><div id="t'+email_list[i].id+'" class="tableResult tableResult1"></div></td>';
					}
					//$(in_html).appendTo($('#account_list'));
					$('#account_list').html(in_html);
				}
			});
		});
		
		$('#rel_view').on('click',function(){
			$.ajax({
				url:base+'/res/include/res.html',
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
		});
		
		$('#e_search').on('click',function(){
			$.ajax({
				url : base+'/email/accountList',
				type : 'post',
				data : {
					startTime : $('#startTime').val(),
					endTime : $('#endTime').val(),
					account: $('#account').val(),
					receiverAddr: $('#receiverAddr').val(),
					senderAddr: $('#senderAddr').val(),
					fullText : $('#full_text').val()
				},
				dataType : 'json',
				success : function(data){
					var in_html = '';
					var email_list = data.data;
					for(var i = 0 ; i < email_list.length ; i ++){
						in_html += '<tr><td><span class="icon_check" data-value="t110"></span></td>'
								+  '<td><a href="javascript:;" id="email_'+i+'" onclick="showDetail(this,\''+email_list[i].id+'\',\''+email_list[i].account+'\')" class="trange_u" title="'+email_list[i].account+'">'+email_list[i].account+'</a></td>'
								+  '<td><div id="t'+email_list[i].id+'" class="tableResult tableResult1"></div></td>';
					}
					//$(in_html).appendTo($('#account_list'));
					$('#account_list').html(in_html);
					if(data.total < data.currentPage * 10){
						$('#moreAccount').hide();
					}else{
						$('#moreAccount').show();
					}
				}
			});
		})
		
		
		//获取鼠标位置
		/*$(window).off().on('mousemove',function(e){
			if(e.clientY >=$(window).height()-5){
				$('.bottomBox').stop().animate({bottom:'0px'},500);
			}
		});*/
		
		// div拖动
//		$('.contentDiv').off().on('click', function(){
//			document.onmousedown=function(e){
//				document.onmousemove=function(e){
//					e = e || window.event;
//					var left = e.clientX ;
//					var top = e.clientY - 20;
//					$('.contentDiv').css({'top': top+'px', 'left': left+'px', 'bottom':'auto'});
//				};
//			};
//			document.onmouseup=function(e){
//				document.onmousemove = null;
//			};
//		});
		var contentDiv = document.getElementById('contentDiv');
		var disX= 0,disY= 0;
		contentDiv.onmousedown = function (e) {
			var boxW = $('.contentDiv').width();
			var boxH = $('.contentDiv').height();
			var bodyW = $('body').width();
			var bodyH = $('body').height();
			disX = e.clientX-this.offsetLeft;
			disY = e.clientY-this.offsetTop;
			document.onmousemove = function (e) {
				e = e || window.event;
				var L = (e.clientX-disX);
				var T = (e.clientY-disY);
				//var left = e.clientX;
				//var top = e.clientY - 20;
				if(L < 10){
					L = 10;
				}else if(L > $('body').width() - $('.contentDiv').width()-20){
					L = $('body').width() - $('.contentDiv').width()-20;
				}
				if(T < 10){
					T = 10;
				}else if(T > $('body').height() - $('.contentDiv').height()-10){
					T = $('body').height() - $('.contentDiv').height()-10;
				}
				/*if(left+boxW > bodyW){
					left = bodyW-boxW;
				}else if(left<0){
					left = 0;
				}
				if(top+boxH > bodyH){
					left = bodyH-boxH;
				}else if(top<0){
					top = 0;
				}*/
				$('.contentDiv').css({'top': T + 'px', 'left': L + 'px', 'bottom': 'auto','margin-left':'0'});
			};
		};
		contentDiv.onmouseup = function (e) {
			document.onmousemove = null;
			document.onmouseup = null;

			if (contentDiv.releaseCapture) {
				contentDiv.releaseCapture();
			}
		};

		// 条件显示和隐藏
		$('.J_btn_showL').off().on('click', function(){
			var that = $(this);
			if(!that.hasClass('btn_hideR')){ // 显示
				that.addClass('btn_hideR').prev().addClass('w228').removeClass('w328');
				$('.J_item').show();
				$('.J_btnLi').removeClass('left').addClass('right');
			}else{  // 隐藏
				that.removeClass('btn_hideR').prev().addClass('w328').removeClass('w228');
				$('.J_item').hide();
				$('.J_btnLi').removeClass('right').addClass('left');
			}
		});
		// 表格全选
		$('.J_chkAll').die().live('click', function(){
			var that = $(this);
			$('.noData').remove();
			$('.r-grid-like-check-slt').removeClass('r-grid-like-check-slt');
			$('.r-grid-tr-check').removeClass('r-grid-tr-check');
			if(!that.hasClass('slt')){
				that.addClass('slt');
				$('.icon_check').addClass('slt');

				//清空所有，添加全选项
				$('.bottomBox').html('');
				$('.icon_check').each(function(i,item){
					$('.bottomBox').append('<a href="javascript:;" class="tips left relative" ' +
							'data-value="'+$(item).parent().next().text()+'">'+
							$(item).parent().next().text()+'<em></em></a>');
					
					$.ajax({
						url : base+'/email/getAllAccountByAccount',
						type : 'post',
						data : {
							account: $(item).parent().next().text()
						},
						dataType : 'json',
						success : function(data){
							var email_list = data.data;
							for(var i = 0 ; i < email_list.length ; i ++){
								if(email_list[i].receiverAddr!=null&&email_list[i].receiverAddr!=''){
									//增加收件人
									var removeindex = relationArr.indexOf(email_list[i].receiverAddr);
									if(removeindex<=-1){
										/*$('.bottomBox').append('<a href="javascript:;" class="tips left relative" ' +
												'data-value="'+email_list[i].receiverAddr+'">'+
												email_list[i].receiverAddr+'<em></em></a>');*/
										relationArr.push(email_list[i].receiverAddr);
									}
								}
								if(email_list[i].senderAddr!=null&&email_list[i].senderAddr!=''){
									//增加发件人
									var removeindex = relationArr.indexOf(email_list[i].senderAddr);
									if(removeindex<=-1){
										/*$('.bottomBox').append('<a href="javascript:;" class="tips left relative" ' +
												'data-value="'+email_list[i].senderAddr+'">'+
												email_list[i].senderAddr+'<em></em></a>');*/
										relationArr.push(email_list[i].senderAddr);
									}
								}
							}
							$('.bottomBox').stop().animate({bottom:'0px'},500);
							clearTimeout(timer);
							timer = setTimeout(function(){
								$('.bottomBox').stop().animate({bottom:'-'+($('.bottomBox').height()+30)+'px'},500);
							},5000);
							if($('.bottomBox').children('a').length === 0){
								$('.bottomBox').html('<span class="noData">暂无数据！</span>');
							}
						}
					});
				});
			}else{
				that.removeClass('slt');
				$('.icon_check').removeClass('slt');
				//去掉全选
				$('.bottomBox').html('');
				
				//清空待分析关系数组中
				relationArr = [];
				$('.bottomBox').stop().animate({bottom:'0px'},500);
				clearTimeout(timer);
				timer = setTimeout(function(){
					$('.bottomBox').stop().animate({bottom:'-'+($('.bottomBox').height()+30)+'px'},500);
				},5000);
				if($('.bottomBox').children('a').length === 0){
					$('.bottomBox').html('<span class="noData">暂无数据！</span>');
				}
			}
		});
		// 单个复选框
		$('.icon_check').die().live('click', function(){
			$('.noData').remove();
			$('.bottomBox').stop().animate({bottom:'0px'},500);
			clearTimeout(timer);
			timer = setTimeout(function(){
				$('.bottomBox').stop().animate({bottom:'-'+($('.bottomBox').height()+30)+'px'},500);
			},5000);
			$(this).toggleClass('slt');
			$(this).parent().next().next().find('.tableResult').find('.r-grid-like-check-slt').removeClass('r-grid-like-check-slt');
			$(this).parent().next().next().find('.tableResult').find('.r-grid-tr-check').removeClass('r-grid-tr-check');
			if($('.icon_check').length === $('.icon_check.slt').length){
				$('.J_chkAll').addClass('slt');
			}else{
				$('.J_chkAll').removeClass('slt');
			}
			var mythis = $(this);//单个复选框
			if($(this).hasClass('slt')){//选中
				//去掉当前子表格中选中项
				/*var deltip ='';
				$('.bottomBox a').each(function(i,item){
					deltip = $(item).attr('data-value').slice(0,4);
					if(mythis.attr('data-value') === deltip){
						$(item).remove();
					}
				});*/
				//去掉relationArr中当前子表格中选中项
				mythis.parent().next().next().find("[name='shoujianren']").each(function(i,item2){
					$('.bottomBox a').each(function(j,item1){
						if(("sjr_"+$(item2).text()) === $(item1).attr('data-value')){
							$(item1).remove();
						}
					});
					var removeindex2 = relationArr.indexOf($(item2).text());
					if(removeindex2>-1){
						relationArr.splice(removeindex2,1);
					}
				});
				mythis.parent().next().next().find("[name='fajianren']").each(function(i,item3){
					$('.bottomBox a').each(function(j,item1){
						if(("fjr_"+$(item3).text()) === $(item1).attr('data-value')){
							$(item1).remove();
						}
					});
					var removeindex3 = relationArr.indexOf($(item3).text());
					if(removeindex3>-1){
						relationArr.splice(removeindex3,1);
					}
				});
				
				$('.bottomBox').append('<a href="javascript:;" class="tips left relative" ' +
						'data-value="'+mythis.parent().next().text()+'">'+
						mythis.parent().next().text()+'<em></em></a>');
				
				//当前子表格中选中项加入到底部及relationArr中
				$.ajax({
					url : base+'/email/getAllAccountByAccount',
					type : 'post',
					data : {
						account: mythis.parent().next().text()
					},
					dataType : 'json',
					success : function(data){
						var email_list = data.data;
						for(var i = 0 ; i < email_list.length ; i ++){
							if(email_list[i].receiverAddr!=null&&email_list[i].receiverAddr!=''){
								//增加收件人
								var removeindex = relationArr.indexOf(email_list[i].receiverAddr);
								if(removeindex<=-1){
									/*$('.bottomBox').append('<a href="javascript:;" class="tips left relative" ' +
											'data-value="'+email_list[i].receiverAddr+'">'+
											email_list[i].receiverAddr+'<em></em></a>');*/
									relationArr.push(email_list[i].receiverAddr);
								}
							}
							if(email_list[i].senderAddr!=null&&email_list[i].senderAddr!=''){
								//增加发件人
								var removeindex = relationArr.indexOf(email_list[i].senderAddr);
								if(removeindex<=-1){
									/*$('.bottomBox').append('<a href="javascript:;" class="tips left relative" ' +
											'data-value="'+email_list[i].senderAddr+'">'+
											email_list[i].senderAddr+'<em></em></a>');*/
									relationArr.push(email_list[i].senderAddr);
								}
							}
						}
						if($('.bottomBox').children('a').length === 0){
							$('.bottomBox').html('<span class="noData">暂无数据！</span>');
						}
					}
				});
			}else{//未选中 删除
				$('.bottomBox a').each(function(i,item){
					if(mythis.parent().next().text() === $(item).attr('data-value')){
						$(item).remove();
					}
				});
				//移出待分析关系数组中
				$.ajax({
					url : base+'/email/getAllAccountByAccount',
					type : 'post',
					data : {
						account: mythis.parent().next().text()
					},
					dataType : 'json',
					success : function(data){
						var email_list = data.data;
						for(var i = 0 ; i < email_list.length ; i ++){
							//删除收件人
							/*$('.bottomBox a').each(function(j,item1){
								if(email_list[i].receiverAddr === $(item1).attr('data-value')){
									$(item1).remove();
								}
							});*/
							var removeindex2 = relationArr.indexOf(email_list[i].receiverAddr);
							if(removeindex2>-1){
								relationArr.splice(removeindex2,1);
							}
							//删除发件人
							/*$('.bottomBox a').each(function(k,item2){
								if(email_list[i].senderAddr === $(item2).attr('data-value')){
									$(item2).remove();
								}
							});*/
							var removeindex3 = relationArr.indexOf(email_list[i].senderAddr);
							if(removeindex3>-1){
								relationArr.splice(removeindex3,1);
							}
							//删除子表中已移除的勾选框
							$('.r-grid-like-check-slt').each(function(i,item){
								var sjr = $(item).parent().parent().next().next().find('span[name=shoujianren]').text();
								var fjr = $(item).parent().parent().next().next().next().find('span[name=fajianren]').text();
								if(sjr===email_list[i].receiverAddr && fjr===email_list[i].senderAddr){
									$(item).removeClass('r-grid-like-check-slt')
								}
							});
						}
						
						if($('.bottomBox').children('a').length === 0){
							$('.bottomBox').html('<span class="noData">暂无数据！</span>');
						}
					}
				});
				
				
			}
		});

		//删除按钮
		$('.tips em').die().live('click',function(){
			var mythis = $(this);
			//删除自定义的选中
			$('.icon_check').each(function(i,item){
				if($(item).attr('data-value') === mythis.parent().attr('data-value')){
					$(item).removeClass('slt')
				}
			});
			//删除插件的选中
			$('.r-grid-bd-box tr').each(function(i,item){
				if($(item).attr('id') === mythis.parent().attr('data-value')){
					$(item).find('.r-grid-like-check-slt').removeClass('r-grid-like-check-slt');
					$(item).removeClass('r-grid-tr-check');
				}
			});
			mythis.parent().remove();
		});
		//悬浮
		$('.bottomBox').off('mouseover').on('mouseover',function(){
			clearTimeout(timer);
		}).off('mouseout').on('mouseout',function(){
			timer = setTimeout(function(){
				$('.bottomBox').stop().animate({bottom:'-'+($('.bottomBox').height()+30)+'px'},500);
			},1000);
		});

		// 加载下拉框
		showSelects([
			{
				id: "mailType",
				width:131,
				onSelect:function(a,b){
					$('.tableResult1').each(function(i){
						var e_account = $('#email_'+i).attr('title');
						Run.get($(this).attr('id')).reloadGrid({
							"boxType": $('#mailType input[name="mailType"]').val(),
							"account" :e_account,
							"startTime" : $('#startTime').val(),
							"endTime" : $('#endTime').val(),
							"receiverAddr": $('#receiverAddr').val(),
							"senderAddr": $('#senderAddr').val(),
							"fullText" : $('#full_text').val()
						});
					});
				},
				data: {"result": [
					{	
						"chkVal": "all",
						"chkDisplay": "全部分类",
						"selected": true
					},{
						"chkVal": "Out.box",
						"chkDisplay": "发件箱"
					},{
						"chkVal": "In.box",
						"chkDisplay": "收件箱"
					},{
						"chkVal": "Sent.box",
						"chkDisplay": "已发送邮件"
					},{
						"chkVal": "Spam.box",
						"chkDisplay": "垃圾邮箱"
					},{
						"chkVal": "Trash.box",
						"chkDisplay": "废件箱"
					}
				]}
			}]);
		// 关闭弹出框
		$('.btn_close1').off().on('click', function(){
			$('.contentDiv').addClass('hide');
			$('.bg_leftBorder').removeClass('bg_leftBorder');
		});
		
		//验证结束时间
		$('#endTime').on('blur',function(){
			var endTime = $('#endTime').val();
			var startTime = $('#startTime').val();
			if(endTime!='' && startTime!=''){
				var startDateTime = startTime.split('-');
				var startYear = parseInt(startDateTime[0]);
				var startMonth = parseInt(startDateTime[1]);
				var startDay = parseInt(startDateTime[2]);
				var endDateTime = endTime.split('-');
				var endYear = parseInt(endDateTime[0]);
				var endMonth = parseInt(endDateTime[1]);
				var endDay = parseInt(endDateTime[2]);
				if(endYear < startYear){
					$('#endTime').val('');
				}
				if(endYear==startYear && endMonth < startMonth){
					$('#endTime').val('');
				}
				if(endYear==startYear && endMonth==startMonth && endDay< startDay){
					$('#endTime').val('');
				}
			}
		});
		//验证开始时间
		$('#startTime').on('blur',function(){
			var endTime = $('#endTime').val();
			var startTime = $('#startTime').val();
			if(endTime!='' && startTime!=''){
				var startDateTime = startTime.split('-');
				var startYear = parseInt(startDateTime[0]);
				var startMonth = parseInt(startDateTime[1]);
				var startDay = parseInt(startDateTime[2]);
				var endDateTime = endTime.split('-');
				var endYear = parseInt(endDateTime[0]);
				var endMonth = parseInt(endDateTime[1]);
				var endDay = parseInt(endDateTime[2]);
				if(endYear < startYear){
					$('#startTime').val('');
				}
				if(endYear==startYear && endMonth < startMonth){
					$('#startTime').val('');
				}
				if(endYear==startYear && endMonth==startMonth && endDay< startDay){
					$('#startTime').val('');
				}
			}
		});
		initlayout();
		// 添加滚动条
		addScroll('staticTable');
	});

	/**
	 * @descript
	 * 		加载表格
	 */
	function showTable(id, width,account) {
		//加载知识库表格
		obj_arrays[obj_arrays.length] = Run.create("Grid", {
			id : 't'+id, //调用表格组件需要的ID
			url : base+"/email/pageList", //调用表格组件的JSON路径
			query : {
				"startTime" : $('#startTime').val(),
				"endTime" : $('#endTime').val(),
				"account" : account,
				"receiverAddr": $('#receiverAddr').val(),
				"senderAddr": $('#senderAddr').val(),
				"fullText" : $('#full_text').val()
				//"boxType": $('#mailType input[name="mailType"]').val()
			}, //调用表格组件传入的参数
			width:width,
			cache:true,
			isMultiple : true, //配置表格组件是否需要复选框
			autoIncrement : false, //配置表格组件是否有自增序号
			alignWay : "center", //配置表格组件对齐方式
			dragable : false, //配置表格是否可拖拽
			colHover : true, //配置表格组件是否有鼠标经过行效果
			onCheck : function(_this,thisRowData){
				var boo = $('#'+_this.id).parent().prev().prev().children('.icon_check').hasClass('slt');
				
				//去掉邮箱账户选中
				$('.noData').remove();
				$('#'+_this.id).parent().prev().prev().children('.icon_check').removeClass('slt');
				$('.bottomBox a').each(function(j,item1){
					if($('#'+_this.id).parent().prev().text() === $(item1).attr('data-value')){
						$(item1).remove();
					}
				});
				//判断邮箱账号是否为选中状态
				//若为选中状态，则先清除子表所有收件人及发件人账号，再添加子表选中项的收件人及发件人账号
				if(boo){
					$.ajax({
						url : base+'/email/getAllAccountByAccount',
						type : 'post',
						data : {
							account: $('#'+_this.id).parent().prev().text()
						},
						dataType : 'json',
						success : function(data){
							var email_list = data.data;
							for(var i = 0 ; i < email_list.length ; i ++){
								//删除收件人
								/*$('.bottomBox a').each(function(j,item1){
									if(email_list[i].receiverAddr === $(item1).attr('data-value')){
										$(item1).remove();
									}
								});*/
								var removeindex2 = relationArr.indexOf(email_list[i].receiverAddr);
								if(removeindex2>-1){
									relationArr.splice(removeindex2,1);
								}
								//删除发件人
								/*$('.bottomBox a').each(function(k,item2){
									if(email_list[i].senderAddr === $(item2).attr('data-value')){
										$(item2).remove();
									}
								});*/
								var removeindex3 = relationArr.indexOf(email_list[i].senderAddr);
								if(removeindex3>-1){
									relationArr.splice(removeindex3,1);
								}
							}
							
							//选中
							if(thisRowData.receiverAddr!=null&&thisRowData.receiverAddr!=''){
								//增加收件人
								var removeindex = relationArr.indexOf(thisRowData.receiverAddr);
								if(removeindex<=-1){
									$('.bottomBox').append('<a href="javascript:;" class="tips left relative" ' +
											'data-value="sjr_'+thisRowData.receiverAddr+'">'+
											thisRowData.receiverAddr+'<em></em></a>');
									relationArr.push(thisRowData.receiverAddr);
								}
							}
							if(thisRowData.senderAddr!=null&&thisRowData.senderAddr!=''){
								//增加发件人
								var removeindex = relationArr.indexOf(thisRowData.senderAddr);
								if(removeindex<=-1){
									$('.bottomBox').append('<a href="javascript:;" class="tips left relative" ' +
											'data-value="fjr_'+thisRowData.senderAddr+'">'+
											thisRowData.senderAddr+'<em></em></a>');
									relationArr.push(thisRowData.senderAddr);
								}
							}

							$('.bottomBox').stop().animate({bottom:'0px'},500);
							clearTimeout(timer);
							timer = setTimeout(function(){
								$('.bottomBox').stop().animate({bottom:'-'+($('.bottomBox').height()+30)+'px'},500);
							},10000);
							if($('.bottomBox').children('a').length === 0){
								$('.bottomBox').html('<span class="noData">暂无数据！</span>');
							}
						}
					});
				} else {//若不为选中状态，则直接添加子表选中项的收件人及发件人账号
					//选中
					if(thisRowData.receiverAddr!=null&&thisRowData.receiverAddr!=''){
						//增加收件人
						var removeindex = relationArr.indexOf(thisRowData.receiverAddr);
						if(removeindex<=-1){
							$('.bottomBox').append('<a href="javascript:;" class="tips left relative" ' +
									'data-value="sjr_'+thisRowData.receiverAddr+'">'+
									thisRowData.receiverAddr+'<em></em></a>');
							relationArr.push(thisRowData.receiverAddr);
						}
					}
					if(thisRowData.senderAddr!=null&&thisRowData.senderAddr!=''){
						//增加发件人
						var removeindex = relationArr.indexOf(thisRowData.senderAddr);
						if(removeindex<=-1){
							$('.bottomBox').append('<a href="javascript:;" class="tips left relative" ' +
									'data-value="fjr_'+thisRowData.senderAddr+'">'+
									thisRowData.senderAddr+'<em></em></a>');
							relationArr.push(thisRowData.senderAddr);
						}
					}

					$('.bottomBox').stop().animate({bottom:'0px'},500);
					clearTimeout(timer);
					timer = setTimeout(function(){
						$('.bottomBox').stop().animate({bottom:'-'+($('.bottomBox').height()+30)+'px'},500);
					},10000);
					if($('.bottomBox').children('a').length === 0){
						$('.bottomBox').html('<span class="noData">暂无数据！</span>');
					}
				}
			},
			onUnCheck : function(_this,thisRowData){
				$('.noData').remove();
				//去掉选中
				$('.bottomBox a').each(function(i,item){
					if(_this.id+"_row_"+thisRowData.id === $(item).attr('data-value')){
						$(item).remove();
					}
				});
				//删除收件人
				$('.bottomBox a').each(function(j,item1){
					if(("sjr_"+thisRowData.receiverAddr) === $(item1).attr('data-value')){
						$(item1).remove();
					}
				});
				var removeindex2 = relationArr.indexOf(thisRowData.receiverAddr);
				if(removeindex2>-1){
					relationArr.splice(removeindex2,1);
				}
				//删除发件人
				$('.bottomBox a').each(function(k,item2){
					if(("fjr_"+thisRowData.senderAddr) === $(item2).attr('data-value')){
						$(item2).remove();
					}
				});
				var removeindex3 = relationArr.indexOf(thisRowData.senderAddr);
				if(removeindex3>-1){
					relationArr.splice(removeindex3,1);
				}
				
				if($('.bottomBox').children('a').length === 0){
					$('.bottomBox').html('<span class="noData">暂无数据！</span>');
				}
			},
			rowClick : function(grid,record){
				$('.bg_leftBorder').removeClass('bg_leftBorder');
				$(record.rowDom).children('td:eq(0)').addClass('bg_leftBorder');
				
				//发送请求，获取邮件详情
				$.ajax({
					url : base+'/email/detail',
					type : 'get',
					data : {id : record.rowDomData.id},
					success : function(data){
						//需要高亮显示的关键词
						var zt = $("#full_text").val();
						
						var email = data.data;
						$('#email_title').html(email.theme);
						$('#email_rec').html(email.receiverAddr);
						
						var att_html = '';
						var att_uri = email.attUri;
						var att_uris = [];
						var att_name = email.attName;
						var att_names = [];
						if(att_uri != undefined && att_uri != ''){
							att_uris = att_uri.split(',');
						}
						if(att_name != undefined && att_name != ''){
							att_names = att_name.split(',');
						}
						for(var i = 0 ; i < att_uris.length ; i++ ){
							//高亮显示附件搜索内容-start
							var rindex = att_names[i].indexOf(zt);
							if(rindex>-1){
//								att_names[i].substring(0,rindex);
//								att_names[i].substring(rindex+zt.length,att_names[i].length);
//								var c3 = att_names[i].split(zt);//邮件附件
//								if(c3.length>1){
//									att_names[i]=c3[0]+'<span style="color: red;">'+zt+'</span>'+c3[1];
//								}
								att_names[i]=att_names[i].substring(0,rindex)+'<span style="color: red;">'+zt+'</span>'+att_names[i].substring(rindex+zt.length,att_names[i].length);
							}
							//高亮显示附件搜索内容-end
							att_html += '<a class="downloadFile" href="'+base+'/email/att?url='+att_uris[i]+'">'+att_names[i]+'</a>&nbsp;&nbsp;&nbsp;&nbsp;';
						}
						$('#email_att').html(att_html);
						$('#email_content').html(data.data.content);
						//高亮显示标题&正文搜索内容-start
						if(zt!=null && zt!=""){
							var c1 = data.data.theme.split(zt);//邮件标题
							var c2 = data.data.content.split(zt);//邮件正文
							if(c1.length>1){
								$('#email_title').html(c1[0]+'<span style="color: red;">'+zt+'</span>'+c1[1]);
							}
							if(c2.length>1){
								$('#email_content').html(c2[0]+'<span style="color: red;">'+zt+'</span>'+c2[1]);
							}
						}
						//高亮显示标题&正文搜索内容-end
						
					}
				});
				
				$('.contentDiv').removeClass('hide').removeAttr('style');
			},
			zebra : true, //配置表格组件是否有隔行换色效果
			cellEmpty : "", //当个单元格内容检索为undefined时使用临时替代字符
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
				display : '邮件类型',
				name: 'boxType',
				width:170,
				formatter : function(val, row) {
					return '<span style="color:#2c3e50;">' + val + '</span>';
				}
			}, {
				display : '收件人',
				name : 'receiverAddr',
				formatter : function(val, row) {
					return '<span name="shoujianren" style="color:#2c3e50;">' + val + '</span>';
				},
				width:300
			}, {
				display : '发件人',
				name : 'senderAddr',
				formatter : function(val, row) {
					return '<span name="fajianren" style="color:#7f8c8d;">' + val + '</span>';
				},
				width:300
			}, {
				display : '主题 ',
				name : 'theme'
			}, {
				display : '日期 ',
				name : 'formatEmailTime',
				sortAble : true
			}],
			listeners : {
				render : function() {
					$('#'+this.id+'_grid_hd_box').hide();
				},
				reloadGrid : function() {
				}
			}
		});
	}
	

	/**
	 *  @descript
	 * 				查看详情
	 */
	function showDetail(obj,id,account) {
		var that = $(obj);
		that.toggleClass('trange_d');
		if(!that.attr('hasTable')){
			that.attr('hasTable',true);
			showTable(id, $('.tableResult').parent().width()-10,account);
		}else{
			that.parent().next().children('div').toggle();
		}
	}

	/**
	 *  @descript
	 * 				添加分析
	 */
	function addAnalys(obj, id) {
		if (!$(obj).hasClass('slt')) {
			$(obj).addClass('slt').html('取消分析');
		} else {
			$(obj).removeClass('slt').html('加入分析');
		}
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
			width:160,
			listHeight : 150,
			isMultiple : false,
			editable: false,
			listeners: {
	          	render: function() {
					var $slider = $('#'+this.id+' .r-combobox-slider'),
					$dd = $slider.find('dd'),
					h_unit = $dd.outerHeight(),
					h = Math.ceil(h_unit*$dd.length);
				}
			}
		},
		api = null,
		settings = null;
	$.each(comboboxs, function(i, combobox) {
		settings = $.extend(true, {}, defaults, combobox);
		if ($('#'+combobox.id).length>0) {
			$('#'+combobox.id).html('');
			api = Run.create("ComboBox", settings);
			apis[combobox.id] = api;
		}
		// 添加滚动条
		addScroll(settings.id+' .r-combobox-slider-box');
	});
	return apis;
}