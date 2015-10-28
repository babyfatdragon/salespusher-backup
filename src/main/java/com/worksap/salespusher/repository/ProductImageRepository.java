package com.worksap.salespusher.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.ProductImageEntity;

public interface ProductImageRepository extends JpaRepository<ProductImageEntity,Long> {
	List<ProductImageEntity> findById(int id);
}
