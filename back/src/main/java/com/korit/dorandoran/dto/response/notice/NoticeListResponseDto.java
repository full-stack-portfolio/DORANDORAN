package com.korit.dorandoran.dto.response.notice;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.korit.dorandoran.common.object.Notice;
import com.korit.dorandoran.dto.response.ResponseCode;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.ResponseMessage;
import com.korit.dorandoran.entity.NoticeEntity;

import lombok.Getter;

@Getter
public class NoticeListResponseDto extends ResponseDto{

    private List<Notice> notices;

    private NoticeListResponseDto(List<NoticeEntity> noticeEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.notices = Notice.getList(noticeEntities);
    }

    public static ResponseEntity<NoticeListResponseDto> success(List<NoticeEntity> noticeEntities) {
        NoticeListResponseDto responseBody = new NoticeListResponseDto(noticeEntities);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
