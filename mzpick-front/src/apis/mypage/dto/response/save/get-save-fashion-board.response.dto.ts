import { ResponseDto } from "src/apis/dto/response";
import { MyPageSaveFashions } from "src/types/mypage/fashion";
export default interface GetMyPageFashionSaveResponseDto extends ResponseDto{
    myPageSaveFashions : MyPageSaveFashions[];
}