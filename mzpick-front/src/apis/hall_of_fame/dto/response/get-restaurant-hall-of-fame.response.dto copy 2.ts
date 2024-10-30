import { ResponseDto } from "src/apis/dto/response";

export default interface GetRestaurantHallOfFameResponseDto extends ResponseDto {
    travelFoodNumber : number | string;
    getPhotoLink : string;
}