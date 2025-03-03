package com.korit.dorandoran.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChangePwRequestDto {

    @NotBlank
    private String userId;
    
    @NotBlank
    private String password;

    @NotBlank
    private String telNumber;

    private String telAuthNumber;
}
