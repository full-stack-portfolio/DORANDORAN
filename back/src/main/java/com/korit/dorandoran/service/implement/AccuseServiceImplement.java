package com.korit.dorandoran.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.korit.dorandoran.common.object.Accuse;
import com.korit.dorandoran.dto.request.accuse.PostAccuseRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.accuse.GetAccuseDetailResponseDto;
import com.korit.dorandoran.dto.response.accuse.GetAccuseListResponseDto;
import com.korit.dorandoran.entity.AccuseEntity;
import com.korit.dorandoran.entity.UserEntity;
import com.korit.dorandoran.repository.AccuseRepository;
import com.korit.dorandoran.repository.DiscussionRoomRepository;
import com.korit.dorandoran.repository.UserRepository;
import com.korit.dorandoran.repository.resultset.GetAccuseResultSet;
import com.korit.dorandoran.service.AccuseService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccuseServiceImplement implements AccuseService {

  private final AccuseRepository accuseRepository;
  private final DiscussionRoomRepository discussionRoomRepository;
  private final UserRepository userRepository;

  @Override
  public ResponseEntity<ResponseDto> postAccuse(PostAccuseRequestDto dto) {

    // 신고할 대상(replyId, postId)이 없는 경우 예외 처리
    if (dto.getReplyId() == null && dto.getPostId() == null) {
      return ResponseDto.noExistedTarget();
    }

    if (dto.getPostId() != null) {
      String postOwnerId = discussionRoomRepository.findUserIdByRoomId(dto.getPostId());
      if (postOwnerId != null && postOwnerId.equals(dto.getUserId())) {
        return ResponseDto.noSelfAccuse();
      }
    }

    // 댓글 또는 게시글 중복 신고 여부 확인
    boolean alreadyReported = false;
    if (dto.getReplyId() != null) {
      alreadyReported = accuseRepository.existsByUserIdAndReportTypeAndReplyId(
          dto.getUserId(), dto.getReportType(), dto.getReplyId());
    } else {
      alreadyReported = accuseRepository.existsByUserIdAndReportTypeAndPostId(
          dto.getUserId(), dto.getReportType(), dto.getPostId());
    }

    // 중복 신고일 경우 에러 응답 반환
    if (alreadyReported) {
      return ResponseDto.duplicatedAccuse();
    }

    // 신고 저장
    try {
      AccuseEntity accuseEntity = new AccuseEntity(dto);
      accuseRepository.save(accuseEntity);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseDto.databaseError();
    }

    return ResponseDto.success();
  }

  @Override
  public ResponseEntity<? super GetAccuseListResponseDto> getAccuseList(String userId) {

    UserEntity user = userRepository.findByUserId(userId);
    if (user == null) {
      return ResponseDto.databaseError();
    }
    if (user.getRole() != true) {
      return ResponseDto.noPermission();
    }

    List<Accuse> accuses = new ArrayList<>();

    try {

      List<AccuseEntity> accuseEntities = accuseRepository.findAllByOrderByAccuseIdAsc();
      for (AccuseEntity accuseEntity : accuseEntities) {
        Accuse accuse = new Accuse(accuseEntity);
        accuses.add(accuse);
      }

    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return GetAccuseListResponseDto.success(accuses);
  }

  @Override
  public ResponseEntity<? super GetAccuseDetailResponseDto> getAccuseDetail(Integer accuseId) {
    GetAccuseResultSet getAccuseResultSet;

    try {

      getAccuseResultSet = accuseRepository.findAccuseDetail(accuseId);

      if (getAccuseResultSet == null) {
        return ResponseDto.noHaveAccuse();
      }

    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return GetAccuseDetailResponseDto.success(getAccuseResultSet);
  }

}
