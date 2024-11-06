import { ResponseDto } from "src/apis/dto/response";
import { TravelDetail } from "src/types";

export default interface GetTravelDetailResponseDto extends ResponseDto{
   travelDetail : TravelDetail[];
}