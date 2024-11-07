import { ResponseDto } from "src/apis/dto/response";
import { MyPageCafeSave } from "src/types/mypage/cafe";

export default interface GetMyPageCafeSaveResponseDto extends ResponseDto{
    myPageSaveCafes : MyPageCafeSave[];
}