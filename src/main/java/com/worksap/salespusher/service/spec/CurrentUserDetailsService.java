package com.worksap.salespusher.service.spec;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface CurrentUserDetailsService extends UserDetailsService {
	UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
