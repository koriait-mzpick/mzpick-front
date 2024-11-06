import { ResponseDto } from "src/apis/dto/response";
import { CafeDetail } from "src/types";

export default interface GetCafeDetailResponseDto extends ResponseDto {
    travelCafeDetail : CafeDetail
}