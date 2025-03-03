package com.korit.dorandoran.service;

import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.dto.request.comment.PatchCommentRequestDto;
import com.korit.dorandoran.dto.request.comment.PostCommentRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;

public interface CommentService {

  ResponseEntity<ResponseDto> postComment(PostCommentRequestDto dto, Integer roomId);

  ResponseEntity<ResponseDto> patchComment(PatchCommentRequestDto dto, String userId, Integer roomId,
      Integer commentId);

  ResponseEntity<ResponseDto> deleteComment(String userId, Integer roomId, Integer commentId);

  

}
