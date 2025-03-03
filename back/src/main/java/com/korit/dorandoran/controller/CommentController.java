package com.korit.dorandoran.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korit.dorandoran.dto.request.comment.PatchCommentRequestDto;
import com.korit.dorandoran.dto.request.comment.PostCommentRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.service.CommentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/comment")
@RequiredArgsConstructor
public class CommentController {

  private final CommentService commentService;

  @PostMapping("/{roomId}")
  public ResponseEntity<ResponseDto> postComment(
      @RequestBody @Valid PostCommentRequestDto requsetBody,
      @PathVariable("roomId") Integer roomId) {
    ResponseEntity<ResponseDto> responseBody = commentService.postComment(requsetBody, roomId);
    return responseBody;
  }

  @PatchMapping("/{roomId}/{commentId}")
  public ResponseEntity<ResponseDto> patchComment(
      @RequestBody @Valid PatchCommentRequestDto requestBody,
      @PathVariable("roomId") Integer roomId,
      @PathVariable("commentId") Integer commentId,
      @AuthenticationPrincipal String userId) {
    ResponseEntity<ResponseDto> responseBody = commentService.patchComment(requestBody, userId, roomId, commentId);
    return responseBody;
  }

  @PatchMapping("/delete/{roomId}/{commentId}")
  public ResponseEntity<ResponseDto> deleteComment(
      @PathVariable("roomId") Integer roomId,
      @PathVariable("commentId") Integer commentId,
      @AuthenticationPrincipal String userId) {
    ResponseEntity<ResponseDto> responseBody = commentService.deleteComment(userId, roomId, commentId);
    return responseBody;
  }
}
