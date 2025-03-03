package com.korit.dorandoran.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.korit.dorandoran.common.object.Schedule;
import com.korit.dorandoran.dto.request.schedule.PostScheduleDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.schedule.GetScheduleListResponseDto;
import com.korit.dorandoran.entity.ScheduleEntity;
import com.korit.dorandoran.repository.ScheduleRepository;
import com.korit.dorandoran.service.ScheduleService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImplement implements ScheduleService {

  private final ScheduleRepository scheduleRepository;

  // schedule 작성
  @Override
  public ResponseEntity<ResponseDto> postSchedule(PostScheduleDto dto) {

    try {

      ScheduleEntity scheduleEntity = new ScheduleEntity(dto);
      scheduleRepository.save(scheduleEntity);

    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
    return ResponseDto.success();
  }

  // schedule 리스트 들고오기
  @Override
  public ResponseEntity<? super GetScheduleListResponseDto> getScheduleList() {

    List<Schedule> schedules = new ArrayList<>();

    try {

      List<ScheduleEntity> scheduleEntities = scheduleRepository.findAllByOrderByScheduleDateAsc();
      for (ScheduleEntity scheduleEntity : scheduleEntities) {
        Schedule schedule = new Schedule(scheduleEntity);
        schedules.add(schedule);
      }

    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return GetScheduleListResponseDto.success(schedules);
  }

}
