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

import com.worksap.salespusher.entity.CompanyEntity;
import com.worksap.salespusher.repository.CompanyRepository;

@RestController
public class CompaniesController {
	private final CompanyRepository companyRepository;
	
	@Autowired
	public CompaniesController(CompanyRepository companyRepository){
		this.companyRepository = companyRepository;
	}
	
	@RequestMapping(value = "/companies", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<CompanyEntity> getCompanies(){
		return this.companyRepository.findAll();
	}	
	
	@RequestMapping(value = "/companies", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")
	public CompanyEntity createCompany(@RequestBody CompanyEntity company){
		return this.companyRepository.save(company);
	}
	
	@RequestMapping(value = "/companies/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public CompanyEntity getCompany(@PathVariable long id){
		return this.companyRepository.findOne(id);
	}
	
	@RequestMapping(value = "/companies/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public CompanyEntity updateCompany(@PathVariable long id,@RequestBody CompanyEntity company){
		return this.companyRepository.save(company);
	}
	
	@RequestMapping(value = "/companies/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteCompany(@PathVariable long id){
		this.companyRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
}
