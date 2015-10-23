package com.worksap.salespusher.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.worksap.salespusher.entity.UserEntity;
import com.worksap.salespusher.repository.UserRepository;

@RestController
public class UsersController {
	private final UserRepository userRepository;
	
    @Autowired
	public UsersController(UserRepository userRepository){
		this.userRepository = userRepository;
	}
	
	@RequestMapping(value = "/users", method = RequestMethod.GET)
	@PreAuthorize("isAuthenticated()")
	public List<UserEntity> getUsers(){
			return this.userRepository.findAll();
	}
	
	/*	return current login user*/
	@RequestMapping("/user")
	public Principal user(Principal user) {
		return user;
	}
	
	
}
