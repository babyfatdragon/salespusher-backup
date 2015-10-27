package com.worksap.salespusher.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.worksap.salespusher.entity.CategoryTwoEntity;
import com.worksap.salespusher.entity.ProductEntity;
import com.worksap.salespusher.repository.ProductRepository;

@RestController
public class ProductsController {
	private final ProductRepository productRepository;
	
	@Autowired
	public ProductsController(ProductRepository productRepository){
		this.productRepository = productRepository;
	}
	
	@RequestMapping(value = "/products", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")
	public ProductEntity createProduct(@RequestBody ProductEntity product){
		return this.productRepository.save(product);
	}
	
	@RequestMapping(value = "/products", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<ProductEntity> getProducts(){
		return this.productRepository.findAll();
	}
	
	@RequestMapping(value = "/products/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public ProductEntity getProduct(@PathVariable long id){
		return this.productRepository.findOne(id);
	}
	
	@RequestMapping(value = "/categorytwos/{categoryTwoId}/products", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<ProductEntity> getProducts(@PathVariable int categoryTwoId){
		return this.productRepository.findByCategoryTwoId(categoryTwoId);
	}
}
