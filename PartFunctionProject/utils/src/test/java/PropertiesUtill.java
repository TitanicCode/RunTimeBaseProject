import org.junit.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.IOException;
import java.util.Properties;

/**
 * Created by user on 2018/9/10.
 */
public class PropertiesUtill {

    @Test
    public void test1() {
        Resource r=new ClassPathResource("log4j.properties");
        System.out.println(r.toString());
        EncodedResource encodedResource=new EncodedResource(r);
        System.out.println(encodedResource.toString());
        try {
            Properties pros= PropertiesLoaderUtils.loadProperties(encodedResource);
            System.out.println(pros.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
