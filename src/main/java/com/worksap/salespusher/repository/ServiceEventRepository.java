package com.worksap.salespusher.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.ServiceEventEntity;

public interface ServiceEventRepository extends JpaRepository<ServiceEventEntity,Long>{
	ServiceEventEntity findById(long id);
	List<ServiceEventEntity> findByDealId(long dealId);
	List<ServiceEventEntity> findByUserId(long userId);
	List<ServiceEventEntity> findByEndBetween(Date from,Date to);
}
