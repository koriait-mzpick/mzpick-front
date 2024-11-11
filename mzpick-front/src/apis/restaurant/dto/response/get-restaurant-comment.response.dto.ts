import { ResponseDto } from "src/apis/dto/response";
import { RestaurantComment } from "src/types/restaurant/restaurantComment.interface";


export default interface GetRestaurantCommentResponseDto extends ResponseDto {
    travelFoodComments: RestaurantComment[];
}