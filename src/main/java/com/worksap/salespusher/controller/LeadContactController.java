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

import com.worksap.salespusher.entity.LeadContactEntity;
import com.worksap.salespusher.repository.LeadContactRepository;

@RestController
public class LeadContactController {
	private final LeadContactRepository leadContactRepository;
	
	@Autowired
	public LeadContactController(LeadContactRepository leadContactRepository){
		this.leadContactRepository = leadContactRepository;
	};
	
	@RequestMapping(value = "/leadContacts/{leadId}/contacts", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<LeadContactEntity> getLeadContacts(@PathVariable long leadId){
		return this.leadContactRepository.findByLeadId(leadId);
	}
	
	@RequestMapping(value = "/leadContacts/{leadId}/contacts", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")
	public LeadContactEntity createLeadContact(@RequestBody LeadContactEntity leadContact){
		return this.leadContactRepository.save(leadContact);
	}
	
	@RequestMapping(value = "/leadContacts/{leadId}/contacts/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public LeadContactEntity getLeadContact(@PathVariable long id){
		return this.leadContactRepository.findById(id);
	}
	
	@RequestMapping(value = "/leadContacts/{leadId}/contacts/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public LeadContactEntity updateLeadContact(@PathVariable long id,@RequestBody LeadContactEntity leadContact){
		return this.leadContactRepository.save(leadContact);
	}
	
	@RequestMapping(value = "/leadContacts/{leadId}/contacts/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteLeadContact(@PathVariable long id){
		this.leadContactRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
}
