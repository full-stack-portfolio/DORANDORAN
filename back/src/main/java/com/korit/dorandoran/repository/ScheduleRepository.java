package com.korit.dorandoran.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.korit.dorandoran.entity.ScheduleEntity;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Integer> {

  ScheduleEntity findByScheduleNumber(Integer ScheduleNumber);

  List<ScheduleEntity> findAllByOrderByScheduleDateAsc();
}
