package com.korit.dorandoran.controller.mileage;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korit.dorandoran.dto.request.mileage.PostMileageRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.service.mileage.MileageService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/mypage/mileage")
@RequiredArgsConstructor
public class MileageController {

    private final MileageService mileageService;

    @PostMapping("/request")
    public ResponseEntity<ResponseDto> requestRefund(
            @RequestBody @Valid PostMileageRequestDto requestBody,
            @AuthenticationPrincipal String userId) {
                requestBody.setUserId(userId);
        ResponseEntity<ResponseDto> response = mileageService.requestRefund(requestBody, userId);


        return response;
    }

    @GetMapping("")
    public ResponseEntity<?> getMileageData(@AuthenticationPrincipal String userId) {
        return mileageService.getMileageData(userId);
    }

}
