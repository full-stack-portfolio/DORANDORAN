package com.korit.dorandoran.entity.mileage;

import com.korit.dorandoran.dto.request.mileage.PostAdminMileageRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "admin_mileage")
public class AdminMileageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer adminMileageId;

    private String userId;
    private Integer amount;
    private String reason;
    private String customReason;
    private LocalDateTime givenDate = LocalDateTime.now();

    public AdminMileageEntity(PostAdminMileageRequestDto dto) {
        this.userId = dto.getUserId();
        this.amount = dto.getAmount();
        this.reason = dto.getReason();
        this.customReason = dto.getCustomReason();
    }
}
