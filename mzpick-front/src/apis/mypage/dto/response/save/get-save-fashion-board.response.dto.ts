import { ResponseDto } from "src/apis/dto/response";
import myPageSaveFashions from "src/types/mypage/fashion/fashion-save.interface";
export default interface GetMyPageFashionSaveResponseDto extends ResponseDto{
    myPageSaveFashions : myPageSaveFashions[];
}