export default interface PostAccuseRequestDto {
  reportType: string,
  reportContents: string,
  userId: string,
  accuseUserId: string,
  postId: number | null,
  replyId: number | null,
  accuseDate: string
}