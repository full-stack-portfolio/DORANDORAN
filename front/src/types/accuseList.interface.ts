//# 신고 리스트 //

export default interface AccuseComponentProps {
  accuseId: number,
  reportType: string,
  reportContents: string,
  userId: string,
  accuseUserId: string, // 신고 당한 사용자
  replyId: string, // 댓글 신고
  postId: number, // 일반 게시글 신고
  accuseDate: string // 신고 당한 날짜
}