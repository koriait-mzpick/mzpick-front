import { ResponseDto } from "src/apis/dto/response";
import { StayDetail } from "src/types";

export default interface GetStayDetailResponseDto extends ResponseDto{
    travelStayDetail : StayDetail
}