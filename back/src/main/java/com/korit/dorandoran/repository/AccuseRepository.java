package com.korit.dorandoran.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.korit.dorandoran.common.object.ReportType;
import com.korit.dorandoran.entity.AccuseEntity;
import com.korit.dorandoran.repository.resultset.GetAccuseResultSet;

public interface AccuseRepository extends JpaRepository<AccuseEntity, Integer> {

  // 댓글 중복신고 확인 메서드
  boolean existsByUserIdAndReportTypeAndReplyId(String userId, ReportType reportType, Integer replyId);

  // 게시글 중복신고 확인 메서드
  boolean existsByUserIdAndReportTypeAndPostId(String userId, ReportType reportType, Integer postId);

  List<AccuseEntity> findAllByOrderByAccuseIdAsc();

  @Query(value = "SELECT a.accuse_id, a.accuse_user_id AS userId, " +
      "CASE WHEN a.report_type = 'POST' THEN d.room_description ELSE NULL END AS roomDescription, " +
      "CASE WHEN a.report_type = 'COMMENT' THEN c.contents ELSE NULL END AS contents " +
      "FROM accuse a " +
      "LEFT JOIN discussion_room d ON a.post_id = d.room_id " +
      "LEFT JOIN comments c ON a.reply_id = c.comment_id " +
      "LEFT JOIN user u ON a.accuse_user_id = u.user_id " +
      "WHERE a.accuse_id = :accuseId", nativeQuery = true)
  GetAccuseResultSet findAccuseDetail(@Param("accuseId") Integer accuseId);
}
