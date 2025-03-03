package com.korit.dorandoran.repository.resultset;

public interface GetCommentsResultSet {
    
    Integer getCommentId();
    Integer getRoomId();
    Integer getParentId();
    String getUserId();
    String getNickName();
    String getProfileImage();
    String getContents();
    String getCreatedAt();
    String getDiscussionType();
    Integer getDepth();
    Integer getUpdateStatus();
    Integer getDeleteStatus();
}
