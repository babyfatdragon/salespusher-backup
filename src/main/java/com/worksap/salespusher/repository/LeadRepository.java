package com.worksap.salespusher.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.LeadEntity;

public interface LeadRepository extends JpaRepository<LeadEntity,Long>{
	LeadEntity findById(long id);
	List<LeadEntity> findByUserId(long userId);
	List<LeadEntity> findByUserIdAndLeadStatus(long userId,String status);
	List<LeadEntity> findByLeadStatus(String status);
}
