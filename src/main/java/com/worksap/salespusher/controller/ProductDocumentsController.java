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
import com.worksap.salespusher.entity.ProductDocumentEntity;
import com.worksap.salespusher.repository.ProductDocumentRepository;

@RestController
public class ProductDocumentsController {
	private ProductDocumentRepository productDocumentRepository;
	
	@Autowired
	public ProductDocumentsController(ProductDocumentRepository productDocumentRepository){
		this.productDocumentRepository = productDocumentRepository;
	}
	
	@RequestMapping(value = "/products/{productId}/productDocuments", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<ProductDocumentEntity> getProductDocuments(@PathVariable long productId){
		return this.productDocumentRepository.findByProductId(productId);
	}
	
	@RequestMapping(value = "/products/{productId}/productDocuments/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteProductDocument(@PathVariable long id){
		/* delete actual file */
		ProductDocumentEntity productDocumentEntity = this.productDocumentRepository.findById(id);
		File file = new File(SalesPusherConstants.PRODUCT_DOCUMENT_FILE_DIRECTORY+productDocumentEntity.getName());   
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
		this.productDocumentRepository.delete(id);
		
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
}
