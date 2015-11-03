package com.worksap.salespusher.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.ProductVideoEntity;

public interface ProductVideoRepository extends JpaRepository<ProductVideoEntity,Long>{
	ProductVideoEntity findById(long id);
	List<ProductVideoEntity> findByProductId(long productId);
}
