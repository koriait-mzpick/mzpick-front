import { ResponseDto } from "src/apis/dto/response";
import myPageBoardCafes from "src/types/mypage/cafe/cafe-board.interface";
export default interface GetMyPageCafeBoardResponseDto extends ResponseDto{
    myPageBoardCafes : myPageBoardCafes[];
}