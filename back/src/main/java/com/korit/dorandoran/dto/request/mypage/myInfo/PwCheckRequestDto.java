package com.korit.dorandoran.dto.request.mypage.myInfo;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class PwCheckRequestDto {
    
    @NotBlank
    private String userId;

    @NotBlank
    private String password;
}
