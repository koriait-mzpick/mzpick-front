import { ResponseDto } from "src/apis/dto/response";
import { MyPageTravelBoard } from "src/types/mypage/travel";

export default interface GetMyPageTravelBoardResponseDto extends ResponseDto{
    myPageBoardTravels : MyPageTravelBoard[];
}