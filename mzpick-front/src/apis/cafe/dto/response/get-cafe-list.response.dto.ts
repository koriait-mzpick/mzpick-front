
import { ResponseDto } from "src/apis/dto/response";
import { Cafe } from "src/types";

export default interface GetCafeListResponseDto extends ResponseDto {
    cafe : Cafe[];
}