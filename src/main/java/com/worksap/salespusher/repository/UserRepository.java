package com.worksap.salespusher.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.worksap.salespusher.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);
}

