import { ResponseDto } from "src/apis/dto/response";
import { MyPageStayLike } from "src/types/mypage/stay";

export default interface GetMyPageStayLikeResponseDto extends ResponseDto{
    myPageLikeStays : MyPageStayLike[];
}