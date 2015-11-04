package com.worksap.salespusher.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.CompanyEntity;

public interface CompanyRepository extends JpaRepository<CompanyEntity,Long> {
	CompanyEntity findById(long id);
}
