package com.korit.dorandoran.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
import com.korit.dorandoran.dto.response.auth.SignInResponseDto;
import com.korit.dorandoran.dto.response.auth.GetSignInResponseDto;
import com.korit.dorandoran.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/id-check")
    public ResponseEntity<ResponseDto> idCheck(
            @RequestBody @Valid IdCheckRequestDto requestBody) {
        ResponseEntity<ResponseDto> response = authService.idCheck(requestBody);
        return response;
    }

    @PostMapping("/tel-auth")
    public ResponseEntity<ResponseDto> telAuth(
            @RequestBody @Valid TelAuthRequestDto requestBody) {
        ResponseEntity<ResponseDto> response = authService.telAuth(requestBody);
        return response;
    }

    @PostMapping("/tel-auth-check")
    public ResponseEntity<ResponseDto> telAuthCheck(
            @RequestBody @Valid TelAuthCheckRequestDto responseBody) {
        ResponseEntity<ResponseDto> response = authService.telAuthCheck(responseBody);
        return response;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<ResponseDto> signUp(
            @RequestBody @Valid SignUpRequestDto responseBody) {
        ResponseEntity<ResponseDto> response = authService.signUp(responseBody);
        return response;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDto> signIn(
            @RequestBody @Valid SignInRequestDto responseBody) {
        ResponseEntity<? super SignInResponseDto> response = authService.signIn(responseBody);
        return response;
    }

    @PostMapping("/find-id")
    public ResponseEntity<ResponseDto> findId(
            @RequestBody @Valid FindIdRequestDto responseBody) {
        ResponseEntity<ResponseDto> response = authService.findId(responseBody);
        return response;
    }

    @PostMapping("/find-id-check")
    public ResponseEntity<? super FindIdResultResponseDto> findIdCheck(
            @RequestBody @Valid TelAuthCheckRequestDto responseBody) {
        ResponseEntity<? super FindIdResultResponseDto> response = authService.findIdResult(responseBody);
        return response;
    }

    @PostMapping("/find-pw")
    public ResponseEntity<ResponseDto> findPw(
            @RequestBody @Valid FindPwRequestDto responseBody) {
        ResponseEntity<ResponseDto> response = authService.findPw(responseBody);
        return response;
    }

    @PatchMapping("/change-pw")
    public ResponseEntity<ResponseDto> changePw(
            @RequestBody @Valid ChangePwRequestDto responseBody) {
        ResponseEntity<ResponseDto> response = authService.changePw(responseBody);
        return response;
    }

    // 로그인 한 유저 정보 얻기
    @GetMapping("/sign-in")
    public ResponseEntity<? super GetSignInResponseDto> getSignIn(
            @AuthenticationPrincipal String userId) {
        ResponseEntity<? super GetSignInResponseDto> response = authService.getSignIn(userId);
        return response;
    }
}
