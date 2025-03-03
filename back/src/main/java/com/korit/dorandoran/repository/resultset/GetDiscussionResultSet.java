package com.korit.dorandoran.repository.resultset;

public interface GetDiscussionResultSet {

    Integer getRoomId();

    String getUserId();

    String getNickName();

    String getProfileImage();

    String getDiscussionType();

    String getDiscussionImage();

    String getCreatedRoom();

    String getRoomTitle();

    String getAgreeOpinion();

    String getOppositeOpinion();

    String getDiscussionEnd();

    Integer getUpdateStatus();

    Integer getCommentCount();

    Integer getLikeCount();

    String getRoomDescription();

}
