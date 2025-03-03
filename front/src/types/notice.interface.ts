// Notice 공지사항 리스트 타입 정의

export default interface NoticeList {
    noticeId: number;
    title: string;
    contents: string;
    noticeDate: string;
    topStatus: boolean;
}