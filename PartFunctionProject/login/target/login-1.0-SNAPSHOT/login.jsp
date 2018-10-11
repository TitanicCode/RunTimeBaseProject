<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2018/9/17
  Time: 10:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/view/common.jsp"%>

<%--
    <!DOCTYPE> 声明必须是 HTML 文档的第一行，位于 <html> 标签之前。
    <!DOCTYPE> 声明不是 HTML 标签；它是指示 web 浏览器关于页面使用哪个 HTML 版本进行编写的指令。
    在 HTML 4.01 中，<!DOCTYPE> 声明引用 DTD，因为 HTML 4.01 基于 SGML。DTD 规定了标记语言的规则，这样浏览器才能正确地呈现内容。
    HTML5 不基于 SGML，所以不需要引用 DTD。
    提示：请始终向 HTML 文档添加 <!DOCTYPE> 声明，这样浏览器才能获知文档类型。
--%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
    <%--
        https://blog.csdn.net/h330531987/article/details/70042511
        <meta>元数据标签，主要属性两个，一个是name，另一个是http-equiv，下面两句代码仅用到了http-equiv
    --%>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X_UA-Compatible" content="IE=edge" />

    <title>分析工具应用中心</title>

    <%--
        http://www.w3school.com.cn/tags/att_link_rel.asp
        rel 属性规定当前文档与被链接文档之间的关系,stylesheet:文档的外部样式表。
        只有 rel 属性的 "stylesheet" 值得到了所有浏览器的支持。其他值只得到了部分地支持。
    --%>
    <link rel="stylesheet" type="text/css" href="${base }/res/css/global.css" />
    <link rel="stylesheet" type="text/css" href="${base }/res/css/style.css"/>


    <script src="${base}/res/js/jquery-1.7.2.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${base}/res/js/jquery.cookie.js" type="text/javascript" charset="utf-8"></script>
    <script src="${base}/res/js/md5-min.js" type="text/javascript" charset="utf-8"></script>
</head>

<body class="loginbg">

<%--alt表示图片加载错误时的显示内容--%>
<img src="${base }/res/images/bg.jpg" alt="" class="bodybg"/>
<div class="loginBody" id="loginBody">
    <h4 class="loginLogo"></h4>
    <div class="clearfix">
        <div class="loginL left"></div>
        <div class="loginR left">
            <h5>欢迎登录工具应用中心</h5>
            <div class="clearfix relative marginT50">
                <input type="text" class="loginInput" id="username" tabindex="1"/>
                <span class="username_icon"></span>
            </div>
            <div class="clearfix relative marginT15">
                <input type="password" class="loginInput" id="password" tabindex="2"/>
                <span class="pwd_icon"></span>
            </div>
            <div class="clearfix marginT15" id="rem">
                <%--
                    toggleClass:$中获取的元素有变化，则toggleClass()函数中的'slt'会相应的设置或删除
                --%>
                <a class="chkBox left" onclick="$(this).toggleClass('slt');" tabindex="-1"><em>记住密码</em></a>
            </div>
            <a href="javascript:;" class="loginBtn" id="login" tabindex="-1">登录</a>
        </div>
    </div>
</div>
<div class="indexBody relative" id="indexBody">
    <h4 class="loginLogo"></h4>
    <div class="clearfix indexBox">
        <div class="indexL left relative">
            <a href="javascript:;" class="indexBtn" id="email-parser" tabindex="-1">邮件分析工具</a>
        </div>
        <div class="indexR left relative">
            <a href="javascript:;" class="indexBtn" id="financial-parser" tabindex="-1">金融分析工具</a>
        </div>
    </div>
    <a href="javascript:;" class="logout" id="logout" tabindex="-1">退出</a>
</div>
</body>

<script>
    $(function(){
        //登陆输入框点击
        $('.loginInput').on('click',function(){
            $(this).parent().addClass('selt');
        });
        $('.loginInput').on('blur',function(){
            if($(this).val() == ''){
                $(this).parent().removeClass('selt');
            }
        });
        var backmain = window.location.search;
        $("#username").val($.cookie("currentsessionname"));
        $("#password").val($.cookie("currentsessionid"));
        if($.cookie("rememberme")){
            $("#rem .chkBox:first").addClass("slt");
        }

        //点击登陆
        $('#login').off('click').on('click',function(){

            var name=$("#username").val();
            var password = $("#password").val();

            var message="";
            $.ajax({
                type:"post",
                url:"${base}/logon",
                data:{"account":name,"password":password,"passwordmd":hex_md5(password)},
                //data:{"name":name,"password":password,"passwordmd":hex_md5(password)},
                success:function(data){
                    var status = data.status;
                    if(status == "1"){
                        $('#loginBody').animate({
                            left:'0%',
                            marginLeft:'-990px'
                        },1000);
                        $('#indexBody').animate({
                            left:'50%',
                            marginLeft:'-495px'
                        },1000);

                        //处理cookie
                        if($("#rem .slt")[0]){ //是否勾选记住密码
                            $.cookie("currentsessionname",name,{expires:7});
                            if(! $.cookie("currentsessionid")){
//                                $.cookie("currentsessionid",hex_md5(password),{expires:7});
                                $.cookie("currentsessionid",password,{expires:7});
                            }
                            $.cookie("rememberme","yes",{expires:7});
                        }else{
                            $.cookie("currentsessionname","");
                            $.cookie("currentsessionid","");
                        }

                    }
                    else{
                        message = data.message;
                        alert(message);
                    }
                }
            });
        });
        if(backmain && backmain.indexOf('backmain')>-1){
            $('#loginBody').animate({
                left:'0%',
                marginLeft:'-990px'
            },1000);
            $('#indexBody').animate({
                left:'50%',
                marginLeft:'-495px'
            },1000);
            //$('#login').trigger('click');
        }
        //点击退出
        $('#logout').off('click').on('click',function(){
            $.ajax({
                type:"post",
                url:"${base}/logout",
                data:{},
                success:function(result){
                    if(result.status == "1"){
                        if(!$("#rem .slt")[0]){
                            $("#username").val("");
                            $("#password").val("");
                        }else{
                            $("#password").val($.cookie("currentsessionid"));
                        }

                        $('#loginBody').animate({
                            left:'50%',
                            marginLeft:'-495px'
                        },1000);
                        $('#indexBody').animate({
                            left:'100%',
                            marginLeft:'0px'
                        },1000);
                    } else {
                        alert(result.message);
                    }
                }
            });

        });

        //index 页面按钮划过效果
        $('.indexBtn').hover(function(){
            $(this).parent().addClass('slt');
        },function(){
            $(this).parent().removeClass('slt');
        });

        $("#email-parser").off('click').on('click',function(){
            window.location.href="${base}/index";
        })

        $("#financial-parser").off('click').on('click',function(){
            window.location.href="${base}/financial";
        })

        //回车提交
        $(document).keyup(function(event){
            if(event.keyCode == 13){
                $("#login").trigger("click");
            }
        });

    });


</script>

</html>
