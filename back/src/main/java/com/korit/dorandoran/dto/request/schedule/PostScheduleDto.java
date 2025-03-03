package com.korit.dorandoran.dto.request.schedule;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostScheduleDto {

  @NotBlank
  private String title;

  @NotBlank
  private String scheduleDate;

  @NotBlank
  private String link;

  @NotBlank
  private String description;
}
