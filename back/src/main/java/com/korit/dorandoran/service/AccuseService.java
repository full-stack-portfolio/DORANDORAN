package com.korit.dorandoran.service;

import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.dto.request.accuse.PostAccuseRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.accuse.GetAccuseDetailResponseDto;
import com.korit.dorandoran.dto.response.accuse.GetAccuseListResponseDto;

public interface AccuseService {

  ResponseEntity<ResponseDto> postAccuse(PostAccuseRequestDto dto);

  ResponseEntity<? super GetAccuseListResponseDto> getAccuseList(String userId);

  ResponseEntity<? super GetAccuseDetailResponseDto> getAccuseDetail(Integer accuseId);
}
