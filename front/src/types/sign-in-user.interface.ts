import CommentInfo from "./comment-info.interface copy";
import PostInfo from "./post-info.interface";
import VoteInfo from "./voteInfo.interface";

export default interface SignInUser {
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