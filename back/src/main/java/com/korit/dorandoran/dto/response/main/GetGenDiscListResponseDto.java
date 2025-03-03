package com.korit.dorandoran.dto.response.main;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.common.object.MainGenDisc;
import com.korit.dorandoran.dto.response.ResponseCode;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.ResponseMessage;
import com.korit.dorandoran.repository.resultset.GetMainGenDiscListResultSet;

import lombok.Getter;

@Getter
public class GetGenDiscListResponseDto extends ResponseDto{

    private List<MainGenDisc> mainGenDiscs;

    private GetGenDiscListResponseDto(List<GetMainGenDiscListResultSet> resultSet) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.mainGenDiscs = MainGenDisc.getList(resultSet);
    }

    public static ResponseEntity<GetGenDiscListResponseDto> success(
        List<GetMainGenDiscListResultSet> resultSet
    ){
        GetGenDiscListResponseDto responseBody = new GetGenDiscListResponseDto(resultSet);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
