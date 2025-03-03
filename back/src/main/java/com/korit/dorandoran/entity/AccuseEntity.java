package com.korit.dorandoran.entity;

import com.korit.dorandoran.common.object.ReportType;
import com.korit.dorandoran.dto.request.accuse.PostAccuseRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "accuse")
@Entity(name = "accuse")
public class AccuseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer accuseId;

  @Enumerated(EnumType.STRING)
  private ReportType reportType; // 댓글, 게시글, 채팅 구분
  private String reportContents; // 신고 사유
  private String userId; // 신고한 사용자
  private String accuseUserId; // 신고 당한 사용자
  private Integer replyId; // 댓글 신고
  private Integer postId; // 일반 게시글 신고
  private String accuseDate; // 신고 당한 날짜

  public AccuseEntity(PostAccuseRequestDto dto) {
    this.reportType = dto.getReportType();
    this.reportContents = dto.getReportContents();
    this.userId = dto.getUserId();
    this.accuseUserId = dto.getAccuseUserId();
    this.replyId = dto.getReplyId();
    this.postId = dto.getPostId();
    this.accuseDate = dto.getAccuseDate();
  }
}
