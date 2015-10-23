package com.worksap.salespusher.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.CategoryOneEntity;

public interface CategoryOneRepository extends JpaRepository<CategoryOneEntity,Long> {
	CategoryOneEntity findById(long id);
}
