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

import com.worksap.salespusher.entity.DealEntity;
import com.worksap.salespusher.repository.DealRepository;

@RestController
public class DealsController {
	private final DealRepository dealRepository;
	
	@Autowired
	public DealsController(DealRepository dealRepository) {
		this.dealRepository = dealRepository;
	}
	
	@RequestMapping(value = "/deals", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealEntity> getDeals(){
		return this.dealRepository.findAll();
	}
	
	@RequestMapping(value = "/deals", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")	
	public DealEntity createDeal(@RequestBody DealEntity deal){
		return this.dealRepository.save(deal);
	}
	
	@RequestMapping(value = "/deals/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public DealEntity getDeal(@PathVariable long id){
		return this.dealRepository.findOne(id);
	}
	
	@RequestMapping(value = "/deals/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public DealEntity updateDeal(@PathVariable long id,@RequestBody DealEntity deal){
		return this.dealRepository.save(deal);
	}
	
	@RequestMapping(value = "/deals/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteDeal(@PathVariable long id){
		this.dealRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
	
	/** deals by user **/
	@RequestMapping(value = "/dealsByUser/{userId}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealEntity> getDealsByUserId(@PathVariable long userId){
		return this.dealRepository.findByUserId(userId);
	}
	
	/** deals by company **/
	@RequestMapping(value = "/dealsByCompany/{companyId}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealEntity> getDealsByCompanyId(@PathVariable long companyId){
		return this.dealRepository.findByCompanyId(companyId);
	}
}
