package com.korit.dorandoran.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.dto.response.ResponseCode;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.ResponseMessage;

import lombok.Getter;

@Getter
public class FindIdResultResponseDto extends ResponseDto{
    private String userId;

    private FindIdResultResponseDto(String userId) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.userId = userId;
    }

    public static ResponseEntity<FindIdResultResponseDto> success(String userId) {
        FindIdResultResponseDto responseBody = new FindIdResultResponseDto(userId);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
