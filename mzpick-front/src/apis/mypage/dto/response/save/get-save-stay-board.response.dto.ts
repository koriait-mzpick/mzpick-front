import { ResponseDto } from "src/apis/dto/response";
import myPageSaveStays from "src/types/mypage/stay/stay-save.interface";
export default interface GetMyPageStaySaveResponseDto extends ResponseDto{
    myPageSaveStays : myPageSaveStays[];
}