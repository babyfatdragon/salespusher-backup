package com.worksap.salespusher.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.worksap.salespusher.entity.ProductDocumentEntity;
import com.worksap.salespusher.repository.ProductDocumentRepository;

@RestController
public class ProductDocumentController {
	private ProductDocumentRepository productDocumentRepository;
	@Autowired
	public ProductDocumentController(ProductDocumentRepository productDocumentRepository){
		this.productDocumentRepository = productDocumentRepository;
	}
	
	@RequestMapping(value = "/products/{productId}/productDocuments", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<ProductDocumentEntity> getProductDocuments(@PathVariable long productId){
		return this.productDocumentRepository.findByProductId(productId);
	}
}
