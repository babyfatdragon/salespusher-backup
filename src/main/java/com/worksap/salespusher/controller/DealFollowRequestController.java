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

import com.worksap.salespusher.entity.DealFollowRequestEntity;
import com.worksap.salespusher.repository.DealFollowRequestRepository;

@RestController
public class DealFollowRequestController {
	private final DealFollowRequestRepository dealFollowRequestRepository;

	@Autowired
	public DealFollowRequestController(DealFollowRequestRepository dealFollowRequestRepository) {
		this.dealFollowRequestRepository = dealFollowRequestRepository;
	}
	
	@RequestMapping(value = "/dealFollowRequests/{inviteeId}/requests", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealFollowRequestEntity> getDealFollowRequests(@PathVariable long inviteeId){
		return this.dealFollowRequestRepository.findByInviteeId(inviteeId);
	}

	@RequestMapping(value = "/dealFollowRequests/{inviteeId}/requests", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")	
	public DealFollowRequestEntity createDealFollowRequests(@RequestBody DealFollowRequestEntity dealFollowRequest){
		return this.dealFollowRequestRepository.save(dealFollowRequest);
	}
	
	@RequestMapping(value = "/dealFollowRequests/{inviteeId}/requests/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public DealFollowRequestEntity getDealFollowRequest(@PathVariable long id){
		return this.dealFollowRequestRepository.findOne(id);
	}
	
	@RequestMapping(value = "/dealFollowRequests/{inviteeId}/requests/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public DealFollowRequestEntity updateDealFollowRequest(@PathVariable long id,@RequestBody DealFollowRequestEntity dealFollowRequest){
		return this.dealFollowRequestRepository.save(dealFollowRequest);
	}
	
	@RequestMapping(value = "/dealFollowRequests/{inviteeId}/requests/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteDealFollowRequest(@PathVariable long id){
		this.dealFollowRequestRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}

}
