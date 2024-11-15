import { ResponseDto } from "src/apis/dto/response";
import { MyPageStayBoard } from "src/types/mypage/stay";

export default interface GetMyPageStayBoardResponseDto extends ResponseDto{
    myPageBoardStays : MyPageStayBoard[];
}