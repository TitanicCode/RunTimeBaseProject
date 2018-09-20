package com.run.acat.dao;

import com.run.acat.entity.User;

/**
 * Created by user on 2018/9/17.
 */
public interface UserMapper {

    //根据用户名查询用户信息
    User getUserByAccount(String userAccount);
}
