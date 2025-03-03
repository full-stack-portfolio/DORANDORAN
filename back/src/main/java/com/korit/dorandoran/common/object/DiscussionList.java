package com.korit.dorandoran.common.object;

import java.util.ArrayList;
import java.util.List;

import com.korit.dorandoran.repository.resultset.GetDiscussionResultSet;

import lombok.Getter;

@Getter
public class DiscussionList {

    private Integer roomId;
    private String nickName;
    private String profileImage;
    private String discussionType;
    private String discussionImage;
    private String createdRoom;
    private String roomTitle;
    private String agreeOpinion;
    private String oppositeOpinion;
    private String discussionEnd;
    private Boolean updateStatus;
    private Integer commentCount;
    private Integer likeCount;
    
    public DiscussionList(GetDiscussionResultSet resultSet){
        this.roomId = resultSet.getRoomId();
        this.nickName = resultSet.getNickName();
        this.profileImage = resultSet.getProfileImage();
        this.discussionType = resultSet.getDiscussionType();
        this.discussionImage = resultSet.getDiscussionImage();
        this.createdRoom = resultSet.getCreatedRoom();
        this.roomTitle = resultSet.getRoomTitle();
        this.agreeOpinion = resultSet.getAgreeOpinion();
        this.oppositeOpinion = resultSet.getOppositeOpinion();
        this.discussionEnd = resultSet.getDiscussionEnd();
        this.updateStatus = resultSet.getUpdateStatus() != null && resultSet.getUpdateStatus() == 0 ? false : true;
        this.commentCount = resultSet.getCommentCount() == null ? 0 : resultSet.getCommentCount();
        this.likeCount = resultSet.getLikeCount() == null ? 0 : resultSet.getLikeCount();
    }

    public static List<DiscussionList> getList(List<GetDiscussionResultSet> resultSets) {
        List<DiscussionList> discussionLists = new ArrayList<>();
        for(GetDiscussionResultSet getDiscussionResultSet : resultSets){
            DiscussionList discussionList = new DiscussionList(getDiscussionResultSet);
            discussionLists.add(discussionList);
        }
        return discussionLists;
    }
}
