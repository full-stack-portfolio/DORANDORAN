
// interface: 댓글 리스트 타입 정의//
export default interface Comment {
    commentId:number;
    roomId:number;
    userId:string;
    nickName:string;
    profileImage:string;
    contents:string;
    createdAt:string;
    discussionType:string;
    likeCount:number;
    updateStatus:boolean;
    parentId:number;
    depth:number;
    deleteStatus:boolean;
    replies:Comment[];
}