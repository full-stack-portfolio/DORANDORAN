package com.korit.dorandoran.controller;

import com.korit.dorandoran.dto.request.bank.PostBankRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.service.BankService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mypage/account-management")
@RequiredArgsConstructor
public class BankController {

    private final BankService bankService;

    // ✅ 계좌 등록 (userId를 @AuthenticationPrincipal에서 가져옴)
    @PostMapping("/post")
    public ResponseEntity<ResponseDto> postAccount(
            @AuthenticationPrincipal String userId,
            @RequestBody PostBankRequestDto requestDto) {
        requestDto.setUserId(userId); // DTO에 userId 설정
        return bankService.postAccount(requestDto);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ResponseDto> deleteAccount(
            @AuthenticationPrincipal String userId,
            @RequestParam("accountNumber") String accountNumber) {
        return bankService.deleteAccount(userId, accountNumber);
    }

    @GetMapping("")
    public ResponseEntity<?> getUserAccounts(
            @AuthenticationPrincipal String userId) {
        if (userId == null) {
            System.out.println(" @AuthenticationPrincipal is NULL! Unauthorized access.");
            return ResponseEntity.status(401).body(List.of());
        }
        return bankService.getUserAccounts(userId);
    }


}
