package com.korit.dorandoran.controller.mileage;

import com.korit.dorandoran.dto.request.mileage.PostAdminMileageRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.mileage.MileageRequestDto;
import com.korit.dorandoran.entity.UserEntity;
import com.korit.dorandoran.service.mileage.AdminMileageService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/admin/mileage")
@RequiredArgsConstructor
public class AdminMileageController {

    private final AdminMileageService adminMileageService;

    @PostMapping("/give")
    public ResponseEntity<ResponseDto> giveMileage(
            @RequestBody @Valid PostAdminMileageRequestDto requestBody
    ) {
        return adminMileageService.giveMileage(requestBody);
    }
    
    @GetMapping("/refunds")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<MileageRequestDto>> getRefundRequests() {
        return adminMileageService.getRefundRequests();
    }

    // 환급 요청 승인/거절
    @PostMapping("/refund/{mileageId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseDto> updateRefundStatus(
            @PathVariable("mileageId") Integer mileageId,
            @RequestParam("status") String status) {

        // "승인" 또는 "거절"만 허용
        if (!status.equals("승인") && !status.equals("반려")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDto("IV", "잘못된 상태 값입니다."));
        }
        return adminMileageService.updateRefundStatus(mileageId, status);
    }

}
