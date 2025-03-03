package com.korit.dorandoran.dto.response.mileage;

import com.korit.dorandoran.entity.mileage.MileageEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MileageRequestDto {
    private Integer mileageId;
    private String userId;
    private String accountNumber;
    private String bankName;
    private Integer amount;
    private String status;
    private LocalDateTime transactionDate;

    public static MileageRequestDto fromEntity(MileageEntity entity) {
        return new MileageRequestDto(
            entity.getMileageId(),
            entity.getUserId(),
            entity.getAccountNumber(),
            entity.getBankName(),
            entity.getAmount(),
            entity.getStatus(),
            entity.getTransactionDate()
        );
    }
}

// 수정 예정 파일입니당..