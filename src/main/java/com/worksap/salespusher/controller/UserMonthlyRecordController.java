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

import com.worksap.salespusher.entity.UserMonthlyRecordEntity;
import com.worksap.salespusher.repository.UserMonthlyRecordRepository;

@RestController
public class UserMonthlyRecordController {
	private final UserMonthlyRecordRepository userMonthlyRecordRepository;

	@Autowired
	public UserMonthlyRecordController(UserMonthlyRecordRepository userMonthlyRecordRepository) {
		this.userMonthlyRecordRepository = userMonthlyRecordRepository;
	}
	
	/** find by user id **/
	@RequestMapping(value = "/userMonthlyRecords/{userId}/records", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<UserMonthlyRecordEntity> getUserMonthlyRecordsByUserId(@PathVariable long userId){
		return this.userMonthlyRecordRepository.findByUserId(userId);
	}
	
	@RequestMapping(value = "/userMonthlyRecords/{userId}/records", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")
	public UserMonthlyRecordEntity createUserMonthlyRecord(@RequestBody UserMonthlyRecordEntity userMonthlyRecord){
		return this.userMonthlyRecordRepository.save(userMonthlyRecord);
	}	
	
	@RequestMapping(value = "/userMonthlyRecords/{userId}/records/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public UserMonthlyRecordEntity getUserMonthlyRecordByUserId(@PathVariable long id){
		return this.userMonthlyRecordRepository.findOne(id);
	}
	
	@RequestMapping(value = "/userMonthlyRecords/{userId}/records/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public UserMonthlyRecordEntity updateUserMonthlyRecord(@PathVariable long id,@RequestBody UserMonthlyRecordEntity userMonthlyRecord){
		return this.userMonthlyRecordRepository.save(userMonthlyRecord);
	}
	
	@RequestMapping(value = "/userMonthlyRecords/{userId}/records/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteUserMonthlyRecord(@PathVariable long id){
		this.userMonthlyRecordRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}	
}
