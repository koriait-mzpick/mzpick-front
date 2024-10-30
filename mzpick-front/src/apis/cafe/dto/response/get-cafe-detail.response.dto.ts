import { ResponseDto } from "src/apis/dto/response";

export default interface GetCafeDetailResponseDto extends ResponseDto {
    travelCafeNumber: number;
    travelLocathion: string;
    userId: string;
    travelCafeTitle: string;
    travelCafeCategoryList: string[];
    travelCafePhotoList: string[];
    travelCafeHashtagList: string[];
    travelCafeLikeUserList: string[];
    travelCafeSaveUSerList: string[];
    travelCafeLikeCount: number;
    travelCafeSaveCount: number;
    travelCafeView: number;
    travelCafeDate: string;
}