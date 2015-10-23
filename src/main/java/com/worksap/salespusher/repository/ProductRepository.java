package com.worksap.salespusher.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    ProductEntity findById(long id);
	List<ProductEntity> findBySecondCategory(int categoryTwoId);

}
