import { Travel } from "src/types";
import ResponseDto from "../response.dto";

export default interface GetTravelListResponseDto extends ResponseDto {
    travel : Travel[];
}