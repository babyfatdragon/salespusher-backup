package com.worksap.salespusher.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@RequestMapping(value = "/dealEvents/{dealId}/events/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteDealEvent(@PathVariable long id){
		this.dealEventRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
	
	/** find by end time**/
	@RequestMapping(value = "/dealEvents", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealEventEntity> getAllDealEvents(){
		return this.dealEventRepository.findAll();
	}
	@RequestMapping(value = "/dealEvents/findByEndTimeRange", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")	
	public List<DealEventEntity> getDealEventsByEnd(@RequestParam("from") String from,@RequestParam("to") String to) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		
		Date fromDate = sdf.parse(from);
		Date toDate = sdf.parse(to);
		System.out.println(from);
		System.out.println(to);
		System.out.println(fromDate);
		System.out.println(toDate);
		return this.dealEventRepository.findByEndBetween(fromDate,toDate);
	}
	// @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
}
