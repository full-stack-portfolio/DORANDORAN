import ResponseDto from "../response.dto";

// interface: 공지사항 상세 조회 request body dto //
export default interface GetNoticeDetailResponseDto extends ResponseDto{
    title: string;
    userId: string;
    noticeDate: string;
    contents: string;
    noticeId: number;
    preTitle: string;
    nextTitle: string;
}