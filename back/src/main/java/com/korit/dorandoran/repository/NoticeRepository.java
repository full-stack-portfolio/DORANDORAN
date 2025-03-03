package com.korit.dorandoran.repository;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.korit.dorandoran.entity.NoticeEntity;

@Repository
public interface NoticeRepository extends JpaRepository<NoticeEntity, Integer> {
    List<NoticeEntity> findByOrderByNoticeIdDesc();

    NoticeEntity findByNoticeId(Integer noticeId);
}
