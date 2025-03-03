// package com.korit.dorandoran.service.implement.mileage;

// import java.util.ArrayList;
// import java.util.List;

// import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Service;

// import com.korit.dorandoran.dto.request.mileage.PostMileageRequestDto;
// import com.korit.dorandoran.dto.response.ResponseDto;
// import com.korit.dorandoran.dto.response.mileage.GetMileageResponseDto;
// import com.korit.dorandoran.dto.response.mileage.RefundHistoryDto;
// import com.korit.dorandoran.entity.mileage.MileageEntity;
// import com.korit.dorandoran.repository.mileage.MileageRepository;
// import com.korit.dorandoran.service.mileage.MileageService;

// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// public class MileageServiceImplement implements MileageService {

//     private final MileageRepository mileageRepository;

//     @Override
//     public ResponseEntity<ResponseDto> requestRefund(PostMileageRequestDto requestDto, String userId) {
//         try {
//             MileageEntity mileageEntity = new MileageEntity(requestDto, userId);
//             mileageRepository.save(mileageEntity);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseDto.databaseError();
//         }
//         return ResponseDto.success();
//     }

//     @Override
//     public ResponseEntity<GetMileageResponseDto> getMileageData(String userId) {
//         List<MileageEntity> mileageList = mileageRepository.findAllByUserId(userId);

//         int totalMileage = 0;
//         int totalRefundedMileage = 0;
//         List<RefundHistoryDto> refundHistory = new ArrayList<>();

//         for (MileageEntity mileage : mileageList) {
//             totalMileage += mileage.getTotalMileage();
//             totalRefundedMileage += mileage.getUsedMileage();
//             refundHistory.add(new RefundHistoryDto(mileage.getTransactionDate(), mileage.getAmount(), mileage.getStatus()));
//         }

//         return GetMileageResponseDto.success(totalMileage, totalRefundedMileage, totalRefundedMileage, refundHistory, null);
//     }

// }

// 2/13 에러 주석 처리 후 merge 진행합니다. (다음 회의일 이내 해결 예정)


package com.korit.dorandoran.service.implement.mileage;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.korit.dorandoran.dto.request.mileage.PostMileageRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.mileage.EarningHistoryDto;
import com.korit.dorandoran.dto.response.mileage.GetMileageResponseDto;
import com.korit.dorandoran.dto.response.mileage.RefundHistoryDto;
import com.korit.dorandoran.entity.mileage.AdminMileageEntity;
import com.korit.dorandoran.entity.mileage.MileageEntity;
import com.korit.dorandoran.repository.mileage.AdminMileageRepository;
import com.korit.dorandoran.repository.mileage.MileageRepository;
import com.korit.dorandoran.service.mileage.MileageService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MileageServiceImplement implements MileageService {

    private final MileageRepository mileageRepository;
    private final AdminMileageRepository adminMileageRepository;

    @Override
    public ResponseEntity<ResponseDto> requestRefund(PostMileageRequestDto requestDto, String userId) {
        try {
            MileageEntity mileageEntity = new MileageEntity(requestDto, userId);
            mileageRepository.save(mileageEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<GetMileageResponseDto> getMileageData(String userId) {
        List<MileageEntity> mileageList = mileageRepository.findAllByUserId(userId);
        List<AdminMileageEntity> earningList = adminMileageRepository.findAllByUserId(userId);
    
        Integer totalReceivedMileage = adminMileageRepository.getTotalReceivedMileageByUserId(userId);
        if (totalReceivedMileage == null)
            totalReceivedMileage = 0;
    
        Integer totalRefundedMileage = mileageRepository.getTotalRequestedMileageByUserIdAndStatus(userId, "승인");
        if (totalRefundedMileage == null)
            totalRefundedMileage = 0;
    
        Integer pendingRefundMileage = mileageRepository.getTotalRequestedMileageByUserIdAndStatus(userId, "승인 대기");
        if (pendingRefundMileage == null)
            pendingRefundMileage = 0;
    
        int availableMileage = totalReceivedMileage - totalRefundedMileage - pendingRefundMileage;
    
        List<RefundHistoryDto> refundHistory = new ArrayList<>();
        for (MileageEntity mileage : mileageList) {
            refundHistory
                    .add(new RefundHistoryDto(mileage.getTransactionDate(), mileage.getAmount(), mileage.getStatus()));
        }
    
        List<EarningHistoryDto> earningHistory = new ArrayList<>();
        for (AdminMileageEntity earning : earningList) {
            earningHistory.add(new EarningHistoryDto(earning.getGivenDate(), earning.getReason(), earning.getAmount()));
        }
    
        return GetMileageResponseDto.success(
                totalReceivedMileage,
                totalRefundedMileage,
                availableMileage,
                refundHistory,
                earningHistory
        );
    }
    

}
