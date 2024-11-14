import { ResponseDto } from "src/apis/dto/response";
import myPageSaveFoods from "src/types/mypage/restaurant/restaurant-save.interface";

export default interface GetMyPageRestaurantSaveResponseDto extends ResponseDto{
    myPageSaveFoods : myPageSaveFoods[];
}