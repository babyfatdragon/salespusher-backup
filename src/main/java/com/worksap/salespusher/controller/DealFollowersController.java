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

import com.worksap.salespusher.entity.DealFollowerEntity;
import com.worksap.salespusher.repository.DealFollowerRepository;

@RestController
public class DealFollowersController {
	private final DealFollowerRepository dealFollowerRepository;
	
	@Autowired
	public DealFollowersController(DealFollowerRepository dealFollowerRepository) {
		this.dealFollowerRepository = dealFollowerRepository;
	}
	
	@RequestMapping(value = "/dealFollowers", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealFollowerEntity> getDealFollowers(){
		return this.dealFollowerRepository.findAll();
	}

	@RequestMapping(value = "/dealFollowers", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")	
	public DealFollowerEntity createDeal(@RequestBody DealFollowerEntity dealFollower){
		return this.dealFollowerRepository.save(dealFollower);
	}
	
	@RequestMapping(value = "/dealFollowers/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public DealFollowerEntity getDeal(@PathVariable long id){
		return this.dealFollowerRepository.findOne(id);
	}
	
	@RequestMapping(value = "/dealFollowers/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public DealFollowerEntity updateDeal(@PathVariable long id,@RequestBody DealFollowerEntity dealFollower){
		return this.dealFollowerRepository.save(dealFollower);
	}
	
	@RequestMapping(value = "/dealFollowers/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteDeal(@PathVariable long id){
		this.dealFollowerRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
}
