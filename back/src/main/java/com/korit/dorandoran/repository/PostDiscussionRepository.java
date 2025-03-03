package com.korit.dorandoran.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.korit.dorandoran.entity.PostDiscussionEntity;


@Repository
public interface PostDiscussionRepository extends JpaRepository<PostDiscussionEntity, Integer>{
    PostDiscussionEntity findByRoomId(Integer roomId);
}
