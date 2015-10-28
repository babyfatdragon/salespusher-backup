package com.worksap.salespusher.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.ProductDocumentEntity;

public interface ProductDocumentRepository extends JpaRepository<ProductDocumentEntity,Long>{
	ProductDocumentEntity findById(long id);
}
