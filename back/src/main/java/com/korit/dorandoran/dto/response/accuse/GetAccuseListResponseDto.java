package com.korit.dorandoran.dto.response.accuse;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.common.object.Accuse;
import com.korit.dorandoran.dto.response.ResponseCode;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.ResponseMessage;

import lombok.Getter;

@Getter
public class GetAccuseListResponseDto extends ResponseDto {

  private List<Accuse> accuses;

  public GetAccuseListResponseDto(List<Accuse> accuses) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.accuses = accuses;
  }

  public static ResponseEntity<GetAccuseListResponseDto> success(List<Accuse> accuses) {
    GetAccuseListResponseDto responseBody = new GetAccuseListResponseDto(accuses);
    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }
}
