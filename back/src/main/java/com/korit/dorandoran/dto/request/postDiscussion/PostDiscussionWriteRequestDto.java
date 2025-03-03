package com.korit.dorandoran.dto.request.postDiscussion;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostDiscussionWriteRequestDto {

    @NotBlank
    private String userId;
    
    @NotNull
    private String discussionType;

    @NotNull
    private String roomTitle;

    @NotNull
    private String roomDescription;

    private String discussionImage;

    private String agreeOpinion;
    
    private String oppositeOpinion;
    
    @NotBlank
    private String discussionEnd;

}
