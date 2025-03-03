package com.korit.dorandoran.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.korit.dorandoran.dto.request.notice.PostNoticeRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.notice.GetNoticeDetailResponseDto;
import com.korit.dorandoran.dto.response.notice.NoticeListResponseDto;
import com.korit.dorandoran.entity.NoticeEntity;
import com.korit.dorandoran.entity.UserEntity;
import com.korit.dorandoran.repository.NoticeRepository;
import com.korit.dorandoran.repository.UserRepository;
import com.korit.dorandoran.service.NoticeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeServiceImplement implements NoticeService{

    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;
    
    // 공지사항 작성
    public ResponseEntity<ResponseDto> postNotice(PostNoticeRequestDto dto) {

        String userId = dto.getUserId();
        try {
            UserEntity userEntity = userRepository.findByUserId(userId);
            if(userEntity == null) return ResponseDto.noExistUserId();

            NoticeEntity noticeEntity = new NoticeEntity(dto);
            noticeRepository.save(noticeEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }

    // 공지사항 리스트 불러오기
    public ResponseEntity<? super NoticeListResponseDto> getNoticeList() {
        List<NoticeEntity> noticeEntities = new ArrayList<>();
        try {
            noticeEntities = noticeRepository.findByOrderByNoticeIdDesc();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return NoticeListResponseDto.success(noticeEntities);
    }

    // 공지사항 세부 내용 불러오기
    public ResponseEntity<? super GetNoticeDetailResponseDto> getNoticeDetail(Integer noticeId) {
        NoticeEntity noticeEntity = null;
        NoticeEntity entity = null;
        String preTitle;
        String nextTitle;
        
        try {
            noticeEntity = noticeRepository.findByNoticeId(noticeId);
            if(noticeEntity == null) return ResponseDto.noExistNoticeId();

            entity = noticeRepository.findByNoticeId((noticeId + 1));
            if(entity == null) nextTitle = "존재하지 않습니다.";
            else nextTitle = entity.getTitle();

            entity = noticeRepository.findByNoticeId((noticeId - 1));
            if(entity == null) preTitle = "존재하지 않습니다.";
            else preTitle = entity.getTitle();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetNoticeDetailResponseDto.success(noticeEntity, preTitle, nextTitle);
    }

    @Override
    public ResponseEntity<ResponseDto> deleteNotice(Integer noticeId) {
        NoticeEntity noticeEntity = null;
        try {
            noticeEntity = noticeRepository.findByNoticeId(noticeId);
            if(noticeEntity == null) return ResponseDto.noExistNoticeId();

            noticeRepository.delete(noticeEntity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }
}
