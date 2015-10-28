package com.worksap.salespusher.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class FilesController {
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/files/images/upload", method = RequestMethod.POST)
    public void uploadImages(@RequestParam("file") MultipartFile file) throws IOException {
        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();
                String fileName = file.getOriginalFilename();
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(new File("C:/Users/li_zh/workspace/sp-files/images/"+fileName)));
                stream.write(bytes);
                stream.close();
            } catch (Exception e) {
            }
        }
        System.out.println(String.format("receive %s", file.getOriginalFilename()));
    }
    
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/files/docs/upload", method = RequestMethod.POST)
    public void uploadDocs(@RequestParam("file") MultipartFile file) throws IOException {
        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();
                String fileName = file.getOriginalFilename();
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(new File("C:/Users/li_zh/workspace/sp-files/docs/"+fileName)));
                stream.write(bytes);
                stream.close();
            } catch (Exception e) {
            }
        }
        System.out.println(String.format("receive %s", file.getOriginalFilename()));
    }
}
