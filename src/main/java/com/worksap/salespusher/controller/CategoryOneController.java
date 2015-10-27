package com.worksap.salespusher.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.worksap.salespusher.entity.CategoryOneEntity;
import com.worksap.salespusher.repository.CategoryOneRepository;

@RestController
public class CategoryOneController {
	private final CategoryOneRepository categoryOneRepository;
	
	@Autowired
	public CategoryOneController(CategoryOneRepository categoryOneRepository){
		this.categoryOneRepository = categoryOneRepository;
	}
	
	@RequestMapping(value = "/categoryones", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<CategoryOneEntity> getCategoryOnes(){
		return this.categoryOneRepository.findAll();
	}
	
	@RequestMapping(value = "/categoryones", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")
	public CategoryOneEntity createCategoryOne(@RequestBody CategoryOneEntity categoryOne) {
	return this.categoryOneRepository.save(categoryOne);
	}	
	
	@RequestMapping(value = "/categoryones/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public CategoryOneEntity getCategoryOne(@PathVariable long id){
		return this.categoryOneRepository.findOne(id);
	}
}
