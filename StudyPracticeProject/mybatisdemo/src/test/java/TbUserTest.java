import com.custom.dao.TbUserMapper;
import com.custom.pojo.TbUser;
import org.apache.ibatis.io.Resources;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;

/**
 * Created by user on 2018/9/7.
 */
public class TbUserTest {
    /********************最原始mybatis操作数据库****************************/
    //添加
    @Test
    public void insertTbUser() throws IOException {
        InputStream inputStream=null;
        InputStream resourceAsStream = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(resourceAsStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();

        TbUser tbUser=new TbUser();
        tbUser.setGender("男");
        tbUser.setUsername("guangwei");
        tbUser.setAuthodId(1);
        tbUser.setPassword("root");

        //操作动态sql，需要告诉sqlSession你执行的是mapper中的哪个sql语句，你要执行的目的内容又是什么
        //mapper.xml文件中的namesqace+id可以告诉sqlSession执行哪个sql语句
        //后面再加上你操作的内容就可以了
        int insert = sqlSession.insert("com.custom.dao.TbUserMapper.insertTbUser", tbUser);

        if(insert>0){
            System.out.println("插入成功");
        }

        //增删改要提交事务
        sqlSession.commit();
        sqlSession.close();
    }
    //查询
    @Test
    public void getTbUser() throws IOException {
        InputStream inputStream=null;
        inputStream = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        TbUserMapper tbUserDao = sqlSession.getMapper(TbUserMapper.class);
        TbUser tbUser = tbUserDao.selectById(1);
        System.out.println(tbUser);
        sqlSession.close();
    }
}
