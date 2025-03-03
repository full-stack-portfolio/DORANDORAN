package com.korit.dorandoran.repository.mileage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.korit.dorandoran.entity.mileage.AdminMileageEntity;

public interface AdminMileageRepository extends JpaRepository<AdminMileageEntity, Integer> {

    @Query("SELECT SUM(a.amount) FROM AdminMileageEntity a WHERE a.userId = :userId")
    Integer getTotalReceivedMileageByUserId(@Param("userId") String userId);

    @Query("SELECT a FROM AdminMileageEntity a WHERE a.userId = :userId ORDER BY a.givenDate DESC")
    List<AdminMileageEntity> findAllByUserId(@Param("userId") String userId);

}
