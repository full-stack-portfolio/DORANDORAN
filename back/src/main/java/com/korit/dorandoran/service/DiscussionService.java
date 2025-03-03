package com.korit.dorandoran.service;

import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.dto.request.postDiscussion.PostDiscussionWriteRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.discussion.GetDiscussionListResponseDto;
import com.korit.dorandoran.dto.response.discussion.GetSignInUserResponseDto;
import com.korit.dorandoran.dto.response.main.GetGenDiscListResponseDto;
import com.korit.dorandoran.dto.response.mypage.myInfo.GetMyDiscussionListResponseDto;
import com.korit.dorandoran.dto.response.discussion.GetDiscussionResponseDto;


public interface DiscussionService {
    
    ResponseEntity<ResponseDto> postDiscussionWite(PostDiscussionWriteRequestDto dto);

    ResponseEntity<? super GetDiscussionListResponseDto> getDiscussionList();
    ResponseEntity<? super GetSignInUserResponseDto> getSignIn(String userId);

    ResponseEntity<? super GetDiscussionResponseDto> getDiscussion(Integer roomId);

    ResponseEntity<? super GetGenDiscListResponseDto> getMainGenDiscList();

    ResponseEntity<? super GetMyDiscussionListResponseDto> getMyDiscussionList(String userId);

    ResponseEntity<ResponseDto> deleteDiscusstion(Integer roomId);
}
