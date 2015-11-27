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

import com.worksap.salespusher.entity.LeadEntity;
import com.worksap.salespusher.repository.LeadRepository;

@RestController
public class LeadsController {
	private final LeadRepository leadRepository;

	@Autowired
	public LeadsController(LeadRepository leadRepository) {
		this.leadRepository = leadRepository;
	}
	@RequestMapping(value = "/leads", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<LeadEntity> getLeads(){
		return this.leadRepository.findAll();
	}	
	
	@RequestMapping(value = "/leads", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")
	public LeadEntity createLead(@RequestBody LeadEntity lead){
		return this.leadRepository.save(lead);
	}
	
	@RequestMapping(value = "/leads/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public LeadEntity getLead(@PathVariable long id){
		return this.leadRepository.findOne(id);
	}
	
	@RequestMapping(value = "/leads/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public LeadEntity updateLead(@PathVariable long id,@RequestBody LeadEntity lead){
		return this.leadRepository.save(lead);
	}
	
	@RequestMapping(value = "/leads/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteLead(@PathVariable long id){
		this.leadRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
}	
