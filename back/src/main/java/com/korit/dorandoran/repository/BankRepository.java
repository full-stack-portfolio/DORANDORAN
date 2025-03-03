package com.korit.dorandoran.repository;

import com.korit.dorandoran.entity.BankEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankRepository extends JpaRepository<BankEntity, String> {
    List<BankEntity> findByUserId(String userId); 
    void deleteByUserIdAndAccountNumber(String userId, String accountNumber); 
}
