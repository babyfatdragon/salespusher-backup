package com.worksap.salespusher.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

import com.worksap.salespusher.CsrfHeaderFilter;
import com.worksap.salespusher.repository.UserRepository;
import com.worksap.salespusher.service.impl.CurrentUserDetailsServiceImpl;
import com.worksap.salespusher.utils.PasswordHash;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/webjars/**").permitAll();

		http
		.formLogin().and()
		.authorizeRequests()
		.antMatchers("/index.html", "/templates/partials/_home.html", "/templates/partials/_login.html",
				"/templates/partials/_pagination.html","/templates/partials/_users.html","/templates/directives/sp-deal-form.html",
				"/templates/directives/sp-lead-column.html","/").permitAll().anyRequest()
		.authenticated().and()
		.addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class)
		.csrf().csrfTokenRepository(csrfTokenRepository());
	}
	private CsrfTokenRepository csrfTokenRepository() {
		HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
		repository.setHeaderName("X-XSRF-TOKEN");
		return repository;
	}
	
	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(new CurrentUserDetailsServiceImpl(userRepository)).passwordEncoder(new PasswordHash());
	}
}