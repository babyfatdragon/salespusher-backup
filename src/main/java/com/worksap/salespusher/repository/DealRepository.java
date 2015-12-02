package com.worksap.salespusher.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.DealEntity;

public interface DealRepository extends JpaRepository<DealEntity,Long>{
	DealEntity findById(long id);
	List<DealEntity> findByUserId(long userId);
	List<DealEntity> findByCompanyId(long companyId);
	List<DealEntity> findByCustomerId(long customerId);
	List<DealEntity> findByParentId(long parentId);
	List<DealEntity> findByDateClosedBetween(Date from,Date to);
	List<DealEntity> findByDateCreatedBetween(Date from,Date to);
	List<DealEntity> findByUserIdAndDateCreatedBetween(long userId,Date from,Date to);
	List<DealEntity> findByUserIdAndDateClosedBetween(long userId,Date from,Date to);
	List<DealEntity> findByUserIdAndDealStatusAndDateClosedBetween(long userId,String status, Date from,Date to);
	List<DealEntity> findByUserIdAndDealStatusAndDateCreatedBetween(long userId,String status, Date from,Date to);
}
