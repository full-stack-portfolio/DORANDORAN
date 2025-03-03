package com.korit.dorandoran.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.korit.dorandoran.entity.CommentsEntity;
import com.korit.dorandoran.repository.resultset.GetCommentsResultSet;

@Repository
public interface CommentsRepository extends JpaRepository<CommentsEntity, Integer>{

@Query(value = "SELECT " +
            "C.comment_id AS commentId,"+
            "C.room_id AS roomId," +
            "C.parent_id AS parentId,"+
            "U.user_id AS userId," +
            "U.nick_name AS nickName," +
            "U.profile_image AS profileImage,"+
            "C.contents AS contents," +
            "C.created_at AS createdAt," +
            "C.depth AS depth," +
            "C.update_status AS updateStatus,"+
            "C.delete_status AS deleteStatus,"+
            "C.discussion_type AS discussionType " +
            "FROM comments C " +
            "LEFT JOIN user U ON C.user_id = U.user_id " +
            "WHERE C.room_id = :roomId "+
            "ORDER BY c.parent_id ASC, c.created_at ASC "
            , nativeQuery = true)
    List<GetCommentsResultSet> getComments(@Param("roomId") Integer roomId);

    Optional<CommentsEntity> findByCommentId(Integer parentId);

    CommentsEntity findByCommentIdAndRoomId(Integer commentId, Integer roomId);
}
