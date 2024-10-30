import { ResponseDto } from "src/apis/dto/response";


export default interface GetRestaurantCommentResponseDto extends ResponseDto {
    travelFoodCommentNumeber: number;
    travelFoodNumber: number;
    userId: string;
    travelFoodComment: string;
}