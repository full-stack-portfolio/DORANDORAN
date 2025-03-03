package com.korit.dorandoran.entity;

import com.korit.dorandoran.dto.request.schedule.PostScheduleDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "schedule")
public class ScheduleEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer scheduleNumber;
  private String title;
  private String scheduleDate;
  private String link;
  private String description;

  // 일정 등록 생성 역할
  public ScheduleEntity(PostScheduleDto dto) {
    this.title = dto.getTitle();
    this.scheduleDate = dto.getScheduleDate();
    this.link = dto.getLink();
    this.description = dto.getDescription();
  }
}
