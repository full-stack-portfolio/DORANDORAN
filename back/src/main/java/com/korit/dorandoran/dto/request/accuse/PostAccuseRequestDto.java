package com.korit.dorandoran.dto.request.accuse;

import com.korit.dorandoran.common.object.ReportType;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostAccuseRequestDto {

  @NotNull
  private ReportType reportType; // 댓글, 게시글, 채팅 구분

  @NotNull
  private String reportContents; // 신고 사유

  @NotNull
  private String userId; // 신고한 사용자

  @NotNull
  private String accuseUserId; // 신고 당한 사용자

  @Nullable
  private Integer replyId; // 댓글 신고

  @Nullable
  private Integer postId; // 일반 게시글 신고

  @NotNull
  private String accuseDate; // 신고 당한 날짜
}
