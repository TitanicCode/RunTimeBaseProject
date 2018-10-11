package com.custom.utils.yjjrproject.fileutils;


import com.custom.utils.PropertiesUtill;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

/**
 * 文件处理：上传下载，备份
 * Created by user on 2018/9/10.
 */
public class FileUtils {

    private static Logger logger= LoggerFactory.getLogger(FileUtils.class);

    //文件上传eventId,eventName是邮件金融项目单独用的，本工具类如果用到其它项目中，可以把这两个属性去掉
    public JSONObject upload(String eventId, String eventName, MultipartFile file, HttpServletRequest request) throws IOException {

        JSONObject result=new JSONObject();

        String path=request.getSession().getServletContext().getRealPath("upload");
        String fileName = file.getOriginalFilename();
        logger.debug("----------导入文件名称："+fileName+"----------");


        String suffix=fileName.substring(fileName.lastIndexOf("."));

        //判断文件类型，规定上传的文件的类型
        if (!suffix.equals(".zip")
                && !suffix.equals(".csv")
                && !suffix.equals(".accdb")
                && !suffix.equals(".xls")
                && !suffix.equals(".xlsx")) {
            result.put("status", 0);
            result.put("message", "上传失败,请上传zip、xls、xlsx、csv、accdb文件.");
            return result;
        }

        //文件批次格式转换
        SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmssSSS");
        Date date=new Date();
        //文件批次
        String batchCode=sdf.format(date);
        //上传时间格式转换
        sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //上传时间
        String uploadTime=sdf.format(date);

        //统计上传的文件名
        List<String> fileNames = null;
        try{
            //本地备份一下上传的文件
            String newName = FileUtils.copyUploadFile(eventId, eventName, file, suffix, batchCode);
            //处理一下zip文件
            if (suffix.equals(".zip")) {
                // 统计压缩包里excel
                ZipFile zipFile = new ZipFile(newName, Charset.forName("GBK"));
                fileNames = getZipContainsExcelNames(zipFile);
            }else if(suffix.equals(".csv")
                    || suffix.equals(".accdb")
                    || suffix.equals(".xls")
                    || suffix.equals(".xlsx")){
                fileNames = new ArrayList<>();
                fileNames.add(file.getOriginalFilename());
            }

            if(fileNames.size() <= 0){
                result.put("status", 0);
                result.put("message", "上传失败,zip文件中无xls、xlsx、csv、accdb任一种文件.");
                return result;
            }

            //持久化上传文件日志
//            List<FinancialEventImportFileLog> financialEventImportFileLogList = new ArrayList<FinancialEventImportFileLog>();
//            for (int i = 0; i < fileNames.size(); i++) {
//                FinancialEventImportFileLog fileLog = new FinancialEventImportFileLog();
//                String id = UUID.randomUUID().toString().replaceAll("-", "");
//                fileLog.setId(id);
//                fileLog.setBatchCode(batchCode);
//                fileLog.setImportCompressFileName(fileName);
//                fileLog.setImportFileName(fileNames.get(i));
//                fileLog.setImportTimeStr(uploadTime);
//                fileLog.setImportUserName(ResourceUtil.getSessionUser().getName());
//                fileLog.setEventId(eventId);
//                financialEventImportFileLogList.add(fileLog);
//            }
//            FinancialEventImportFileLogService financialEventImportFileLogService=null;
//            financialEventImportFileLogService.addLog(financialEventImportFileLogList);

        }catch (IOException e){
            logger.error(e.getLocalizedMessage(), e);
            result.put("status", -1);
            result.put("message", "上传失败");
            return result;
        }

        //本项目直接用的那个备份的地址作为上传地址，所以不需要再上传到另一个地址了
//        File dir =new File(path,fileName);
//        if (!dir.exists()){
//            dir.mkdirs();
//        }
//        try {
//            file.transferTo(dir);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "上传失败，ok！";
//        }

        //返回的数据
//        FinancialEventService financialEventService=null;
        result.put("status", 0);
        result.put("message", "上传成功");
        //result.put("data", excelNames);
//        result.put("data", financialEventService.getFinancialEventFileListByEventId(eventId));
        result.put("data",null);

        return result;
    }

    //文件下载
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


    //将上传的文件备份到本地,eventId,eventName是邮件金融项目单独用的，本工具类如果用到其它项目中，可以把这两个属性去掉
    public static String copyUploadFile(String eventId, String eventName,MultipartFile file,String suffix,String batchCode) throws IOException {

        //改为自己的配置文件
        Properties pros = PropertiesUtill.getpros("config.properties");
        String basePath=pros.getProperty("financialbaseuploadpath");

        //判断文件类型，按类型存放到不同的地址
//        if (suffix.equals(".png")||suffix.equals(".gif")||suffix.equals(".jpg")||suffix.equals(".jpeg")){
//            basePath=pros.getProperty("picbaseupload");
//        }
//        if (suffix.equals(".doc")||suffix.equals(".docx")||suffix.equals(".xls")){
//            basePath=pros.getProperty("combaseupload");
//        }
        if(!suffix.equals(".zip")){
            basePath = pros.getProperty("financialbaseuploadpath2"); // "F:\\upload"
        }


        File realFile=new File(basePath+File.separator);

        if (!realFile.exists()){
            realFile.mkdirs();
        }

        //后期有新条件还可以往上加
        String uploadFileName=batchCode;
        //String uploadFileName = eventName + "_" + eventId + "_" + batchCode + "_" + ResourceUtil.getSessionUserName().getId();
        String newName=realFile+File.separator+uploadFileName+suffix;
        String newNameTemp=realFile+File.separator+uploadFileName+".tmp";

        InputStream inputStream=file.getInputStream();
        //上传文件以批次命名
        OutputStream outputStream=new FileOutputStream(newNameTemp);
        //每次读取1024个字节
        byte[] buffer=new byte[1024];
        int n=0;
        while((n=inputStream.read(buffer))!=-1){
            outputStream.write(buffer,0,n);
        }

        outputStream.close();
        inputStream.close();

        // 文件重命名
        File newFile=new File(newNameTemp);
        newFile.renameTo(new File(newName));
        return newName;
    }

    //获取压缩包下的文件名列表
    private List<String> getZipContainsExcelNames(ZipFile zipFile) {
        List<String> list = new ArrayList<>();
        Enumeration<? extends ZipEntry> e = zipFile.entries();
        String filepath = "";
        while (e.hasMoreElements()) {
            Object o = e.nextElement();
            filepath = o.toString();
            boolean isExcel = filepath.endsWith(".xlsx") || filepath.endsWith(".xls");
            if (isExcel) {
                list.add(filepath.substring(filepath.lastIndexOf("/") + 1));
                logger.debug("----------excel文件名："+filepath+"----------");
            }
        }
        return list;
    }
}
