import MyDiscussion from "../../../../../types/my-discussion.interface";
import ResponseDto from "../../response.dto";

// interface: 마이페이지 내가 작성한 게시글 body dto //
export default interface GetMyDiscussionListResposneDto extends ResponseDto{
    myDiscussions: MyDiscussion[];
}