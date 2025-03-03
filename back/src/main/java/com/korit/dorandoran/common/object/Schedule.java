package com.korit.dorandoran.common.object;

import com.korit.dorandoran.entity.ScheduleEntity;

import lombok.Getter;

@Getter
public class Schedule {

  private Integer scheduleNumber;
  private String title;
  private String scheduleDate;
  private String link;
  private String description;

  public Schedule(ScheduleEntity scheduleEntity) {
    this.scheduleNumber = scheduleEntity.getScheduleNumber();
    this.title = scheduleEntity.getTitle();
    this.scheduleDate = scheduleEntity.getScheduleDate();
    this.link = scheduleEntity.getLink();
    this.description = scheduleEntity.getDescription();
  }
}
