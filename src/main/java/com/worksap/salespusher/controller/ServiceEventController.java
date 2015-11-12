package com.worksap.salespusher.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.worksap.salespusher.entity.ServiceEventEntity;
import com.worksap.salespusher.repository.ServiceEventRepository;

@RestController
public class ServiceEventController {
	private final ServiceEventRepository serviceEventRepository;
	
	@Autowired
	public ServiceEventController(ServiceEventRepository serviceEventRepository) {
		this.serviceEventRepository = serviceEventRepository;
	}
	/** find by deal id **/
	@RequestMapping(value = "/serviceEventsByDeal/{dealId}/events", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<ServiceEventEntity> getServiceEventsByDealId(@PathVariable long dealId){
		return this.serviceEventRepository.findByDealId(dealId);
	}
	
	@RequestMapping(value = "/serviceEventsByDeal/{dealId}/events", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")	
	public ServiceEventEntity createServiceEvent(@RequestBody ServiceEventEntity serviceEvent){
		return this.serviceEventRepository.save(serviceEvent);
	}
	
	@RequestMapping(value = "/serviceEventsByDeal/{dealId}/events/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public ServiceEventEntity getServiceEvent(@PathVariable long id){
		return this.serviceEventRepository.findOne(id);
	}
	
	@RequestMapping(value = "/serviceEventsByDeal/{dealId}/events/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public ServiceEventEntity updateServiceEvent(@PathVariable long id,@RequestBody ServiceEventEntity serviceEvent){
		return this.serviceEventRepository.save(serviceEvent);
	}
	
	@RequestMapping(value = "/serviceEventsByDeal/{dealId}/events/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteServiceEvent(@PathVariable long id){
		this.serviceEventRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
	
	/** find by user id **/
	@RequestMapping(value = "/serviceEventsByUser/{userId}/events", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<ServiceEventEntity> getServiceEventsByUserId(@PathVariable long userId){
		return this.serviceEventRepository.findByUserId(userId);
	}
	
	@RequestMapping(value = "/serviceEventsByUser/{userId}/events/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public ServiceEventEntity getServiceEventByUserId(@PathVariable long id){
		return this.serviceEventRepository.findOne(id);
	}
	
	/** find by end time**/
	@RequestMapping(value = "/serviceEvents", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<ServiceEventEntity> getAllServiceEvents(){
		return this.serviceEventRepository.findAll();
	}
	
	@RequestMapping(value = "/serviceEvents/findByEndTimeRange", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")	
	public List<ServiceEventEntity> getServiceEventsByEnd(@RequestParam("from") String from,@RequestParam("to") String to) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		
		Date fromDate = sdf.parse(from);
		Date toDate = sdf.parse(to);
		System.out.println(from);
		System.out.println(to);
		System.out.println(fromDate);
		System.out.println(toDate);
		return this.serviceEventRepository.findByEndBetween(fromDate,toDate);
	}
}
