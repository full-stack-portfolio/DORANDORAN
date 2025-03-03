package com.korit.dorandoran.dto.response.mileage;

import lombok.Getter;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class RefundHistoryDto {
    private LocalDateTime transactionDate;
    private int amount;
    private String status;
}
