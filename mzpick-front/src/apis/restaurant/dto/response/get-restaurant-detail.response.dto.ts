import { ResponseDto } from "src/apis/dto/response";
import { RestaurantDetail } from "src/types";

export default interface GetRestaurantDetailResponseDto extends ResponseDto {
    travelFoodDetail : RestaurantDetail
}