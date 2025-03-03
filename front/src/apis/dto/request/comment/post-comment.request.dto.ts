// interface: post comment request dto //
export default interface PostCommentRequestDto {

    userId:string;
    contents:string;
    discussionType:string;
    parentId?:number
    
}