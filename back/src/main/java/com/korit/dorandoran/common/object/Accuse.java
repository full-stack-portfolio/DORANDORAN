package com.korit.dorandoran.common.object;

import com.korit.dorandoran.entity.AccuseEntity;

import lombok.Getter;

@Getter
public class Accuse {

  private Integer accuseId;
  private ReportType reportType; // 댓글, 게시글, 채팅 구분
  private String reportContents; // 신고 사유
  private String userId; // 신고한 사용자
  private String accuseUserId; // 신고 당한 사용자
  private Integer replyId; // 댓글 신고
  private Integer postId; // 일반 게시글 신고
  private String accuseDate; // 신고 당한 날짜

  public Accuse(AccuseEntity accuseEntity) {
    this.accuseId = accuseEntity.getAccuseId();
    this.reportType = accuseEntity.getReportType();
    this.reportContents = accuseEntity.getReportContents();
    this.userId = accuseEntity.getUserId();
    this.accuseUserId = accuseEntity.getAccuseUserId();
    this.replyId = accuseEntity.getReplyId();
    this.postId = accuseEntity.getPostId();
    this.accuseDate = accuseEntity.getAccuseDate();
  }
}
