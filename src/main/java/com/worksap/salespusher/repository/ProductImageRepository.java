package com.worksap.salespusher.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.ProductImageEntity;

public interface ProductImageRepository extends JpaRepository<ProductImageEntity,Long> {
	ProductImageEntity findById(long id);
	List<ProductImageEntity> findByProductId(long productId);
}
