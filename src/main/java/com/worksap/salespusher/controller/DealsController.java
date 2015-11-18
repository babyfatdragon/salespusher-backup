package com.worksap.salespusher.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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
	
	/** deals by this year, month **/
	@RequestMapping(value = "/monthlyDeals/{month}/users", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealEntity> getMonthlyDeals(@PathVariable int month){
	    Calendar fromCal = Calendar.getInstance();
	    Calendar toCal = Calendar.getInstance();
	    int year = fromCal.get(Calendar.YEAR);
	    fromCal.set(year,month,1);
	    toCal.set(year,(month+1)%12,1);
		Date fromDate = fromCal.getTime();
		Date toDate = toCal.getTime();
		return this.dealRepository.findByDateClosedBetween(fromDate,toDate);
	}
	
	@RequestMapping(value = "/monthlyDeals/{month}/users/{userId}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealEntity> getMonthlyDealsByUserId(@PathVariable int month, @PathVariable long userId){
	    Calendar fromCal = Calendar.getInstance();
	    Calendar toCal = Calendar.getInstance();
	    int year = fromCal.get(Calendar.YEAR);
	    fromCal.set(year,month,1);
	    toCal.set(year,(month+1)%12,1);
		Date fromDate = fromCal.getTime();
		Date toDate = toCal.getTime();
		return this.dealRepository.findByUserIdAndDateClosedBetween(userId,fromDate,toDate);
	}
	/** deals by year **/
	@RequestMapping(value = "/yearlyDeals/{year}/users", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealEntity> getYearlyDeals(@PathVariable int year){
	    Calendar fromCal = Calendar.getInstance();
	    Calendar toCal = Calendar.getInstance();
	    fromCal.set(year,0,1);
	    toCal.set(year,11,31);
		Date fromDate = fromCal.getTime();
		Date toDate = toCal.getTime();
		return this.dealRepository.findByDateClosedBetween(fromDate,toDate);
	}
	
	@RequestMapping(value = "/yearlyDeals/{year}/users/{userId}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealEntity> getYearlyDealsByUserId(@PathVariable int year, @PathVariable long userId){
	    Calendar fromCal = Calendar.getInstance();
	    Calendar toCal = Calendar.getInstance();
	    fromCal.set(year,0,1);
	    toCal.set(year,11,1);
		Date fromDate = fromCal.getTime();
		Date toDate = toCal.getTime();
		return this.dealRepository.findByUserIdAndDateClosedBetween(userId,fromDate,toDate);
	}
	
	/** deals by company **/
	@RequestMapping(value = "/dealsByCompany/{companyId}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealEntity> getDealsByCompanyId(@PathVariable long companyId){
		return this.dealRepository.findByCompanyId(companyId);
	}
}
