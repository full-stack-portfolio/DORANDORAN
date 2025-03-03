package com.korit.dorandoran.service.implement;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.korit.dorandoran.dto.request.comment.PatchCommentRequestDto;
import com.korit.dorandoran.dto.request.comment.PostCommentRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.entity.CommentsEntity;
import com.korit.dorandoran.repository.CommentsRepository;
import com.korit.dorandoran.repository.DiscussionRoomRepository;

import com.korit.dorandoran.service.CommentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImplement implements CommentService {

  private final CommentsRepository commentsRepository;
  private final DiscussionRoomRepository discussionRoomRepository;

  @Override
  public ResponseEntity<ResponseDto> postComment(PostCommentRequestDto dto, Integer roomId) {

    try {
      // 1. 방이 존재하는지 확인
      boolean isRoomExists = discussionRoomRepository.existsByRoomId(roomId);
      if (!isRoomExists) {
        return ResponseDto.noExistRoom();
      }

      Integer depth = 0;
      Integer parentId = dto.getParentId();

      // 2. 부모 댓글이 있을 경우 depth 계산
      if (dto.getParentId() != null) {
        Optional<CommentsEntity> parentComment = commentsRepository.findByCommentId(parentId);
        if (parentComment.isEmpty()) {
          return ResponseDto.noExistParentComment();
        }
        depth = parentComment.get().getDepth() + 1;
      }

      // 3. 댓글 저장
      CommentsEntity commentEntity = new CommentsEntity(dto, roomId, depth);
      commentsRepository.save(commentEntity);

    } catch (Exception e) {
      // 예외 처리 개선: 더 구체적인 예외 메시지 로그
      e.printStackTrace();
      return ResponseDto.databaseError();
    }

    return ResponseDto.success();

  }

  @Override
  public ResponseEntity<ResponseDto> patchComment(PatchCommentRequestDto dto, String userId, Integer roomId,
      Integer commentId) {

    try {

      CommentsEntity commentsEntity = commentsRepository.findByCommentIdAndRoomId(commentId, roomId);
      if (commentsEntity == null)
        return ResponseDto.noExistComment();

      String commentUser = commentsEntity.getUserId();
      boolean isMatched = commentUser.equals(userId);
      if (!isMatched)
        return ResponseDto.noPermission();

      commentsEntity.patch(dto);
      commentsRepository.save(commentsEntity);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.databaseError();
    }
    return ResponseDto.success();
  }

  @Override
  public ResponseEntity<ResponseDto> deleteComment(String userId, Integer roomId, Integer commentId) {
    try {

      CommentsEntity commentsEntity = commentsRepository.findByCommentIdAndRoomId(commentId, roomId);
      if (commentsEntity == null)
        return ResponseDto.noExistComment();

      String commentUser = commentsEntity.getUserId();
      boolean isMatched = commentUser.equals(userId);

      if (!isMatched)
        return ResponseDto.noPermission();

      boolean isDelete = commentsEntity.isDeleteStatus();
      commentsEntity.setDeleteStatus(!isDelete);
      commentsRepository.save(commentsEntity);

    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.databaseError();
    }
    return ResponseDto.success();
  }

}
