package com.custom.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by user on 2018/9/12.
 */
@Controller
public class JFreeChartController {

    @RequestMapping("/getIndexChart")
    public String getIndexChart(){
        return "index";
    }

}
