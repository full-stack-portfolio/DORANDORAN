package com.korit.dorandoran.service;

import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.dto.request.mypage.myInfo.MypageChangePwRequestDto;
import com.korit.dorandoran.dto.request.mypage.myInfo.PatchProfileRequestDto;
import com.korit.dorandoran.dto.request.mypage.myInfo.PatchUserInfoRequestDto;
import com.korit.dorandoran.dto.request.mypage.myInfo.PwCheckRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.mypage.myInfo.GetUserInfoResponseDto;

public interface MypageService {
    
    ResponseEntity<ResponseDto> pwCheck(PwCheckRequestDto dto);

    ResponseEntity<ResponseDto> patchProfile(PatchProfileRequestDto dto, String userId);

    ResponseEntity<? super GetUserInfoResponseDto> getUserInfo(String userId);

    ResponseEntity<ResponseDto> changePw(MypageChangePwRequestDto dto, String userId);

    ResponseEntity<ResponseDto> patchUserInfo(PatchUserInfoRequestDto dto, String userId);

    ResponseEntity<ResponseDto> deleteUser(String userId);
}
