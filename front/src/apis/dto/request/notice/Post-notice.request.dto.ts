// interface: 공지사항 작성 request body dto //
export default interface PostNoticeRequestDto {
    title: string;
    contents: string;
    noticeDate: string;
    topStatus: boolean;
    userId: string;
}