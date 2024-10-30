import { ResponseDto } from "src/apis/dto/response";
import { Restaurant } from "src/types";

export default interface GetCafeListResponseDto extends ResponseDto {
    restaurant: Restaurant[];
}