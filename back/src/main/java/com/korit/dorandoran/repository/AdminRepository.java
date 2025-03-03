package com.korit.dorandoran.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.korit.dorandoran.entity.AdminEntity;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, String>{
    
    // 회원가입 시, 이름&전화번호&생일이 관리자 테이블에 존재하는지 검사를 통해
    // 권한을 부여
    boolean existsByNameAndTelNumberAndBirth(String name, String telNumber, String birth);
}
