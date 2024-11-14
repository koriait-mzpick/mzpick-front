import { ResponseDto } from "src/apis/dto/response";
import MyPageSaveFashions from "src/types/mypage/fashion/fashion-save.interface";
import myPageSaveFashions from "src/types/mypage/fashion/fashion-save.interface";
export default interface GetMyPageFashionSaveResponseDto extends ResponseDto{
    myPageSaveFashions : MyPageSaveFashions[];
}