import { ResponseDto } from "src/apis/dto/response";
import { Travel } from "src/types";

export default interface GetTravelListResponseDto extends ResponseDto {
    travelList : Travel[];
}