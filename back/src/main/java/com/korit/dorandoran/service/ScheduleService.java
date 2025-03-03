package com.korit.dorandoran.service;

import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.dto.request.schedule.PostScheduleDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.schedule.GetScheduleListResponseDto;

public interface ScheduleService {

  ResponseEntity<ResponseDto> postSchedule(PostScheduleDto dto);

  ResponseEntity<? super GetScheduleListResponseDto> getScheduleList();
}
