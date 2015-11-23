package com.worksap.salespusher.controller;

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

import com.worksap.salespusher.entity.ExpenseClaimEntity;
import com.worksap.salespusher.repository.ExpenseClaimRepository;

@RestController
public class ExpenseClaimController {
	private final ExpenseClaimRepository expenseClaimRepository;

	@Autowired
	public ExpenseClaimController(ExpenseClaimRepository expenseClaimRepository) {
		this.expenseClaimRepository = expenseClaimRepository;
	}
	
	/** find by deal id **/
	@RequestMapping(value = "/expenseClaimsByDeal/{dealId}/expenseClaims", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<ExpenseClaimEntity> getExpenseClaimsByDealId(@PathVariable long dealId){
		return this.expenseClaimRepository.findByDealId(dealId);
	}
	
	@RequestMapping(value = "/expenseClaimsByDeal/{dealId}/expenseClaims", method = RequestMethod.POST)
	@PreAuthorize("isAuthenticated()")	
	public ExpenseClaimEntity createExpenseClaim(@RequestBody ExpenseClaimEntity expenseClaim){
		return this.expenseClaimRepository.save(expenseClaim);
	}
	
	@RequestMapping(value = "/expenseClaimsByDeal/{dealId}/expenseClaims/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public ExpenseClaimEntity getExpenseClaim(@PathVariable long id){
		return this.expenseClaimRepository.findOne(id);
	}
	
	@RequestMapping(value = "/expenseClaimsByDeal/{dealId}/expenseClaims/{id}", method = RequestMethod.PUT)
	@PreAuthorize("isAuthenticated()")
	public ExpenseClaimEntity updateExpenseClaim(@PathVariable long id,@RequestBody ExpenseClaimEntity expenseClaim){
		return this.expenseClaimRepository.save(expenseClaim);
	}
	
	@RequestMapping(value = "/expenseClaimsByDeal/{dealId}/expenseClaims/{id}", method = RequestMethod.DELETE)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Boolean> deleteExpenseClaim(@PathVariable long id){
		this.expenseClaimRepository.delete(id);
		return new ResponseEntity<Boolean>(Boolean.TRUE, HttpStatus.OK);
	}
	
	/** find by user id **/
	@RequestMapping(value = "/expenseClaimsByUser/{userId}/expenseClaims", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<ExpenseClaimEntity> getExpenseClaimsByUserId(@PathVariable long userId){
		return this.expenseClaimRepository.findByUserId(userId);
	}
	
	@RequestMapping(value = "/expenseClaimsByUser/{userId}/expenseClaims/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public ExpenseClaimEntity getExpenseClaimByUserId(@PathVariable long id){
		return this.expenseClaimRepository.findOne(id);
	}
	/** find by user id and month **/
	@RequestMapping(value = "/monthlyExpenseClaimsByUser/{userId}/year/{year}/month/{month}/expenseClaims", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<ExpenseClaimEntity> getMonthlyExpenseClaimsByUserId(@PathVariable long userId,@PathVariable int year,@PathVariable int month){
	    Calendar fromCal = Calendar.getInstance();
	    Calendar toCal = Calendar.getInstance();
	    fromCal.set(year,month,1);
	    toCal.set(year,(month+1)%12,1);
		Date fromDate = fromCal.getTime();
		Date toDate = toCal.getTime();
		return this.expenseClaimRepository.findByUserIdAndDateIncurredBetween(userId,fromDate,toDate);
	}
	
	@RequestMapping(value = "/monthlyExpenseClaimsByUser/{userId}/year/{year}/month/{month}/expenseClaims/{id}", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public ExpenseClaimEntity getMonthlyExpenseClaimByUserId(@PathVariable long id){
		return this.expenseClaimRepository.findOne(id);
	}
}
