import { ResponseDto } from "src/apis/dto/response";
import { MyPageRestaurantBoard } from "src/types/mypage/restaurant";

export default interface GetMyPageRestaurantBoardResponseDto extends ResponseDto{
    myPageBoardFoods : MyPageRestaurantBoard[];
}