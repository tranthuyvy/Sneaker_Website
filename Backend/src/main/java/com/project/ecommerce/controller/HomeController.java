package com.project.ecommerce.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/")
public class HomeController {

    @GetMapping("/")
    @ResponseBody
    public String index() {
        return "Hello World!";
    }
    @GetMapping("api/auth")
    @ResponseBody
    public String api() {
        return "Call api";
    }

}
