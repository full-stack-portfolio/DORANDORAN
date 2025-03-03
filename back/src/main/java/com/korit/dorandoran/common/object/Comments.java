package com.korit.dorandoran.common.object;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.korit.dorandoran.repository.resultset.GetCommentsResultSet;

import lombok.Getter;

@Getter
public class Comments {
    
    private Integer commentId;
    private Integer roomId;
    private Integer parentId;
    private String userId;
    private String nickName;
    private String profileImage;
    private String contents;
    private String createdAt;
    private String discussionType;  
    private Integer depth;
    private boolean updateStatus;
    private boolean deleteStatus;
    private List<Comments> replies;

    public Comments (GetCommentsResultSet commentResultSets){

        this.commentId = commentResultSets.getCommentId();
        this.roomId = commentResultSets.getRoomId();
        this.parentId = commentResultSets.getParentId();
        this.userId = commentResultSets.getUserId();
        this.nickName = commentResultSets.getNickName();
        this.profileImage = commentResultSets.getProfileImage();
        this.contents = commentResultSets.getContents();
        this.createdAt = commentResultSets.getCreatedAt();
        this.discussionType = commentResultSets.getDiscussionType();
        this.depth = commentResultSets.getDepth();
        this.updateStatus = commentResultSets.getUpdateStatus() == 0 ? false : true;
        this.deleteStatus = commentResultSets.getDeleteStatus() == 0 ? false : true;
        this.replies = new ArrayList<>();
    }
    public static List<Comments> getCommentList(List<GetCommentsResultSet> resultSets) {
        List<Comments> comments = new ArrayList<>();
    // 모든 댓글을 먼저 Comments 객체로 변환
        Map<Integer, Comments> commentMap = new HashMap<>();
    
    // 댓글 객체 생성 및 맵에 저장
        for (GetCommentsResultSet resultSet : resultSets) {
        Comments comment = new Comments(resultSet);
        commentMap.put(comment.getCommentId(), comment);
    }

    // 댓글들에서 부모-자식 관계 설정
        for (Comments comment : commentMap.values()) {
            if (comment.getParentId() != null && comment.getParentId() != 0) {
                // 부모 댓글을 찾아서 자식 댓글로 추가
                Comments parentComment = commentMap.get(comment.getParentId());
                if (parentComment != null) {
                    parentComment.getReplies().add(comment);
                }
            }
    }

    // 최상위 댓글만 반환 (부모가 없는 댓글들)
    for (Comments comment : commentMap.values()) {
        if (comment.getParentId() == null || comment.getParentId() == 0) {
            comments.add(comment);
        }
    }
    
    return comments;
}
}
