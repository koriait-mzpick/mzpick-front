import { ResponseDto } from "src/apis/dto/response";
import { MyPageFashionSave } from "src/types/mypage/fashion";

export default interface GetMyPageFashionSaveResponseDto extends ResponseDto{
    myPageFashionSave : MyPageFashionSave[];
}