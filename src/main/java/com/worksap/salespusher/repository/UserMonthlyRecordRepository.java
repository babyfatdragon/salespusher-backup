package com.worksap.salespusher.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.UserMonthlyRecordEntity;

public interface UserMonthlyRecordRepository extends JpaRepository<UserMonthlyRecordEntity,Long>{
	UserMonthlyRecordEntity findById(long id);
	List<UserMonthlyRecordEntity> findByUserId(long userId);
}
