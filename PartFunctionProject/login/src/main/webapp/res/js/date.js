/*
 * auth:
 * 		zhangzq
 * date:
 *  	2014-11-15
 * desc:
 * 		对日期的一些基本处理
 */

$(function(){
	timeMethod();
});

// 初始化日期控件，并显示初始日期为7天
function timeMethod(){
	$("body").on("click",".j_toTimeDD",function(){
		if (!$(this).hasClass('disabled')) {
			//WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',currentText:'现在'});
			WdatePicker({dateFmt:'yyyy-MM-dd'});
		}	
	});// 调用时间插件
	$("#startTime,#endTime").click(function(){
		if (!$(this).hasClass('disabled')) {
			WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'});
		}
	});
	$("#startime2,#endTime2").click(function(){
		if (!$(this).hasClass('disabled')) {
			WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'});
		}
	});
	$("#startime3,#endTime3").click(function(){
		if (!$(this).hasClass('disabled')) {
			WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'});
		}
	});
	
}

function changeTimeByRadio (_this,commonParentsSelector,num) {
	var $inp_false = $(_this).find(".r-radio-inpfalse"),
	    items = $(_this).siblings(".r-radio-item"),
	    num = parseInt(num),
	    $times = $(_this).closest(commonParentsSelector).find('.selectTime');

    if(!$inp_false.hasClass("r-radio-chk")){
       items.find(".r-radio-chk").removeClass('r-radio-chk').find('input').removeProp('checked');
       $inp_false.addClass("r-radio-chk").find('input').prop('checked',true);
		if (isNaN(num)) {
			$times.val('');
			$times.parent().removeClass('hide');
		} else{
			$times.parent().addClass('hide');
			oTime = getTimeByDate(num,'DD');
			$times.eq(0).val(oTime.startTime).end().eq(1).val(oTime.endTime);
		}
	}
}

// 根据num数值，算出前几天的时间
function getDateByNum(num){
	var currentTime = new Date(); // ��ȡ��ǰ����
	var currentNum = currentTime.getTime(); // ��ȡ��ǰ���ڵ�ǧ����
	var tmpNum = num*24*60*60*1000;  // ��ȡ�������ǧ����
	var resultTime = new Date(currentNum-tmpNum); // �õ�ǰ����ʱ���ǧ����
	return getDateVal(currentTime,num,'end')+"|"+getDateVal(resultTime,num,'start');
}

// 根据date日期对象，拼接出日期字符串
function getDateVal(date,num,type){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	// 小于10的在前面补0
	if(num<0 || type=='end'){
		return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+ (h<10?'0'+h:h) + ':' + (mi<10?'0'+mi:mi) + ':' + (s<10?'0'+s:s);
	}
	else{
		return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' 00:00:00';
	}
}
// 根据date日期对象，拼接出日期字符串
function formatDate(date,type){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var s = date.getSeconds();
    // 小于10的在前面补0
    if(type=='DD'){
        return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d);
    }else if(type=='HH'){
        return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+ (h<10?'0'+h:h);
    }else if(type=='MM'){
        return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+ (h<10?'0'+h:h) + ':' + (mi<10?'0'+mi:mi);
    }else{
        return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+ (h<10?'0'+h:h) + ':' + (mi<10?'0'+mi:mi)+ ':' + (s<10?'0'+s:s);
    }
}
// 根据day的天数，算出相差的时间，并返回给前台
function getTimeByDay(day,startId,endId){
	var startTime = "startTime";
	var endTime = "endTime";
	startTime = (startId?startId:startTime);
	endTime = (endId?endId:endTime);
	$("#"+startTime).prop('disabled',"disabled");
	$("#"+endTime).prop("disabled","disabled");
	if(day!=null && day!="" && day!=-1){
		// ��ȡ��ʼ�ͽ���ʱ��
		var resultTime = getDateByNum(day-1);
		// ��ʱ�丳ֵ�����ڿؼ���input��
		$("#"+startTime).val(resultTime.split('|')[1]);
		$("#"+endTime).val(resultTime.split('|')[0]);
		//$("#"+startTime).parent(".siftCalendar").addClass("hide");
	}else{
		$("#"+startTime).removeProp('disabled');
		$("#"+endTime).removeProp('disabled');

	}
	
}
// 根据天数，算出相差的时间，并返回给前台
function getTimeByDate(num,type){
        var end=new Date();
        var start=new Date(end-num*24*60*60*1000);
        var endTime=formatDate(end,type);
        var startTime=formatDate(start,type);
        return {"startTime":startTime,"endTime":endTime};
}
// 根据月，算出相差的时间，并返回给前台
function getTimeByMonth(num,obj,type){
	if(obj.checked){
		var date=new Date();
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		var h = date.getHours();
        var mi = date.getMinutes();
        var s = date.getSeconds();
		var m1=m-num>0?m-num:12+m-num;
		if(type=='DD'){
		    var startTime=(m-num<0?y-1:y)+'-'+(m1<10?'0'+m1:m1)+'-'+(d<10?'0'+d:d);
            var endTime=y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d);
        }else if(type=='HH'){
            var startTime=(m-num<0?y-1:y)+'-'+(m1<10?'0'+m1:m1)+'-'+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h);
            var endTime=y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h);
        }else if(type=='MM'){
            var startTime=(m-num<0?y-1:y)+'-'+(m1<10?'0'+m1:m1)+'-'+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h)+':'+(mi<10?'0'+mi:mi);
            var endTime=y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h)+':'+(mi<10?'0'+mi:mi);
        }else{
            var startTime=(m-num<0?y-1:y)+'-'+(m1<10?'0'+m1:m1)+'-'+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h)+':'+(mi<10?'0'+mi:mi)+':'+(s<10?'0'+s:s);
            var endTime=y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+':'+(mi<10?'0'+mi:mi)+':'+(s<10?'0'+s:s);
        }
		$(obj).closest(".radioSelectTime").find(".startTime").val(startTime).attr("disabled","disabled");
		$(obj).closest(".radioSelectTime").find(".endTime").val(endTime).attr("disabled","disabled");
	}else{
		// �Զ���ʱ��
		$(obj).closest(".radioSelectTime").find(".startTime").val("");
		$(obj).closest(".radioSelectTime").find(".endTime").val("");
	}
	
}
// 根据年，算出相差的时间，并返回给前台
function getTimeByYear(num,obj,type){
	if(obj.checked){
        var date=new Date();
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        var h = date.getHours();
        var mi = date.getMinutes();
        var s = date.getSeconds();
        if(type=='DD'){
            var startTime=(y-num)+'-'+m+'-'+d;
            var endTime=y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d);
        }else if(type=='HH'){
            var startTime=(y-num)+'-'+m+'-'+d+' '+(h<10?'0'+h:h);
            var endTime=y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h);
        }else if(type=='MM'){
            var startTime=(y-num)+'-'+m+'-'+d+' '+(h<10?'0'+h:h)+':'+(mi<10?'0'+mi:mi);
            var endTime=y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h)+':'+(mi<10?'0'+mi:mi);
        }else{
            var startTime=(y-num)+'-'+m+'-'+d+' '+(h<10?'0'+h:h)+':'+(mi<10?'0'+mi:mi)+':'+(s<10?'0'+s:s);
            var endTime=y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h)+':'+(mi<10?'0'+mi:mi)+':'+(s<10?'0'+s:s);
        }
        $(obj).closest(".radioSelectTime").find(".startTime").val(startTime).attr("disabled","disabled");
        $(obj).closest(".radioSelectTime").find(".endTime").val(endTime).attr("disabled","disabled");
    }else{
        // �Զ���ʱ��
        $(obj).closest(".radioSelectTime").find(".startTime").val("");
        $(obj).closest(".radioSelectTime").find(".endTime").val("");
    }
	
}
//自定义
function getTimeBySelf(obj){
	if(obj.checked){
		$(obj).closest(".radioSelectTime").find(".startTime").val("").removeAttr("disabled");
		$(obj).closest(".radioSelectTime").find(".endTime").val("").removeAttr("disabled");
	}else{
		// �Զ���ʱ��
		$(obj).closest(".radioSelectTime").find(".startTime").val("");
		$(obj).closest(".radioSelectTime").find(".endTime").val("");
	}
}
// 可以手动输入时间（如201412231226）；obj表示前台日期文本框的对象
function changeTime(obj){
	var time = $(obj).val();
	// 验证日期是否为正常日期
	var dateFormat=/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/;
	if(time!=null && time!=""){
		time = time.replace(new RegExp(/(\/)/g),'').replace(new RegExp(/(-)/g),'').replace(new RegExp(/( )/g),'').replace(new RegExp(/(:)/g),'');
		if(time.length==12){ // 输入12为的日期，表示到分钟
			time = time.substring(0,4)+"/"+time.substring(4,6)+"/"+time.substring(6,8)+" "+time.substring(8,10)+":"+time.substring(10,12);
		}else if(time.length==8){ // 输入8为的长度，表示到天
			time = time.substring(0,4)+"/"+time.substring(4,6)+"/"+time.substring(6,8);
		}else{
			alert("请输入日期到天或到分结束的时间!");
			$(obj).val("");
			return false;
		}
		// 处理输入的日期是否为有效日期
		if(dateFormat.test(time.split(" ")[0].replace(new RegExp(/(\/)/g),'-'))){
			var date = new Date(time);
			$(obj).val(getDateVal(date,-1));
		}else{
			alert("您输入的日期不是正常的日期,请重新输入！");
			$(obj).val("");
		}
	}
	// 隐藏日期控件
	$('div').each(function(i){
		if(i==0){
			$(this).hide();
		}
	});
}

// 判断开始时间不能大于结束时间
function onemonthtypeChange(obj,id1,id2){
	var start = $("#"+id1).val();
	var end = $("#"+id2).val();
	if(start!=null && start!="" && end!=null && end!="" ){
		var startNum , endNum;
		if(start.length>5){
			startNum = parseInt(start.replace(/-/g,'').replace(' ','').replace(/:/g,''),10);
			endNum = parseInt(end.replace(/-/g,'').replace(' ','').replace(/:/g,''),10);
		}else{
			startNum = parseInt(start.replace(/:/g,''),10);
			endNum = parseInt(end.replace(/:/g,''),10);
		}
		if(startNum>endNum){
			$(obj).val("");
			alert("开始时间不能大于结束时间");
			return false;
		}
	}
	return true;
}

// 回车方法
function dateEnter(obj){
	// 获取鼠标点击事件
	var e = arguments.callee.caller.arguments[0] || window.event;
	if(e.keyCode==13){
		changeTime(obj);
		onemonthtypeChange();
	}
}
