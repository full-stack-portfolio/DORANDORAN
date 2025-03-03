// interface: 토론방 상세보기 타입 정의 //
// 유저아이디, 토론방 내용 // 
export default interface Discussion {
    roomId:number;
    userId:string;
    nickName:string;
    profileImage:string;
    discussionType:string;
    discussionImage:string;
    createdRoom:string;
    roomTitle:string;
    roomDescription:string;
    agreeOpinion:string;
    oppositeOpinion:string;
    discussionEnd:string;
    updateStatus:boolean;
    commentCount:number;
    likeCount:number;
}