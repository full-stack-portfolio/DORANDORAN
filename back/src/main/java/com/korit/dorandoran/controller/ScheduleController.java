package com.korit.dorandoran.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korit.dorandoran.dto.request.schedule.PostScheduleDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.schedule.GetScheduleListResponseDto;
import com.korit.dorandoran.service.ScheduleService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class ScheduleController {

  private final ScheduleService scheduleService;

  // 스케줄 작성 컨트롤러
  @PostMapping(value = { "/", "" })
  public ResponseEntity<ResponseDto> postSchedule(
      @RequestBody @Valid PostScheduleDto requestBody) {
    ResponseEntity<ResponseDto> response = scheduleService.postSchedule(requestBody);
    return response;
  }

  // 스케줄 리스트 불러오기 컨트롤러
  @GetMapping(value = { "/", "" })
  public ResponseEntity<? super GetScheduleListResponseDto> getScheduleList() {
    ResponseEntity<? super GetScheduleListResponseDto> response = scheduleService.getScheduleList();
    return response;
  }

}
