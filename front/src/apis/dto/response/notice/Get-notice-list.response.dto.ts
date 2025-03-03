import NoticeList from "../../../../types/notice.interface";
import ResponseDto from "../response.dto";


// interface: 공지사항 리스트 조회 request body dto //
export default interface GetNoticeListResponseDto extends ResponseDto{
    notices: NoticeList[];
}