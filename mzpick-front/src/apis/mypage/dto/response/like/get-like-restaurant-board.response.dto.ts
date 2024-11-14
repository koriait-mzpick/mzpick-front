import { ResponseDto } from "src/apis/dto/response";
import { MyPageRestaurantLike } from "src/types/mypage/restaurant";

export default interface GetMyPageRestaurantLikeResponseDto extends ResponseDto{
    myPageLikeFoods : MyPageRestaurantLike[];
}