import { ResponseDto } from "src/apis/dto/response";
import {  } from "src/types/mypage/cafe";
import myPageSaveCafes from "src/types/mypage/cafe/cafe-save.interface";

export default interface GetMyPageCafeSaveResponseDto extends ResponseDto{
    myPageSaveCafes : myPageSaveCafes[];
}