package com.worksap.salespusher.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.DealEntity;

public interface DealRepository extends JpaRepository<DealEntity,Long>{
	DealEntity findById(long id);
}
