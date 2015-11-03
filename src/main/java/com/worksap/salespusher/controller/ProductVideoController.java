package com.worksap.salespusher.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.worksap.salespusher.entity.ProductVideoEntity;
import com.worksap.salespusher.repository.ProductVideoRepository;

@RestController
public class ProductVideoController {
	private ProductVideoRepository productVideoRepository;
	
	@Autowired
	public ProductVideoController(ProductVideoRepository productVideoRepository){
		this.productVideoRepository = productVideoRepository;
	}

	@RequestMapping(value = "/products/{productId}/productVideos", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<ProductVideoEntity> getProductVideos(@PathVariable long productId){
		return this.productVideoRepository.findByProductId(productId);
	}
	
	@RequestMapping(value = "/products/{productId}/productVideos", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")
	public ProductVideoEntity createProductVideo(@RequestBody ProductVideoEntity productVideo){
		return this.productVideoRepository.save(productVideo);
	}
	
	@RequestMapping(value = "/products/{productId}/productVideos/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public ProductVideoEntity getProductVideo(@PathVariable long id){
		return this.productVideoRepository.getOne(id);
	}
	
	@RequestMapping(value = "/products/{productId}/productVideos/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteProductVideo(@PathVariable long id){
		this.productVideoRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}

}
