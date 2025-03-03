package com.korit.dorandoran.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korit.dorandoran.dto.request.mypage.myInfo.MypageChangePwRequestDto;
import com.korit.dorandoran.dto.request.mypage.myInfo.PatchProfileRequestDto;
import com.korit.dorandoran.dto.request.mypage.myInfo.PatchUserInfoRequestDto;
import com.korit.dorandoran.dto.request.mypage.myInfo.PwCheckRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.mypage.myInfo.GetMyDiscussionListResponseDto;
import com.korit.dorandoran.dto.response.mypage.myInfo.GetUserInfoResponseDto;
import com.korit.dorandoran.service.DiscussionService;
import com.korit.dorandoran.service.MypageService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mypage/user-info")
@RequiredArgsConstructor
public class MypageController {

    private final MypageService mypageService;
	private final DiscussionService discussionService;
    
    // 개인정보 수정 시 비밀번호 확인 후 개인정보 불러오기
	@PostMapping("/password-check")
	public ResponseEntity<ResponseDto> userUpdateCheck(
		@RequestBody @Valid PwCheckRequestDto reqeustBody,
		@AuthenticationPrincipal String userId
	) {
		ResponseEntity<ResponseDto> response = mypageService.pwCheck(reqeustBody);
		return response;
	}

	// 회원 개인 프로필 정보 수정
	@PatchMapping("/patch-profile")
	public ResponseEntity<ResponseDto> patchProfile(
			@RequestBody @Valid PatchProfileRequestDto requestBody,
			@AuthenticationPrincipal String userId) {
		ResponseEntity<ResponseDto> response = mypageService.patchProfile(requestBody, userId);
		return response;
	};

	// 회원 개인 정보 받기
	@GetMapping("/{userId}")
	public ResponseEntity<? super GetUserInfoResponseDto> getUserInfo(
		@PathVariable("userId") String userId
	) {
		ResponseEntity<? super GetUserInfoResponseDto> response = mypageService.getUserInfo(userId);
		return response;
	}

	// 마이페이지 - 비밀번호 수정
	@PatchMapping("/change-pw")
	public ResponseEntity<ResponseDto> changePw(
		@RequestBody @Valid MypageChangePwRequestDto requestBody,
		@AuthenticationPrincipal String userId
	) {
		ResponseEntity<ResponseDto> response = mypageService.changePw(requestBody, userId);
		return response;
	}

	// 개인 정보 수정
	@PatchMapping("/patch-user")
	public ResponseEntity<ResponseDto> patchUserInfo(
		@RequestBody @Valid PatchUserInfoRequestDto requestBody,
		@AuthenticationPrincipal String userId
	) {
		ResponseEntity<ResponseDto> response = mypageService.patchUserInfo(requestBody, userId);
		return response;
	}

	// 회원 탈퇴
	@DeleteMapping("/delete-user")
	public ResponseEntity<ResponseDto> deleteUser(
		@AuthenticationPrincipal String userId
	) {
		ResponseEntity<ResponseDto> response = mypageService.deleteUser(userId);
		return response;
	};

	// 본인이 작성한 일반 토론 리스트 불러오기
	@GetMapping("get-my-discussion")
	public ResponseEntity<? super GetMyDiscussionListResponseDto> getMyDiscussion (
		@AuthenticationPrincipal String userId
	) {
		ResponseEntity<? super GetMyDiscussionListResponseDto> response = discussionService.getMyDiscussionList(userId);
		return response;
	}

	// 본인이 작성한 일반 토론 게시글 삭제하기
	@DeleteMapping("/delete/{roomId}")
	public ResponseEntity<ResponseDto> deleteRoom(
		@PathVariable("roomId") Integer roomId
	) {
		ResponseEntity<ResponseDto> response = discussionService.deleteDiscusstion(roomId);
		return response;
	};
}
