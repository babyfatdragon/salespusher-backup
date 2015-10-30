package com.worksap.salespusher.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.worksap.salespusher.constants.SalesPusherConstants;
import com.worksap.salespusher.entity.ProductImageEntity;
import com.worksap.salespusher.repository.ProductImageRepository;

@RestController
public class ProductImagesController {
	private ProductImageRepository productImageRepository;
	
	@Autowired
	public ProductImagesController(ProductImageRepository productImageRepository){
		this.productImageRepository = productImageRepository;
	}
	
	@RequestMapping(value = "/products/{productId}/productImages", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<ProductImageEntity> getProductImages(@PathVariable long productId){
		return this.productImageRepository.findByProductId(productId);
	}
	
	@RequestMapping(value = "/products/{productId}/productImages/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteProductImage(@PathVariable long id){
		/* delete actual file */
		ProductImageEntity productImageEntity = this.productImageRepository.findById(id);
		File file = new File(SalesPusherConstants.PRODUCT_IMAGE_FILE_DIRECTORY+productImageEntity.getName());
		try{      	
    		if(file.delete()){
    			System.out.println(file.getName() + " is deleted!");
    		}else{
    			System.out.println("Delete operation is failed.");
    		}
    	}catch(Exception e){
    		e.printStackTrace();
    	}
		/* delete database record */
		this.productImageRepository.delete(id);
		
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}	
}
