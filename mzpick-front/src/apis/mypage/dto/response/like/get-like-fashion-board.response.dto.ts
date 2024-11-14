import { ResponseDto } from "src/apis/dto/response";
import { MyPageFashionLike } from "src/types/mypage/fashion";

export default interface GetMyPageFashionLikeResponseDto extends ResponseDto{
    myPageLikeFashions : MyPageFashionLike[];
}