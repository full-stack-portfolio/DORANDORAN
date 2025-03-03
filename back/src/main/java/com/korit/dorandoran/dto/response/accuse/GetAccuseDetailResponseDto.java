package com.korit.dorandoran.dto.response.accuse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.dto.response.ResponseCode;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.ResponseMessage;
import com.korit.dorandoran.repository.resultset.GetAccuseResultSet;

import lombok.Getter;

@Getter
public class GetAccuseDetailResponseDto extends ResponseDto {

  private final GetAccuseResultSet getAccuseResultSet;

  public GetAccuseDetailResponseDto(GetAccuseResultSet getAccuseResultSet) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.getAccuseResultSet = getAccuseResultSet;
  }

  public static ResponseEntity<GetAccuseDetailResponseDto> success(
      GetAccuseResultSet getAccuseResultSet) {
    GetAccuseDetailResponseDto responseBody = new GetAccuseDetailResponseDto(getAccuseResultSet);
    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }

}
