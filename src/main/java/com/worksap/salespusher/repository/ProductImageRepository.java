package com.worksap.salespusher.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.ProductImageEntity;

public interface ProductImageRepository extends JpaRepository<ProductImageEntity,Long> {
	ProductImageEntity findById(long id);
}
