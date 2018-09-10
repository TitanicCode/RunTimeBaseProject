package com.custom.controller;

import com.custom.utils.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by user on 2018/9/10.
 */
@RequestMapping("/file")
@Controller
public class FileController {

    @RequestMapping("/fileIndexPage")
    public String fileIndexPage(){
        return "file";
    }
    /**
     * 文件上传
     */
    @RequestMapping(value="/upload", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
    @ResponseBody
    public String upload(MultipartFile file, HttpServletRequest request) throws IOException {

        String path=request.getSession().getServletContext().getRealPath("upload");
        String filename = file.getOriginalFilename();
        String suffix=filename.substring(filename.lastIndexOf("."));

        //文件批次格式转换
        SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmssSSS");
        Date date=new Date();
        //文件批次
        String batchCode=sdf.format(date);
        //上传时间格式转换
        sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //上传时间
        String uploadTime=sdf.format(date);
        //本地备份一下上传的文件
        String newName = FileUtils.copyUploadFile(file, suffix, batchCode);

        File dir =new File(path,filename);
        if (!dir.exists()){
            dir.mkdirs();
        }

        try {
            file.transferTo(dir);
        } catch (IOException e) {
            e.printStackTrace();
            return "上传失败，ok！";
        }
        return "上传成功，ok！";
    }

    /**
     * 文件下载
     */
    @RequestMapping("/download")
    public void download(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //模拟文件，myfile.txt为需要下载的文件
        String fileName = request.getSession().getServletContext().getRealPath("upload")+"/myfile.txt";
        //获取输入流
        InputStream bis = new BufferedInputStream(new FileInputStream(new File(fileName)));
        //假如以中文名下载的话
        String filename = "下载文件.txt";
        //转码，免得文件名中文乱码
        filename = URLEncoder.encode(filename,"UTF-8");
        //设置文件下载头
        response.addHeader("Content-Disposition", "attachment;filename=" + filename);
        //1.设置文件ContentType类型，这样设置，会自动判断下载文件类型
        response.setContentType("multipart/form-data");
        BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream());
        int len = 0;
        while((len = bis.read()) != -1){
            out.write(len);
            out.flush();
        }
        out.close();
    }
}
