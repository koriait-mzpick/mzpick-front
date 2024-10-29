import Travel from "../../../../types/travel/travel.interface";
import ResponseDto from "../response.dto";

export default interface GetTravelListResponseDto extends ResponseDto {
    travel :Travel[];
}