package com.korit.dorandoran.entity;

import com.korit.dorandoran.common.util.TodayCreator;
import com.korit.dorandoran.dto.request.postDiscussion.PostDiscussionWriteRequestDto;

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
@Entity(name = "discussionRoom")
@Table(name = "discussion_room")

public class DiscussionRoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;

    private String userId;
    private String createdRoom;
    private String discussionType;
    private String roomTitle;
    private String roomDescription;
    private String discussionImage;

    public DiscussionRoomEntity(PostDiscussionWriteRequestDto dto) {
        String createdRoom = TodayCreator.todayCreator();

        this.userId = dto.getUserId();
        this.createdRoom = createdRoom;
        this.roomTitle = dto.getRoomTitle();
        this.discussionType = dto.getDiscussionType();
        this.roomDescription = dto.getRoomDescription();
        this.discussionImage = dto.getDiscussionImage();
    }
}
