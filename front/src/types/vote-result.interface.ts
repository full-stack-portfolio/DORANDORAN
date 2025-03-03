// interface: 토론방 투표 결과 리스트 타입 정의 //
export default interface VoteResult{
    roomId:number;
    userId:string;
    voteChoice:string;
    createdAt:string;
}