package com.korit.dorandoran.dto.response.discussion;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.common.object.DiscussionList;
import com.korit.dorandoran.dto.response.ResponseCode;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.ResponseMessage;
import com.korit.dorandoran.repository.resultset.GetDiscussionResultSet;

import lombok.Getter;

@Getter
public class GetDiscussionListResponseDto extends ResponseDto {

    List<DiscussionList> discussionList;

    public GetDiscussionListResponseDto(List<GetDiscussionResultSet> resultSet) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.discussionList = DiscussionList.getList(resultSet);
    }

    public static ResponseEntity<GetDiscussionListResponseDto> success(
            List<GetDiscussionResultSet> resultSet) {
        GetDiscussionListResponseDto responseBody = new GetDiscussionListResponseDto(resultSet);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
