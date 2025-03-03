import CommentInfo from "../../../../types/comment-info.interface copy";
import PostInfo from "../../../../types/post-info.interface";
import VoteInfo from "../../../../types/voteInfo.interface";
import ResponseDto from "../response.dto";

// interface: get sign in response body dto //
export default interface GetSignInResponseDto extends ResponseDto{
    userId: string;
    profileImage: string | null;
    name: string;
    telNumber: string;
    nickName: string;
    role: boolean;
    mileage: string | null;
    statusMessage : string | null;
    isVoted:VoteInfo[];
    isLikePost:PostInfo[];
    isLikeComment:CommentInfo[];
}