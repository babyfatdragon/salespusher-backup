package com.worksap.salespusher.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.DealEventEntity;

public interface DealEventRepository extends JpaRepository<DealEventEntity,Long>{
	DealEventEntity findById(long id);
	List<DealEventEntity> findByDealId(long id);
}
