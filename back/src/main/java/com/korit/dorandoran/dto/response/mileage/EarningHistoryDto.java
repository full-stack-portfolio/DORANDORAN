package com.korit.dorandoran.dto.response.mileage;

import lombok.Getter;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class EarningHistoryDto {
    private LocalDateTime transactionDate;
    private String reason;
    private int amount;
}
