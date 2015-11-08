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

import com.worksap.salespusher.entity.DealCommentEntity;
import com.worksap.salespusher.repository.DealCommentRepository;

@RestController
public class DealCommentsController {
	private final DealCommentRepository dealCommentRepository;
	
	@Autowired
	public DealCommentsController(DealCommentRepository dealCommentRepository) {
		this.dealCommentRepository = dealCommentRepository;
	}
	
	@RequestMapping(value = "/dealComments", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealCommentEntity> getDealComments(){
		return this.dealCommentRepository.findAll();
	}
	
	@RequestMapping(value = "/dealComments/{dealId}/comments", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<DealCommentEntity> getDealCommentsByDealId(@PathVariable long dealId){
		return this.dealCommentRepository.findByDealId(dealId);
	}
	
	@RequestMapping(value = "/dealComments/{dealId}/comments", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")	
	public DealCommentEntity createDeal(@RequestBody DealCommentEntity dealComment){
		return this.dealCommentRepository.save(dealComment);
	}
	
	@RequestMapping(value = "/dealComments/{dealId}/comments/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public DealCommentEntity getDeal(@PathVariable long id){
		return this.dealCommentRepository.findOne(id);
	}
	
	@RequestMapping(value = "/dealComments/{dealId}/comments/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public DealCommentEntity updateDeal(@PathVariable long id,@RequestBody DealCommentEntity dealComment){
		return this.dealCommentRepository.save(dealComment);
	}
	
	@RequestMapping(value = "/dealComments/{dealId}/comments/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteDeal(@PathVariable long id){
		this.dealCommentRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}	
}
