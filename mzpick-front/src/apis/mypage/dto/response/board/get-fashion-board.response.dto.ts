import { ResponseDto } from "src/apis/dto/response";
import { MyPageFashionBoard } from "src/types/mypage/fashion";

export default interface GetMyPageFashionBoardResponseDto extends ResponseDto{
    myPageBoardFashions : MyPageFashionBoard[];
}