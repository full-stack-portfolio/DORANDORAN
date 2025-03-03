package com.korit.dorandoran.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korit.dorandoran.dto.request.notice.PostNoticeRequestDto;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.notice.GetNoticeDetailResponseDto;
import com.korit.dorandoran.dto.response.notice.NoticeListResponseDto;
import com.korit.dorandoran.service.NoticeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {
    
    private final NoticeService noticeService;

    @PostMapping("/post")
    public ResponseEntity<ResponseDto> postNotice(
        @RequestBody @Valid PostNoticeRequestDto requestBody
    ) {
        ResponseEntity<ResponseDto> response = noticeService.postNotice(requestBody);
        return response;
    }

    @GetMapping(value={"", "/"})
    public ResponseEntity<? super NoticeListResponseDto> getNoticeList() {
        ResponseEntity<? super NoticeListResponseDto> response = noticeService.getNoticeList();
        return response;
    }

    @GetMapping(value={"/{noticeId}"})
    public ResponseEntity<? super GetNoticeDetailResponseDto> getNoticeDetail(
        @PathVariable("noticeId") Integer noticeId
    ) {
        ResponseEntity<? super GetNoticeDetailResponseDto> response = noticeService.getNoticeDetail(noticeId);
        return response;
    }

    // 공지사항 삭제
	@DeleteMapping("/delete/{noticeId}")
	public ResponseEntity<ResponseDto> deleteNotice(
		@PathVariable("noticeId") Integer noticeId
	) {
		ResponseEntity<ResponseDto> response = noticeService.deleteNotice(noticeId);
		return response;
	};
}
