package api.service.impl;

import api.pojo.User;
import api.service.UserService;
import api.dao.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by user on 2018/9/9.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public int insertUser(User user) {
        int i = userMapper.insertUser(user);
        return i;
    }
}
