// interface: 토론방리스트 타입 //
export default interface DiscussionList {
    roomId:number;
    nickName:string;
    profileImage:string;
    discussionType:string;
    discussionImage:string;
    createdRoom:string;
    roomTitle:string;
    agreeOpinion:string;
    oppositeOpinion:string;
    discussionEnd:string;
    updateStatus:boolean;
    commentCount:number;
    likeCount:number;
}