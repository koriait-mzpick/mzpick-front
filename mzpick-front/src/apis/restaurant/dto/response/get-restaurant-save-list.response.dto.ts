import { ResponseDto } from "src/apis/dto/response";

export default interface GetRestaurantSaveListResponseDto extends ResponseDto {
    userIdList: string[];
}