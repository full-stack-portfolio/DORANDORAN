package com.korit.dorandoran.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korit.dorandoran.dto.request.postDiscussion.PostDiscussionWriteRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.discussion.GetDiscussionListResponseDto;
import com.korit.dorandoran.dto.response.discussion.GetSignInUserResponseDto;
import com.korit.dorandoran.dto.response.main.GetGenDiscListResponseDto;
import com.korit.dorandoran.dto.response.discussion.GetDiscussionResponseDto;
import com.korit.dorandoran.service.DiscussionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/v1/gen_disc")
@RequiredArgsConstructor
public class DiscussionController {
    
    private final DiscussionService discussionService;

    @PostMapping("/write")
    public ResponseEntity<ResponseDto> writeDiscussion (
        @RequestBody @Valid PostDiscussionWriteRequestDto requestBody
    ){
        ResponseEntity<ResponseDto> responseBody = discussionService.postDiscussionWite(requestBody);
        return responseBody;
    } 

    @GetMapping(value={"","/"})
    public ResponseEntity<? super GetDiscussionListResponseDto> getDiscussion(){
        ResponseEntity<? super GetDiscussionListResponseDto> responseBody = discussionService.getDiscussionList();
        return responseBody;
    }

    @GetMapping("/sign-in")
    public ResponseEntity<? super GetSignInUserResponseDto> getSignIn(
        @AuthenticationPrincipal String userId
    ) {
        ResponseEntity<? super GetSignInUserResponseDto> response = discussionService.getSignIn(userId);
        return response;
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<? super GetDiscussionResponseDto> getDiscussion(
        @PathVariable("roomId") Integer roomId
    ){
        ResponseEntity<? super GetDiscussionResponseDto> repsonseBody = discussionService.getDiscussion(roomId);
        return repsonseBody;
    }

    @GetMapping("/main")
    public ResponseEntity<? super GetGenDiscListResponseDto> getMainGenDiscList(){
        ResponseEntity<? super GetGenDiscListResponseDto> responseBody = discussionService.getMainGenDiscList();
        return responseBody;
    }
}
