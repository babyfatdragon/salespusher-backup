package com.worksap.salespusher.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.LeadEntity;

public interface LeadRepository extends JpaRepository<LeadEntity,Long>{
	LeadEntity findById(long id);
}
