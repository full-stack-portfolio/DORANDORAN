import VoteResult from "../../../../types/vote-result.interface";
import ResponseDto from "../response.dto";

// interface: 투표 결과 불러오기 response dto //
export default interface GetVoteResultResponseDto extends ResponseDto {
    voteResult:VoteResult[]
}