package api.service;

import api.pojo.User;
import org.springframework.stereotype.Service;

/**
 * Created by user on 2018/9/9.
 */

public interface UserService {
    int insertUser(User user);
}
