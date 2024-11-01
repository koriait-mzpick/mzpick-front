import { ResponseDto } from "src/apis/dto/response";
import { Stay } from "src/types";

export default interface GetStayListResponseDto extends ResponseDto {
    travelStayList : Stay[];
}