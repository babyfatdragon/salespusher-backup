package com.worksap.salespusher.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.DealDocumentEntity;

public interface DealDocumentRepository extends JpaRepository<DealDocumentEntity,Long>{
	DealDocumentEntity findById(long id);
	List<DealDocumentEntity> findByDealId(long dealId);
}
