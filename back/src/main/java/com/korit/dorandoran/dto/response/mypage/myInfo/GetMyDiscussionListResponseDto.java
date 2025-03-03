package com.korit.dorandoran.dto.response.mypage.myInfo;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.common.object.MyDiscussion;
import com.korit.dorandoran.dto.response.ResponseCode;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.ResponseMessage;
import com.korit.dorandoran.repository.resultset.GetMyDiscussionResultSet;

import lombok.Getter;

@Getter
public class GetMyDiscussionListResponseDto extends ResponseDto{
    List<MyDiscussion> myDiscussions;

    public GetMyDiscussionListResponseDto(List<GetMyDiscussionResultSet> resultSet) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.myDiscussions = MyDiscussion.getList(resultSet);
    }

    public static ResponseEntity<GetMyDiscussionListResponseDto> success(
            List<GetMyDiscussionResultSet> resultSet) {
                GetMyDiscussionListResponseDto responseBody = new GetMyDiscussionListResponseDto(resultSet);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
