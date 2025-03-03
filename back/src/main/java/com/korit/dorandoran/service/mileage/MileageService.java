package com.korit.dorandoran.service.mileage;

import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.dto.request.mileage.PostMileageRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;

public interface MileageService {

    ResponseEntity<?> getMileageData(String userId);
    ResponseEntity<ResponseDto> requestRefund(PostMileageRequestDto requestDto, String userId);
}
