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

import com.worksap.salespusher.entity.CustomerEntity;
import com.worksap.salespusher.repository.CustomerRepository;

@RestController
public class CustomersController {
	private final CustomerRepository customerRepository;
	
	@Autowired
	public CustomersController(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}
	
	@RequestMapping(value = "/customers", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<CustomerEntity> getCustomers(){
		return this.customerRepository.findAll();
	}	
	
	@RequestMapping(value = "/customers", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")	
	public CustomerEntity createCustomer(@RequestBody CustomerEntity customer){
		return this.customerRepository.save(customer);
	}
	
	@RequestMapping(value = "/customers/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public CustomerEntity getCustomer(@PathVariable long id){
		return this.customerRepository.findOne(id);
	}
	
	@RequestMapping(value = "/customers/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public CustomerEntity updateCustomer(@PathVariable long id,@RequestBody CustomerEntity customer){
		return this.customerRepository.save(customer);
	}
	
	@RequestMapping(value = "/customers/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteCustomer(@PathVariable long id){
		this.customerRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
	
	
}
