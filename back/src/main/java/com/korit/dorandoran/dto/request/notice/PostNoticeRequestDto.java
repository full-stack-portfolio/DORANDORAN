package com.korit.dorandoran.dto.request.notice;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostNoticeRequestDto {

    @NotNull
    private String title;

    @NotNull
    private String contents;
    
    @NotNull
    private String noticeDate;
    
    @NotNull
    private Boolean topStatus;
    
    @NotBlank
    private String userId;
}
