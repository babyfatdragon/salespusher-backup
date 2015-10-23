package com.worksap.salespusher.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.worksap.salespusher.entity.UserEntity;
import com.worksap.salespusher.repository.UserRepository;
import com.worksap.salespusher.service.spec.CurrentUserDetailsService;



@Service
public class CurrentUserDetailsServiceImpl implements CurrentUserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CurrentUserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
        	throw new UsernameNotFoundException(String.format("User with username=%s was not found", username));
        }
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));
        return new User(user.getUsername(),user.getPassword(),authorities);
    }

}
