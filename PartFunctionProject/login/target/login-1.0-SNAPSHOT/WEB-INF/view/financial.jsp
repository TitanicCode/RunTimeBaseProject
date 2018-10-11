<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X_UA-Compatible" content="IE=edge" />
<title>金融</title>
<link rel="stylesheet" type="text/css" href="${base}/res/financial/style/Window.css" />
<link rel="stylesheet" type="text/css" href="${base}/res/financial/style/ComboBox.css" />
<link rel="stylesheet" type="text/css" href="${base}/res/financial/style/global.css" />
<link rel="stylesheet" type="text/css" href="${base}/res/financial/style/style.css" />
<script type="text/javascript" src="${base}/res/financial/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="${base}/res/financial/js/jquery.placeholder.js"></script>
<script type="text/javascript" src="${base}/res/financial/js/run-min.js"></script>
<script type="text/javascript" src="${base}/res/financial/js/build/dist/echarts.js"></script>
<script type="text/javascript" src="${base}/res/financial/js/global.js"></script>
<style type="text/css">
.shadow_zxy {
    z-index: 950;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${base}/res/financial/images/window/r-window-mask.png) repeat;
    
}
</style>
</head>
<body>
	<div class="mainPage">
		<div class="indexTop">
			<a href="javascript:;" class="logo left"></a>
			<span class="welcome2 right">你好，${user.name} </span>
			<a href="${base}?backmain=1">
				<span class="homePage right"> <em>首页</em> </span>
			</a> 
			<c:if test="${user.id == '1'}">
				<a href="${base}/usermgr/index" target="_blank">
					<span class="welcome right"> <em>用户管理</em> </span>
				</a>
			</c:if> 
		</div>
		<div class="main clearfix">
			<div class="leftNav left">
				<div class="navTop clearfix">
					<h4 class="left">
						事件列表 <em id="event_Count"></em>
					</h4>
					<a href="javascript:;" class="normalBtnL right marginT3 addCase firstadd">
						<span class="normalBtnR"> 
						<span class="normalBtnC">
								<em class="btnicon_1">新建事件</em>
						</span>
					</span>
					</a>
				</div>
				<div class="navUl first">
				</div>
			</div>
			<div class="rightCon">
				<%-- <div class="rightTop clearfix">
					<h4 class="left" id="eventNamerightTop"></h4>
					
					<a href="javascript:;" onclick="javascript:excelDataListErrorPoint();" class="normalBtnL right marginT3"> 
						<span class="normalBtnR"> 
							<span class="normalBtnC2"> 
								<em>事件数据</em>
							</span>
						</span>
					</a>
					
					
					<a href="${base}/financial/excelAnalyzeList" target="_blank" class="normalBtnL right marginT3"> 
						<span class="normalBtnR"> 
							<span class="normalBtnC2"> 
								<em>解析记录</em>
							</span>
						</span>
					</a>
					
					<a href="javascript:;" class="normalBtnL right marginT3"> 
						<span class="normalBtnR"> 
							<span class="normalBtnC"> 
								<em class="btnicon_2" id="exportAnalyzeData">分析结果导出</em>
							</span>
						</span>
					</a>
					
					<div class="left phoneNum">
						<label class="left">涉京人员按手机归属地统计人数：</label>
						<span class="left marginR18" id="bjsjcount">0 <em>(个)</em></span>
						<label class="left">涉京人员按身份证统计人数：</label>
						<span class="left" id="bjsfzcount">0 <em>(个)</em></span>
					</div>
					
				</div> --%>
			
				<div class="rightTop2 clearfix">
					<h4 class="left" id="eventNamerightTop"></h4>
					
					<a href="javascript:;" onclick="javascript:AllEventDataListErrorPoint();" class="normalBtnL right marginT3"> 
						<span class="normalBtnR"> 
							<span class="normalBtnC2"> 
								<em>全事件数据检索</em>
							</span>
						</span>
					</a>
					
					<a href="javascript:;" onclick="javascript:excelDataListErrorPoint();" class="normalBtnL right marginT3"> 
						<span class="normalBtnR"> 
							<span class="normalBtnC2"> 
								<em>事件数据</em>
							</span>
						</span>
					</a>
					
					<a href="${base}/financial/excelAnalyzeList" target="_blank" class="normalBtnL right marginT3"> 
						<span class="normalBtnR"> 
							<span class="normalBtnC2"> 
								<em>解析记录</em>
							</span>
						</span>
					</a>
					
					 <a href="javascript:;" class="normalBtnL right marginT3"> 
						<span class="normalBtnR"> 
							<span class="normalBtnC"> 
								<em class="btnicon_2" id="exportAnalyzeData">分析结果导出</em>
							</span>
						</span>
					</a>
			 </div>
				<div class="rightTop3 clearfix">	  
					<div class="left phoneNum2">
						<label class="left myCounts">涉京人员按手机归属地统计人数：</label>
						<span class="left marginR18" id="bjsjcount">0 <em>(个)</em></span>
						<label class="left myCounts">涉京人员按身份证统计人数：</label>
						<span class="left" id="bjsfzcount">0 <em>(个)</em></span>
					</div>
					<div class="left phoneNum2">
						<label class="left myCounts">导入数据总条数：</label>
						<span class="left marginR18" id="impCount">0 <em>(个)</em></span>
						<label class="left myCounts">有效数据总条数：</label>
						<span class="left marginR18" id="validCount">0 <em>(个)</em></span>
						<label class="left myCounts">无效数据总条数：</label>
						<span class="left" id="invalidCount">0 <em>(个)</em></span>
					</div>
					<div class="left phoneNum3">
						<label class="left myCounts">身份证有效数据条数：</label>
						<span class="left marginR18" id="IDValidCount">0 <em>(个)</em></span>
						<label class="left myCounts">身份证无效数据条数：</label>
						<span class="left marginR18" id="IDInvalidCount">0 <em>(个)</em></span>
						<label class="left myCounts">手机号有效数据条数：</label>
						<span class="left marginR18" id="phoneValidCount">0 <em>(个)</em></span>
						<label class="left myCounts">手机号无效数据条数：</label>
						<span class="left" id="phoneInvalidCount">0 <em>(个)</em></span>
					</div>
				</div>	
				
				<ul class="rightMain clearfix hide">
					<li class="left" style="width: 99%;height: 25px;background-color: #fff;padding-left: 3px;">
						<div class="left" style="margin-top: 1px;margin-bottom: 11px;margin-left: 2px;line-height: 22px;border: 1px solid #555;padding: 0 10px;">
							<h4 class="left">
								<label class="left" style="color: green;">身份证有效：</label>
								<input type="radio" id="sfz1" name="sfz" checked="checked" onclick="idIsAbleSet1();" value="0" style="margin-top: 6px;margin-left: 0px;">
								<!-- onclick="idIsAbleSet();" -->
							</h4>
							<!-- <h4 class="left">
								<label class="left" style="color: red;">身份证无效：</label>
								<input type="radio" id="sfz2" name="sfz" style="margin-top: 6px;margin-left: 0px;">
							</h4> -->
							<h4 class="left" id="idCardNo">
								<label class="left" style="color: red;">身份证无效：</label>
									<input type="radio" id="sfz1" name="sfz" value="1" onclick="idIsUnableSetsjh();"  style="margin-top: 6px;margin-left: 0px;">
									<!-- onclick="idIsUnableSet();" -->
							</h4>
						</div>
						
						<div class="left" style="margin-top: 1px;margin-bottom: 11px;margin-left: 5px;line-height: 22px;border: 1px solid #555;padding: 0 10px;">
							<h4 class="left">
								<label class="left" style="color: green;">手机号有效：</label>
								<input type="radio" id="sjh0" name="sjh" checked="checked" value="0" style="margin-top: 6px;margin-left: 0px;">
							</h4>
							<h4 class="left" id="phoneIsUnable">
								<label class="left" style="color: red;">手机号无效：</label>
								<input type="radio" id="sjh1" name="sjh"  value="1" style="margin-top: 6px;margin-left: 0px;">
							</h4>
							<h4 class="left" id="phoneIsUnableOrAble">
								<label class="left" style="color: red;">无论手机号有效无效：</label>
								<input type="radio" id="sjh2" name="sjh" value="2" style="margin-top: 6px;margin-left: 0px;">
							</h4>
						</div>
						<a href="javascript:;" class="normalBtnL left"> 
							<span class="normalBtnR"> 
								<span class="normalBtnC"> 
									<em style="padding: 0px 18px 0px 20px;" id="sxSearch">刷新</em>
								</span>
							</span>
						</a>
						<a href="javascript:;" onclick="javascript:invalidData();" class="normalBtnL left"> 
							<span class="normalBtnR"> 
								<span class="normalBtnC2"> 
									<em>无效数据汇总</em>
								</span>
							</span>
						</a>
					</li>
					
					<li class="left relative liL relate-bj">
						<div class="liR">
							<div class="liC">
								<div class="eachartSize" id="eachartbar_1"></div>
								<a href="javascript:;" class="closeIcon_1"></a>
							</div>
						</div>
					</li>
					
					<li class="left relative liL" id="eachartpie_11">
						<div class="liR">
							<div class="liC">
								<div class="pieLi">
									<div class="eachartSize" id="eachartpie_1"></div>
									<a href="javascript:;" class="closeIcon_1"></a>
								</div>
							</div>
						</div>
					</li>
					
					<li class="left relative liL" id="eachartpie_12">
						<div class="liR">
							<div class="liC">
								<div class="pieLi">
									<div class="eachartSize" id="eachartpie_2"></div>
									<a href="javascript:;" class="closeIcon_1"></a>
								</div>
							</div>
						</div>
					</li>
					
					<li class="left relative liL" id="eachartpie_13">
						<div class="liR">
							<div class="liC">
								<div class="pieLi">
									<div class="eachartSize" id="eachartpie_3"></div>
									<a href="javascript:;" class="closeIcon_1"></a>
								</div>
							</div>
						</div>
					</li>
					
					<li class="left relative liL relate-bj">
						<div class="liR">
							<div class="liC">
								<div class="eachartSize" id="eachartbar_2"></div>
								<a href="javascript:;" class="closeIcon_1"></a>
							</div>
						</div>
					</li>
					
					<li class="left relative liL relate-bj">
						<div class="liR">
							<div class="liC">
								<div class="eachartSize" id="eachartbar_3"></div>
								<a href="javascript:;" class="closeIcon_1"></a>
							</div>
						</div>
					</li>
					
					<!-- 自定义添加按钮 -->
					<li class="left relative liL">
						<div class="liR">
							<div class="liC">
								<a href="javascript:;" class="addli"></a>
							</div>
						</div>
					</li>
				</ul>
				<!-- 无数据-->
				<div class="nodataBig"></div>
			</div>
		</div>
	</div>
	<div class="firstLogin" id="firstLogin"></div>
	<input type="hidden" id="ctxValue" value="${base}"></input>
	<script type="text/javascript" src="${base}/res/financial/js/index.js?v=1.1.5"></script>
	<script type="text/javascript" src="${base}/res/financial/js/popaddechart.js?v=1.1.5"></script>
</body>
</html>