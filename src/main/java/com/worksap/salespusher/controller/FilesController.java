package com.worksap.salespusher.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import com.worksap.salespusher.entity.ProductImageEntity;
import com.worksap.salespusher.repository.ProductDocumentRepository;
import com.worksap.salespusher.repository.ProductImageRepository;

@Controller
public class FilesController {
	private final ProductDocumentRepository productDocumentRepository;
	private final ProductImageRepository productImageRepository;
	
	@Autowired
	public FilesController(ProductDocumentRepository productDocumentRepository,ProductImageRepository productImageRepository){
		this.productDocumentRepository = productDocumentRepository;
		this.productImageRepository = productImageRepository;
	}
	
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/files/images/upload", method = RequestMethod.POST)
    public void uploadImages(@RequestParam("file") MultipartFile file,@RequestParam("productId") String productId) throws IOException {
        if (!file.isEmpty()) {
            try {
            	//String fileDirectory = "C:/Users/li_zh/workspace/sp-files/images/";
            	String fileDirectory = "/Users/fatdragon/Repos/sp-files/images/";
                byte[] bytes = file.getBytes();
                String fileName = "product-"+productId+"-"+file.getOriginalFilename();
                BufferedOutputStream stream = new BufferedOutputStream(
                		new FileOutputStream(
                				new File(fileDirectory+fileName)
        				)
        		);
	            stream.write(bytes);
	            stream.close();
	            long pId = Long.getLong(productId);
	            ProductImageEntity p = new ProductImageEntity(fileName,pId);
	            //this.productImageRepository.save(p);
	            
            } catch (Exception e) {
            }
        }
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
