package com.korit.dorandoran.dto.response.discussion;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.common.object.Comments;
import com.korit.dorandoran.dto.response.ResponseCode;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.ResponseMessage;
import com.korit.dorandoran.repository.resultset.GetCommentsResultSet;
import com.korit.dorandoran.repository.resultset.GetDetailDiscussionResultSet;

import lombok.Getter;

@Getter
public class GetDiscussionResponseDto extends ResponseDto {

    private GetDetailDiscussionResultSet discussionResultSet;
    private List<Comments> comments;

    public GetDiscussionResponseDto(GetDetailDiscussionResultSet discussionResultSet, List<GetCommentsResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        this.discussionResultSet = discussionResultSet;
        this.comments = Comments.getCommentList(resultSets);

    }

    public static ResponseEntity<GetDiscussionResponseDto> success(
            GetDetailDiscussionResultSet discussionResultSet,
            List<GetCommentsResultSet> resultSets) {
        GetDiscussionResponseDto responseBody = new GetDiscussionResponseDto(discussionResultSet, resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
