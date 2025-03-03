
import Comment from "../../../../types/Comment.interface";
import Discussion from "../../../../types/Discussion.interface";
import ResponseDto from "../response.dto";

// interface: 토론방 상세보기 response dto //
export default interface GetDiscussionResponseDto extends ResponseDto {
    discussionResultSet:Discussion;
    comments:Comment[];
}