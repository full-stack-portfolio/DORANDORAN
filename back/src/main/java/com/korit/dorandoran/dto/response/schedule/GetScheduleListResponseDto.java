package com.korit.dorandoran.dto.response.schedule;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.common.object.Schedule;
import com.korit.dorandoran.dto.response.ResponseCode;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.ResponseMessage;

import lombok.Getter;

@Getter
public class GetScheduleListResponseDto extends ResponseDto {

  private List<Schedule> schedules;

  public GetScheduleListResponseDto(List<Schedule> schedules) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.schedules = schedules;
  }

  public static ResponseEntity<GetScheduleListResponseDto> success(List<Schedule> schedules) {
    GetScheduleListResponseDto responseBody = new GetScheduleListResponseDto(schedules);
    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }
}
