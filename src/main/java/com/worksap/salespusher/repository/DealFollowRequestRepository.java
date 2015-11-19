package com.worksap.salespusher.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.DealFollowRequestEntity;

public interface DealFollowRequestRepository extends JpaRepository<DealFollowRequestEntity,Long>{
	DealFollowRequestEntity findById(long id);
	List<DealFollowRequestEntity> findByInviteeId(long inviteeId);
}
