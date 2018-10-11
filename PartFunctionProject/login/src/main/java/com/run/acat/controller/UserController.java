package com.run.acat.controller;


import com.run.acat.entity.User;
import com.run.acat.service.UserService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Created by user on 2018/9/17.
 */
@Controller
public class UserController {

    @Autowired
    private UserService userService;

    //登录
    @RequestMapping("/logon")
    @ResponseBody
    public JSONObject logon(User user, HttpServletResponse response, HttpServletRequest request){

        boolean loginResult=userService.login(user);
        JSONObject result=new JSONObject();

        if (loginResult){
            result.put("status", "1");
            result.put("message", "登陆成功");

            HttpSession session=request.getSession();
            session.setAttribute("user",userService.getUserByAccount(user.getAccount()));
        }else{
            result.put("status", "0");
            result.put("message", "用户名或密码错误");
        }
        return result;
    }

    //注册
    @RequestMapping("/register")
    public String register(){
        return "register";
    }

    //注销退出
    @RequestMapping("logout")
    @ResponseBody
    public JSONObject logout(HttpServletRequest request,HttpServletResponse response,User user){

        JSONObject result=new JSONObject();

        result.put("status","0");
        result.put("message","注销退出失败");

        try {
            HttpSession session = request.getSession();
            session.setAttribute("user",null);
            result.put("status","1");
            result.put("message",null);
        }catch(Exception e){
            e.printStackTrace();
        }

        return result;
    }
}
