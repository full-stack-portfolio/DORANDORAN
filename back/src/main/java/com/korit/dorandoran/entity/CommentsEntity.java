package com.korit.dorandoran.entity;

import com.korit.dorandoran.common.util.TodayCreator;
import com.korit.dorandoran.dto.request.comment.PatchCommentRequestDto;
import com.korit.dorandoran.dto.request.comment.PostCommentRequestDto;

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
@Table(name = "comments")
@Entity(name = "comments")
public class CommentsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;
    private Integer roomId;
    private String userId;
    private Integer parentId;
    private String contents;
    private String discussionType;
    private String createdAt;
    private Integer depth;
    private boolean updateStatus;
    private boolean deleteStatus;

    public CommentsEntity(PostCommentRequestDto dto, Integer roomId, Integer depth) {

        String commentTime = TodayCreator.todayCreator();

        this.roomId = roomId;
        this.userId = dto.getUserId();
        this.contents = dto.getContents();
        this.parentId = dto.getParentId();
        this.createdAt = commentTime;
        this.discussionType = dto.getDiscussionType();
        this.updateStatus = false;
        this.depth = depth;
    }

    public void patch(PatchCommentRequestDto dto) {
        this.contents = dto.getContents();
        this.updateStatus = true;
    }
}
