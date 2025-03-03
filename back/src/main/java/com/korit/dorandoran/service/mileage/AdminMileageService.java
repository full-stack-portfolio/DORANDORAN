package com.korit.dorandoran.service.mileage;

import org.springframework.http.ResponseEntity;
import com.korit.dorandoran.dto.request.mileage.PostAdminMileageRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.mileage.MileageRequestDto;

import java.util.List;

public interface AdminMileageService {
    ResponseEntity<ResponseDto> giveMileage(PostAdminMileageRequestDto requestDto);
    
    ResponseEntity<List<MileageRequestDto>> getRefundRequests();
    
    ResponseEntity<ResponseDto> updateRefundStatus(Integer mileageId, String status);
}
