package com.korit.dorandoran.common.object;

import java.util.ArrayList;
import java.util.List;

import com.korit.dorandoran.repository.resultset.GetMyDiscussionResultSet;

import lombok.Getter;

@Getter
public class MyDiscussion {
    private Integer roomId;
    private String discussionImage;
    private String roomTitle;
    private Boolean updateStatus;
    private Integer commentCount;
    private Integer likeCount;
    private String createdRoom;
    private String roomDescription;

    public MyDiscussion(GetMyDiscussionResultSet resultSet) {
        this.roomId = resultSet.getRoomId();
        this.discussionImage = resultSet.getDiscussionImage();
        this.createdRoom = resultSet.getCreatedRoom();
        this.roomTitle = resultSet.getRoomTitle();
        this.updateStatus = resultSet.getUpdateStatus() != null && resultSet.getUpdateStatus() == 0 ? false : true;
        this.commentCount = resultSet.getCommentCount() == null ? 0 : resultSet.getCommentCount();
        this.likeCount = resultSet.getLikeCount() == null ? 0 : resultSet.getLikeCount();
        this.roomDescription = resultSet.getRoomDescription();
    }

    public static List<MyDiscussion> getList(List<GetMyDiscussionResultSet> resultSets) {
        List<MyDiscussion> myDiscussions = new ArrayList<>();
        for(GetMyDiscussionResultSet getDiscussionResultSet : resultSets){
            MyDiscussion discussionList = new MyDiscussion(getDiscussionResultSet);
            myDiscussions.add(discussionList);
        }
        return myDiscussions;
    }
}
