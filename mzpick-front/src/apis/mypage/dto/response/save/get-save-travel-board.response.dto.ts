import { ResponseDto } from "src/apis/dto/response";
import myPageSaveTravel from "src/types/mypage/travel/travel-save.interface";
export default interface GetMyPageTravelSaveResponseDto extends ResponseDto{
    myPageSaveTravel : myPageSaveTravel[];
}