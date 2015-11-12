package com.worksap.salespusher.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.ServiceDocumentEntity;

public interface ServiceDocumentRepository extends JpaRepository<ServiceDocumentEntity,Long>{
	ServiceDocumentEntity findById(long id);
	List<ServiceDocumentEntity> findByServiceId(long serviceId);
}
