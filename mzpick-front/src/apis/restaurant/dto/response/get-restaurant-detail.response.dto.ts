import { ResponseDto } from "src/apis/dto/response";

export default interface GetRestaurantDetailResponseDto extends ResponseDto {
    travelFoodNumber: number;
    travelLocathion: string;
    userId: string;
    travelFoodTitle: string;
    travelFoodCategoryList: string[];
    travelFoodPhotoList: string[];
    travelFoodHashtagList: string[];
    travelFoodLikeUserList: string[];
    travelFoodSaveUSerList: string[];
    travelFoodLikeCount: number;
    travelFoodSaveCount: number;
    travelFoodView: number;
    travelFoodDate: string;
}