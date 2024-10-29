// interface: 여행지 외식 게시글 수정 Request Body Dto //
export default interface PatchTravelFoodRequestDto {
    travelFoodTitle: string;
    travelFoodHashtagContentList: string[];
    travelLocation: string;
    travelFoodPhotoList: string[];
    travelFoodContent: string;
}