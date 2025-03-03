package com.korit.dorandoran.dto.request.mypage.myInfo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PatchUserInfoRequestDto {
    
    @NotNull
    private String name;

    @NotNull
    private String birth;

    @NotBlank
    private String telNumber;
}
