// interface: 여행지 외식 게시글 작성 Request Body Dto //
export default interface PostTravelFoodRequestDto {
    travelFoodTitle: string;
    travelFoodHashtagContentList:string[];
    travelLocation: string;
    travelFoodPhotoList: string[];
    travelFoodContent: string;
}