// interface: 일반 토론 작성 request body dto//
export default interface PostDiscussionWirteRequestDto {
    userId:string;
    discussionType:string;
    roomTitle:string;
    roomDescription:string;
    discussionImage:string;
    agreeOpinion:string;
    oppositeOpinion:string;
    discussionEnd:string;
}