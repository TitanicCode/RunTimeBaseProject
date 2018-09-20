package com.run.acat.service.impl;

import com.run.acat.dao.UserMapper;
import com.run.acat.entity.User;
import com.run.acat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by user on 2018/9/17.
 */
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;

    //根据用户名查询用户信息
    @Override
    public User getUserByAccount(String userAccount) {
        return userMapper.getUserByAccount(userAccount);
    }

    //登录验证
    @Override
    public boolean login(User userInput) {
        String userAccount = userInput.getAccount();
        if (userAccount==null||userAccount.equals("")){
            return false;
        }
        User userGetInDb = getUserByAccount(userAccount);

        if (userGetInDb==null||userGetInDb.equals("")){
            return false;
        }

        String passwordmd = userGetInDb.getPasswordmd();

        String passwordmdInput=userInput.getPasswordmd();


        if (passwordmd==null||passwordmd.equals("")||!passwordmd.equals(passwordmdInput)){
            return false;
        }

        return true;
    }
}
