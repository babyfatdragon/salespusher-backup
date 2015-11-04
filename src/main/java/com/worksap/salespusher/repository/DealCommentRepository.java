package com.worksap.salespusher.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.DealCommentEntity;

public interface DealCommentRepository extends JpaRepository<DealCommentEntity,Long> {
	DealCommentEntity findById(long id);
}
