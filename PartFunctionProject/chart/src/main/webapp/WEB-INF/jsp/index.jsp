<%--<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">--%>
<%@ page import="org.jfree.chart.servlet.ServletUtilities,com.custom.utils.CharUtil" %>
<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2018/9/12
  Time: 16:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Java图书销量统计</title>
</head>
<body>

<%--ServletUtilities类的saveChartAsJPEG()方法进行生成，它返回一个.jpeg格式的图片名称
    参数的说明:
    chart :制图对象JFreeChartford
    width:所生成图片的宽度
    height:所生成图片的高度
    session”HttpSession对象
    通过此方法生成图片后，调用已注册的JFreeChart提供的Servlet类DisplayChart，即可获取到图片的相对路径。
--%>
<%
    String fileName = ServletUtilities.saveChartAsJPEG(CharUtil.createChart(),450,300,session);
    String graphURL = request.getContextPath() + "/chart?filename=" + fileName;
%>

<img src="<%=graphURL%>" border="1">



    <%--生成饼图的jsp代码--%>
    <%--<body> --%>
    <%--<%  //通过saveAsJPEG()方法生成饼状图的JPEG图像，并返回一个临时图像名称--%>
               <%--String filename = ServletUtilities.saveChartAsJPEG(ChartUtil.createChart(),400,300,session);--%>
               <%--String chartUrl = path+"/DisplayChart?filename="+filename;//获取生成图像的相对路径--%>
     <%--%>--%>
     <%--<img alt="" src="<%=chartUrl %>">--%>
  <%--</body>--%>


    <%--生成柱状图--%>
<%--<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>--%>
<%--<%@ page import="org.jfree.chart.servlet.ServletUtilities"  %>--%>
<%--<%@ page import="com.lh.util.ChartUtil"  %>--%>
<%--<%--%>
    <%--String path = request.getContextPath();--%>
    <%--String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";--%>
<%--%>--%>
<%--<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">--%>
<%--<html>--%>
<%--<head>--%>
    <%--<base href="<%=basePath%>">--%>
    <%--<title>生成柱状图</title>--%>
    <%--<meta http-equiv="pragma" content="no-cache">--%>
    <%--<meta http-equiv="cache-control" content="no-cache">--%>
    <%--<meta http-equiv="expires" content="0">--%>
    <%--<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">--%>
    <%--<meta http-equiv="description" content="This is my page">--%>
    <%--<!----%>
    <%--<link rel="stylesheet" type="text/css" href="styles.css">--%>
    <%---->--%>
<%--</head>--%>
<%--<body>--%>
<%--<%--%>
    <%--String filename = ServletUtilities.saveChartAsJPEG(ChartUtil.createChart(),400,300,session);--%>
    <%--String chartUrl = path+"/DisplayChart?filename="+filename;--%>
<%--%>--%>
<%--<img alt="" src="<%=chartUrl %>">--%>
<%--</body>--%>
<%--</html>--%>

    <%--生成区域图--%>
<%--<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>--%>
<%--<%@ page import="org.jfree.chart.servlet.ServletUtilities"  %>--%>
<%--<%@ page import="com.lh.util.ChartUtil"  %>--%>
<%--<%--%>
    <%--String path = request.getContextPath();--%>
    <%--String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";--%>
<%--%>--%>

<%--<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">--%>
<%--<html>--%>
<%--<head>--%>
    <%--<base href="<%=basePath%>">--%>

    <%--<title>生成区域图</title>--%>
    <%--<meta http-equiv="pragma" content="no-cache">--%>
    <%--<meta http-equiv="cache-control" content="no-cache">--%>
    <%--<meta http-equiv="expires" content="0">--%>
    <%--<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">--%>
    <%--<meta http-equiv="description" content="This is my page">--%>
    <%--<!----%>
    <%--<link rel="stylesheet" type="text/css" href="styles.css">--%>
    <%---->--%>
<%--</head>--%>

<%--<body>--%>
<%--<%--%>
    <%--String filename = ServletUtilities.saveChartAsJPEG(ChartUtil.createChart(),400,300,session);--%>
    <%--String chartUrl = path+"/DisplayChart?filename="+filename;--%>
<%--%>--%>
<%--<img alt="" src="<%=chartUrl %>">--%>
<%--</body>--%>
<%--</html>--%>

<%--<title>生成时序图</title>--%>
<%--<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>--%>
<%--<%@ page import="org.jfree.chart.servlet.ServletUtilities"  %>--%>
<%--<%@ page import="com.lh.util.*"  %>--%>
<%--<%--%>
    <%--String path = request.getContextPath();--%>
    <%--String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";--%>
<%--%>--%>

<%--<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">--%>
<%--<html>--%>
<%--<head>--%>
    <%--<base href="<%=basePath%>">--%>

    <%--<title>生成时序图</title>--%>
    <%--<meta http-equiv="pragma" content="no-cache">--%>
    <%--<meta http-equiv="cache-control" content="no-cache">--%>
    <%--<meta http-equiv="expires" content="0">--%>
    <%--<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">--%>
    <%--<meta http-equiv="description" content="This is my page">--%>
    <%--<!----%>
    <%--<link rel="stylesheet" type="text/css" href="styles.css">--%>
    <%---->--%>
<%--</head>--%>

<%--<body>--%>
<%--<%--%>
    <%--String filename = ServletUtilities.saveChartAsJPEG(TimeSeriesUtil.getTimeSeriesChart(),700,400,session);--%>
    <%--String chartUrl = path+"/DisplayChart?filename="+filename;--%>
<%--%>--%>
<%--<img alt="" src="<%=chartUrl %>">--%>
<%--</body>--%>
<%--</html>--%>
</body>
</html>
