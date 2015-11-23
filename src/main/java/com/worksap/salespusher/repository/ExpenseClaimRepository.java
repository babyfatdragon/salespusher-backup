package com.worksap.salespusher.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.ExpenseClaimEntity;

public interface ExpenseClaimRepository extends JpaRepository<ExpenseClaimEntity,Long>{
	ExpenseClaimEntity findById(long id);
	List<ExpenseClaimEntity> findByDealId(long dealId);
	List<ExpenseClaimEntity> findByUserId(long userId);
	List<ExpenseClaimEntity> findByUserIdAndDateIncurredBetween(long userId,Date fromDate,Date toDate);
}
