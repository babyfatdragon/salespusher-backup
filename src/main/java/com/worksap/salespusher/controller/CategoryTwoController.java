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

import com.worksap.salespusher.entity.CategoryOneEntity;
import com.worksap.salespusher.entity.CategoryTwoEntity;
import com.worksap.salespusher.repository.CategoryTwoRepository;

@RestController
public class CategoryTwoController {
	private final CategoryTwoRepository categoryTwoRepository;
	
	@Autowired
	public CategoryTwoController(CategoryTwoRepository categoryTwoRepository){
		this.categoryTwoRepository = categoryTwoRepository;
	}
		
	@RequestMapping(value = "/categoryones/{categoryOneId}/categorytwos", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")
	public CategoryTwoEntity createCategoryTwo(@RequestBody CategoryTwoEntity categoryTwo){
		return this.categoryTwoRepository.save(categoryTwo);
	}
	
	@RequestMapping(value = "/categoryones/{categoryOneId}/categorytwos/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public CategoryTwoEntity getCategoryTwoWithCateOneId(@PathVariable long id){
		return this.categoryTwoRepository.findOne(id);
	}
	
	@RequestMapping(value = "/categoryones/{categoryOneId}/categorytwos/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public CategoryTwoEntity updateCategoryTwo(@PathVariable long id,@RequestBody CategoryTwoEntity categoryTwo){
		return this.categoryTwoRepository.save(categoryTwo);
	}
	
	@RequestMapping(value = "/categoryones/{categoryOneId}/categorytwos/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteCategoryOne(@PathVariable long id){
		this.categoryTwoRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/categoryones/{categoryOneId}/categorytwos", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<CategoryTwoEntity> getCategoryTwos(@PathVariable long categoryOneId){
		return this.categoryTwoRepository.findByCategoryOneId(categoryOneId);
	}
	
	@RequestMapping(value = "/categorytwos", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<CategoryTwoEntity> getAllCategoryTwos(){
		return this.categoryTwoRepository.findAll();
	}
	
	@RequestMapping(value = "/categorytwos/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public CategoryTwoEntity getCategoryTwo(@PathVariable long id){
		return this.categoryTwoRepository.findOne(id);
	}
}
