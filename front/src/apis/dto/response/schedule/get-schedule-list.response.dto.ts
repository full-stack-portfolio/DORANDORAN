import ScheduleComponentProps from "../../../../types/schedule.interface";
import ResponseDto from "../response.dto";


export default interface GetScheduleListResponseDto extends ResponseDto {
  schedules: ScheduleComponentProps[];
}