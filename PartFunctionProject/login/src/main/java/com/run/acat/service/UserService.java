package com.run.acat.service;

import com.run.acat.entity.User;

/**
 * Created by user on 2018/9/17.
 */
public interface UserService {

    //根据用户名查询用户信息
    User getUserByAccount(String userAccount);

    //登录验证
    boolean login(User user);

}
