import Accuse from "../../../../types/accuseDetail.interface";
import ResponseDto from "../response.dto";

// interface: 신고 상세보기 response dto //
export default interface GetAccuseResponseDto extends ResponseDto {
  accuseResultSet: Accuse;
}