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

</body>
</html>
