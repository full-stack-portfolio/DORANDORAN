package com.korit.dorandoran.common.object;

import java.util.ArrayList;
import java.util.List;

import com.korit.dorandoran.entity.NoticeEntity;

import lombok.Getter;

@Getter
public class Notice {
    private Integer noticeId;
    private String title;
    private String noticeDate;
    private String contents;
    private Boolean topStatus;

    private Notice(NoticeEntity noticeEntity) {
        this.noticeId = noticeEntity.getNoticeId();
        this.title = noticeEntity.getTitle();
        this.contents = noticeEntity.getContents();
        this.noticeDate = noticeEntity.getNoticeDate();
        this.topStatus = noticeEntity.getTopStatus();
    }

    public static List<Notice> getList(List<NoticeEntity> noticeEntities) {
        List<Notice> notices = new ArrayList<>();
        for (NoticeEntity noticeEntity : noticeEntities) {
            Notice notice = new Notice(noticeEntity);
            notices.add(notice);
        }
        return notices;
    }
}
