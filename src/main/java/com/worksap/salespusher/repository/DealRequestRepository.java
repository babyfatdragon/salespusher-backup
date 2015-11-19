package com.worksap.salespusher.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.DealRequestEntity;

public interface DealRequestRepository extends JpaRepository<DealRequestEntity,Long>{
	DealRequestEntity findById(long id);
	List<DealRequestEntity> findByDealId(long id);
	List<DealRequestEntity> findByRequesteeId(long requesteeId);
}
