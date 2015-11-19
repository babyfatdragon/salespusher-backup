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

import com.worksap.salespusher.entity.DealRequestEntity;
import com.worksap.salespusher.repository.DealRequestRepository;

@RestController
public class DealRequestController {
	private final DealRequestRepository dealRequestRepository;

	@Autowired
	public DealRequestController(DealRequestRepository dealRequestRepository) {
		super();
		this.dealRequestRepository = dealRequestRepository;
	};
	
	/** by requestee id **/
	@RequestMapping(value = "/dealRequestsByRequesteeId/{requesteeId}/requests", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealRequestEntity> getDealRequests(@PathVariable long requesteeId){
		return this.dealRequestRepository.findByRequesteeId(requesteeId);
	}

	@RequestMapping(value = "/dealRequestsByRequesteeId/{requesteeId}/requests", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")	
	public DealRequestEntity createDealRequests(@RequestBody DealRequestEntity dealRequest){
		return this.dealRequestRepository.save(dealRequest);
	}
	
	@RequestMapping(value = "/dealRequestsByRequesteeId/{requesteeId}/requests/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public DealRequestEntity getDealRequest(@PathVariable long id){
		return this.dealRequestRepository.findOne(id);
	}
	
	@RequestMapping(value = "/dealRequestsByRequesteeId/{inviteeId}/requests/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public DealRequestEntity updateDealFollowRequest(@PathVariable long id,@RequestBody DealRequestEntity dealRequest){
		return this.dealRequestRepository.save(dealRequest);
	}
	
	@RequestMapping(value = "/dealRequestsByRequesteeId/{inviteeId}/requests/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteDealRequest(@PathVariable long id){
		this.dealRequestRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
	
	/** by deal id**/
	@RequestMapping(value = "/dealRequestsByDealId/{dealId}/requests", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealRequestEntity> getDealRequestsByDealId(@PathVariable long dealId){
		return this.dealRequestRepository.findByDealId(dealId);
	}

	@RequestMapping(value = "/dealRequestsByDealId/{dealId}/requests", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")	
	public DealRequestEntity createDealRequestsByDealId(@RequestBody DealRequestEntity dealRequest){
		return this.dealRequestRepository.save(dealRequest);
	}
	
	@RequestMapping(value = "/dealRequestsByDealId/{dealId}/requests/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public DealRequestEntity getDealRequestByDealId(@PathVariable long id){
		return this.dealRequestRepository.findOne(id);
	}
	
	@RequestMapping(value = "/dealRequestsByDealId/{dealId}/requests/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public DealRequestEntity updateDealFollowRequestByDealId(@PathVariable long id,@RequestBody DealRequestEntity dealRequest){
		return this.dealRequestRepository.save(dealRequest);
	}
	
	@RequestMapping(value = "/dealRequestsByDealId/{dealId}/requests/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteDealRequestByDealId(@PathVariable long id){
		this.dealRequestRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
}
