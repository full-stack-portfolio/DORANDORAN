package com.korit.dorandoran.entity;

import com.korit.dorandoran.dto.request.postDiscussion.PostDiscussionWriteRequestDto;

import jakarta.persistence.Entity;
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
@Entity(name = "postDiscussion")
@Table(name = "post_discussion")

public class PostDiscussionEntity {

    @Id
    private Integer roomId;
    private String discussionEnd;
    private String oppositeOpinion;
    private String agreeOpinion;

    public PostDiscussionEntity(PostDiscussionWriteRequestDto dto, Integer roomId) {
        this.roomId = roomId;
        this.discussionEnd = dto.getDiscussionEnd();
        this.oppositeOpinion = dto.getOppositeOpinion();
        this.agreeOpinion = dto.getAgreeOpinion();
    }
}
