package com.worksap.salespusher.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.CustomerEntity;

public interface CustomerRepository extends JpaRepository<CustomerEntity,Long>{
	CustomerEntity findById(long id);
}
