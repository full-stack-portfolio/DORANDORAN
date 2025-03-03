import AccuseComponentProps from "../../../../types/accuseList.interface";
import ResponseDto from "../response.dto";

export default interface GetAccuseListResponseDto extends ResponseDto {
  accuses: AccuseComponentProps[];
}