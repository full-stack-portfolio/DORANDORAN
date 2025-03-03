package com.korit.dorandoran.dto.request.mileage;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostMileageRequestDto {

    @NotNull
    @Min(1) 
    private Integer amount;

    @NotBlank
    private String accountNumber;

    @NotBlank
    private String bankName;

    // @NotBlank
    private String userId;
}
