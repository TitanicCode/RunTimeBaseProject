package com.custom.utils;


import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Properties;

/**
 * Created by user on 2018/9/10.
 */
public class FileUtils {

    /**
     * 将上传的文件备份到本地
     * @param file
     * @param suffix：后缀，用于区分文件类型，分别存放
     * @param batchCode：生产批次
     * @return
     */
    public static String copyUploadFile(MultipartFile file,String suffix,String batchCode) throws IOException {
        Properties pros = PropertiesUtill.getpros("addr.properties");
        String basePath=pros.getProperty("otherbaseupload");
        //判断是否为图片
        if (suffix.equals(".png")||suffix.equals(".gif")||suffix.equals(".jpg")||suffix.equals(".jpeg")){
            basePath=pros.getProperty("picbaseupload");
        }
        if (suffix.equals(".doc")||suffix.equals(".docx")||suffix.equals(".xls")){
            basePath=pros.getProperty("combaseupload");
        }

        File realFile=new File(basePath+File.separator);
        System.out.println(realFile.toString());
        if (!realFile.exists()){
            realFile.mkdirs();
        }

        //后期有新条件还可以往上加
        String uploadName=batchCode;

        String newName=realFile+File.separator+uploadName+suffix;
        String newNameTemp=realFile+File.separator+uploadName+".tmp";

        InputStream inputStream=file.getInputStream();
        OutputStream outputStream=new FileOutputStream(newNameTemp);
        //每次读取1024个字节
        byte[] buffer=new byte[1024];
        int n=0;
        while((n=inputStream.read(buffer))!=-1){
            outputStream.write(buffer,0,n);
        }

        outputStream.close();
        inputStream.close();

        File newFile=new File(newNameTemp);
        newFile.renameTo(new File(newName));
        return newName;
    }
}
