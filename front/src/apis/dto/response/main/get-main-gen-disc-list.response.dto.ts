
import Discussion from "../../../../types/main-gen-disc.interface";
import ResponseDto from "../response.dto";

export default interface GetMainGenDiscListResponseDto extends ResponseDto{
    mainGenDiscs:Discussion[];
}