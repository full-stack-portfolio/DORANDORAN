package com.korit.dorandoran.service.implement.mileage;

import com.korit.dorandoran.dto.request.mileage.PostAdminMileageRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.mileage.MileageRequestDto;
import com.korit.dorandoran.entity.mileage.AdminMileageEntity;
import com.korit.dorandoran.entity.mileage.MileageEntity;
import com.korit.dorandoran.entity.UserEntity;
import com.korit.dorandoran.repository.mileage.AdminMileageRepository;
import com.korit.dorandoran.repository.mileage.MileageRepository;
import com.korit.dorandoran.repository.UserRepository;
import com.korit.dorandoran.service.mileage.AdminMileageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminMileageServiceImplement implements AdminMileageService {

    private final AdminMileageRepository adminMileageRepository; // ✅ 마일리지 지급 관리
    private final MileageRepository mileageRepository; // ✅ 환급 신청 내역 조회
    private final UserRepository userRepository;

    // ✅ 관리자 마일리지 지급 (AdminMileageRepository 유지)
    @Override
    public ResponseEntity<ResponseDto> giveMileage(PostAdminMileageRequestDto requestDto) {
        try {
            UserEntity user = userRepository.findByUserId(requestDto.getUserId());

            if (user == null) {
                return ResponseEntity.badRequest().body(new ResponseDto("ER", "존재하지 않는 사용자 ID입니다."));
            }

            user.setMileage(user.getMileage() + requestDto.getAmount());
            userRepository.save(user);

            // 지급 내역 저장 (admin_mileage 테이블)
            adminMileageRepository.save(new AdminMileageEntity(requestDto));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    // ✅ 모든 환급 요청 조회 (승인 대기, 승인, 반려 포함)
    @Override
    public ResponseEntity<List<MileageRequestDto>> getRefundRequests() {
        List<MileageEntity> refundRequests = mileageRepository.findAllByOrderByTransactionDateAsc();

        List<MileageRequestDto> responseList = refundRequests.stream()
                .map(MileageRequestDto::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseList);
    }

    // ✅ 환급 요청 승인/반려 처리
    @Override
    public ResponseEntity<ResponseDto> updateRefundStatus(Integer mileageId, String status) {
        MileageEntity mileage = mileageRepository.findById(mileageId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 환급 신청입니다."));

        if (!mileage.getStatus().equals("승인 대기")) {
            return ResponseEntity.badRequest().body(new ResponseDto("ER", "이미 처리된 요청입니다."));
        }

        mileage.setStatus(status);
        mileageRepository.save(mileage);

        // ✅ 승인된 경우, 해당 유저의 마일리지 차감
        if (status.equals("승인")) {
            UserEntity user = userRepository.findByUserId(mileage.getUserId());
            if (user != null) {
                user.setMileage(user.getMileage() - mileage.getAmount());
                userRepository.save(user);
            }
        }

        return ResponseDto.success();
    }
}
