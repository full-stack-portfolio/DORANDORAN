package com.korit.dorandoran.repository.mileage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.korit.dorandoran.entity.mileage.MileageEntity;
import java.util.List;

public interface MileageRepository extends JpaRepository<MileageEntity, Integer> {
    
    List<MileageEntity> findAllByStatusOrderByTransactionDateAsc(String status);

    List<MileageEntity> findAllByUserId(String userId);

    List<MileageEntity> findAllByOrderByTransactionDateAsc();

    @Query("SELECT SUM(m.amount) FROM MileageEntity m WHERE m.userId = :userId AND (m.status = '승인' OR m.status = '승인 대기')")
    Integer getTotalRequestedMileageByUserId(@Param("userId") String userId);

    @Query("SELECT SUM(m.amount) FROM MileageEntity m WHERE m.userId = :userId AND m.status = :status")
    Integer getTotalRequestedMileageByUserIdAndStatus(@Param("userId") String userId, @Param("status") String status);
}
