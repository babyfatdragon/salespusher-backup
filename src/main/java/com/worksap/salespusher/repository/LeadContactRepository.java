package com.worksap.salespusher.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.LeadContactEntity;

public interface LeadContactRepository extends JpaRepository<LeadContactEntity,Long>{
	LeadContactEntity findById(long id);
	List<LeadContactEntity> findByLeadId(long leadId);
}
