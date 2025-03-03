package com.korit.dorandoran.dto.request.mileage;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostAdminMileageRequestDto {

    @NotBlank
    private String userId;

    @NotNull
    @Min(1)
    private Integer amount;

    @NotBlank
    private String reason;

    private String customReason;
}
