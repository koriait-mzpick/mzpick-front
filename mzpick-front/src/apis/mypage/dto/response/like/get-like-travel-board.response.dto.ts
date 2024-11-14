import { ResponseDto } from "src/apis/dto/response";
import { MyPageTravelLike } from "src/types/mypage/travel";

export default interface GetMyPageTravelLikeResponseDto extends ResponseDto{
    myPageLikeTravels : MyPageTravelLike[];
}