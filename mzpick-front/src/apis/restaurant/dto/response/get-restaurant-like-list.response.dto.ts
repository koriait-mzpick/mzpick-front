import { ResponseDto } from "src/apis/dto/response";

export default interface GetRestaurantLikeListResponseDto extends ResponseDto {
    userIdList: string[];
}