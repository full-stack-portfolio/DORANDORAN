package com.korit.dorandoran.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.korit.dorandoran.entity.TelAuthEntity;

@Repository
public interface TelAuthRepository extends JpaRepository<TelAuthEntity, String>{
    boolean existsByTelNumberAndTelAuthNumber(String telNumber, String telAuthNumber);
}
