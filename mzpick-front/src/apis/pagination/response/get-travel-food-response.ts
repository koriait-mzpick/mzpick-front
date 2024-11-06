import { ResponseDto } from "src/apis/dto/response";

export default interface GetFoodTotalCountResponseDto extends ResponseDto {
    count: number;
}