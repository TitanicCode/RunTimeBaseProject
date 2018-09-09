package com.custom.dao;

import com.custom.pojo.TbUser;

/**
 * Created by user on 2018/9/7.
 */
public interface TbUserMapper {
    TbUser selectById(Integer id);
    int insertTbUser(TbUser tbUser);
}
