package com.korit.dorandoran.entity.mileage;

import java.time.LocalDateTime;

import com.korit.dorandoran.dto.request.mileage.PostMileageRequestDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "mileage")
public class MileageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mileage_id")
    private Integer mileageId;
    private String userId;
    private String accountNumber;
    private String bankName;
    private Integer amount;
    private String status;
    private LocalDateTime transactionDate;
    private Integer usedMileage; 
    private Integer totalMileage;

    public MileageEntity(PostMileageRequestDto dto, String userId) {
        this.userId = userId;
        this.accountNumber = dto.getAccountNumber();
        this.bankName = dto.getBankName();
        this.amount = dto.getAmount();
        this.status = "승인 대기";
        this.transactionDate = LocalDateTime.now();
        this.usedMileage = 0;
        this.totalMileage = 0;
    }
}
