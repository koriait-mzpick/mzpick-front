import { ResponseDto } from "src/apis/dto/response";
import myPageLikeCafes from "src/types/mypage/cafe/cafe-like.interface";
export default interface GetMyPageCafeLikeResponseDto extends ResponseDto{
    myPageLikeCafes : myPageLikeCafes [];
}