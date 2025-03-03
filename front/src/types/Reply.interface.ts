// interface: 대댓글 리스트 타입 정의 //
export default interface Reply {
    replyId:number;
    commentId:number;
    nickName:string;
    replyContents:string;
    replyTime:string;
    discussionType:string;
    roomId:string;
}