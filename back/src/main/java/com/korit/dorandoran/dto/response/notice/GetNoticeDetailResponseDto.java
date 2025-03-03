package com.korit.dorandoran.dto.response.notice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.korit.dorandoran.dto.response.ResponseCode;
import com.korit.dorandoran.dto.response.ResponseDto;
import com.korit.dorandoran.dto.response.ResponseMessage;
import com.korit.dorandoran.entity.NoticeEntity;

import lombok.Getter;

@Getter
public class GetNoticeDetailResponseDto extends ResponseDto{

    private Integer noticeId;
    private String userId;
    private String title;
    private String contents;
    private String noticeDate;
    private String preTitle;
    private String nextTitle;

    private GetNoticeDetailResponseDto(NoticeEntity noticeEntity, String preTitle, String nextTitle) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.noticeId = noticeEntity.getNoticeId();
        this.userId = noticeEntity.getUserId();
        this.title = noticeEntity.getTitle();
        this.contents = noticeEntity.getContents();
        this.noticeDate = noticeEntity.getNoticeDate();
        this.preTitle = preTitle;
        this.nextTitle = nextTitle;
    }

    public static ResponseEntity<GetNoticeDetailResponseDto> success(
        NoticeEntity noticeEntity,
        String preTitle,
        String nextTitle
    ) {
        GetNoticeDetailResponseDto responseBody = new GetNoticeDetailResponseDto(noticeEntity, preTitle, nextTitle);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
