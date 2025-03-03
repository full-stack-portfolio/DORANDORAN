package com.korit.dorandoran.service;

import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.dto.request.auth.ChangePwRequestDto;
import com.korit.dorandoran.dto.request.auth.FindIdRequestDto;
import com.korit.dorandoran.dto.request.auth.FindPwRequestDto;
import com.korit.dorandoran.dto.request.auth.IdCheckRequestDto;
import com.korit.dorandoran.dto.request.auth.SignInRequestDto;
import com.korit.dorandoran.dto.request.auth.SignUpRequestDto;
import com.korit.dorandoran.dto.request.auth.TelAuthCheckRequestDto;
import com.korit.dorandoran.dto.request.auth.TelAuthRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.auth.FindIdResultResponseDto;
import com.korit.dorandoran.dto.response.auth.GetSignInResponseDto;
import com.korit.dorandoran.dto.response.auth.SignInResponseDto;

public interface AuthService {
    ResponseEntity<ResponseDto> idCheck(IdCheckRequestDto dto);

    ResponseEntity<ResponseDto> telAuth(TelAuthRequestDto dto);

    ResponseEntity<ResponseDto> telAuthCheck(TelAuthCheckRequestDto dto);

    // 회원가입
    ResponseEntity<ResponseDto> signUp(SignUpRequestDto dto);

    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);

    // 아이디 찾기 - 이름 & 전화번호
    ResponseEntity<ResponseDto> findId(FindIdRequestDto dto);

    // 아이디 찾기 - 이름 & 전화번호 인증 후 아이디 반환
    ResponseEntity<? super FindIdResultResponseDto> findIdResult(TelAuthCheckRequestDto dto);

    // 비밀번호 찾기 - 아이디 & 전화번호
    ResponseEntity<ResponseDto> findPw(FindPwRequestDto dto);

    // 아이디 & 전화번호 인증을 통한 비밀번호 변경
    ResponseEntity<ResponseDto> changePw(ChangePwRequestDto dto);

    ResponseEntity<? super GetSignInResponseDto> getSignIn(String userId);
}
