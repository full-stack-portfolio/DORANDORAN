package com.korit.dorandoran.service;

import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.dto.request.notice.PostNoticeRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.notice.GetNoticeDetailResponseDto;
import com.korit.dorandoran.dto.response.notice.NoticeListResponseDto;

public interface NoticeService {
    ResponseEntity<ResponseDto> postNotice(PostNoticeRequestDto dto);

    ResponseEntity<? super NoticeListResponseDto> getNoticeList();

    ResponseEntity<? super GetNoticeDetailResponseDto> getNoticeDetail(Integer noticeId);

    ResponseEntity<ResponseDto> deleteNotice(Integer noticeId);
}
