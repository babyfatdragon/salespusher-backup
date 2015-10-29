package com.worksap.salespusher.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
}
