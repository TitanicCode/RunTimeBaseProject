package com.custom.utils;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.IOException;
import java.util.Properties;

/**
 * Created by user on 2018/9/10.
 * 最后返回的是传过来的文件的所有内容
 */
public class PropertiesUtill {

    public static Properties getpros(String filePath) throws IOException {
        Resource resource=new ClassPathResource(filePath);
        EncodedResource encodedResource=new EncodedResource(resource);
        Properties pros=PropertiesLoaderUtils.loadProperties(encodedResource);
        return pros;
    }
}
