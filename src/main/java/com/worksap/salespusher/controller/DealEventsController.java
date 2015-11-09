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

import com.worksap.salespusher.entity.DealEventEntity;
import com.worksap.salespusher.repository.DealEventRepository;

@RestController
public class DealEventsController {
	private final DealEventRepository dealEventRepository;

	@Autowired
	public DealEventsController(DealEventRepository dealEventRepository) {
		this.dealEventRepository = dealEventRepository;
	}
	
	@RequestMapping(value = "/dealEvents/{dealId}/events", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealEventEntity> getDealEventsByDealId(@PathVariable long dealId){
		return this.dealEventRepository.findByDealId(dealId);
	}
	
	@RequestMapping(value = "/dealEvents/{dealId}/events", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")	
	public DealEventEntity createDealEvent(@RequestBody DealEventEntity dealEvent){
		return this.dealEventRepository.save(dealEvent);
	}
	
	@RequestMapping(value = "/dealEvents/{dealId}/events/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public DealEventEntity getDealEvent(@PathVariable long id){
		return this.dealEventRepository.findOne(id);
	}
	
	@RequestMapping(value = "/dealEvents/{dealId}/events/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public DealEventEntity updateDealEvent(@PathVariable long id,@RequestBody DealEventEntity dealEvent){
		return this.dealEventRepository.save(dealEvent);
	}
	
	@RequestMapping(value = "/dealEvents/{dealId}/event/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteDealEvent(@PathVariable long id){
		this.dealEventRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}	
}
