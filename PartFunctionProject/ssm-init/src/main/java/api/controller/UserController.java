package api.controller;

import api.pojo.User;
import api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by user on 2018/9/9.
 */
@Controller
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("insertUser")
    @ResponseBody
    public String insertUser(){
        User user=new User();
        user.setGender("女");
        user.setPassword("root");
        user.setUsername("guangli");

        int i = userService.insertUser(user);
        if (i>0){
            return "插入成功";
        }
        return "插入失败";
    }
}
