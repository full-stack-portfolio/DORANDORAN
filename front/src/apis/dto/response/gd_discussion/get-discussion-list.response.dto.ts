import DiscussionList from "../../../../types/discussionList.interface";
import ResponseDto from "../response.dto";


// interface: 토론방 리스트 response dto //
export default interface GetDiscussionListResponseDto extends ResponseDto{
    discussionList:DiscussionList[];
}