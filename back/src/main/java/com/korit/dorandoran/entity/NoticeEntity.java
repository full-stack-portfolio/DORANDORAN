package com.korit.dorandoran.entity;

import com.korit.dorandoran.dto.request.notice.PostNoticeRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="notice")
@Table(name="notice")
public class NoticeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer noticeId;

	private String title;
	private String contents;
	private String noticeDate;
	private Boolean topStatus;
	private String userId;

	public NoticeEntity(PostNoticeRequestDto dto) {
		this.title = dto.getTitle();
		this.contents = dto.getContents();
		this.noticeDate = dto.getNoticeDate();
		this.topStatus = dto.getTopStatus();
		this.userId = dto.getUserId();
	}
}
