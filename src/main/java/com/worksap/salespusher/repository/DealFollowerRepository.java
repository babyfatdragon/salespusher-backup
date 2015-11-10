package com.worksap.salespusher.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.DealFollowerEntity;

public interface DealFollowerRepository extends JpaRepository<DealFollowerEntity,Long>{
	DealFollowerEntity findById(long id);
	List<DealFollowerEntity> findByDealId(long dealId);
	List<DealFollowerEntity> findByUserId(long userId);
}
