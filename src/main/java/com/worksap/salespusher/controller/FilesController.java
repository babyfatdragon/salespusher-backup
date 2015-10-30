package com.worksap.salespusher.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.worksap.salespusher.constants.SalesPusherConstants;
import com.worksap.salespusher.entity.ProductDocumentEntity;
import com.worksap.salespusher.entity.ProductImageEntity;
import com.worksap.salespusher.repository.ProductDocumentRepository;
import com.worksap.salespusher.repository.ProductImageRepository;

@RestController
public class FilesController {
	private final ProductDocumentRepository productDocumentRepository;
	private final ProductImageRepository productImageRepository;
	
	@Autowired
	public FilesController(ProductDocumentRepository productDocumentRepository, ProductImageRepository productImageRepository){
		this.productDocumentRepository = productDocumentRepository;
		this.productImageRepository = productImageRepository;
	}
	
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/files/images/upload", method = RequestMethod.POST)
    public ProductImageEntity uploadImages(@RequestParam("file") MultipartFile file,@RequestParam("productId") String productId) throws IOException {
        if (!file.isEmpty()) {
            try {
            	String fileDirectory = SalesPusherConstants.PRODUCT_IMAGE_FILE_DIRECTORY; 
                byte[] bytes = file.getBytes();
                String fileName = "product"+productId+"-"+file.getOriginalFilename();
                BufferedOutputStream stream = new BufferedOutputStream(
                		new FileOutputStream(
                				new File(fileDirectory+fileName)
        				)
        		);
	            stream.write(bytes);
	            stream.close();
	            long pId = Long.parseLong(productId.trim());
	            ProductImageEntity product = new ProductImageEntity(fileName,pId);
	            return this.productImageRepository.save(product);
            } catch (Exception e) {
            	System.out.println(e);
            }
        }
		return null;
    }
    
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/files/docs/upload", method = RequestMethod.POST)
    public ProductDocumentEntity uploadDocs(@RequestParam("file") MultipartFile file,@RequestParam("productId") String productId) throws IOException {
        if (!file.isEmpty()) {
            try {
            	String fileDirectory = SalesPusherConstants.PRODUCT_DOCUMENT_FILE_DIRECTORY; 
                byte[] bytes = file.getBytes();
                String fileName = "product"+productId+"-"+file.getOriginalFilename();
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(new File(fileDirectory+fileName)));
                stream.write(bytes);
                stream.close();
	            long pId = Long.parseLong(productId.trim());
	            ProductDocumentEntity product = new ProductDocumentEntity(fileName,pId);
	            return this.productDocumentRepository.save(product);
            } catch (Exception e) {
            	System.out.println(e);
            }
        }
        return null;
    }
}
