// interface: 여행지 카페 게시글 작성 Request Body Dto //
export default interface PostTravelCafeRequestDto {
    travelCafeTitle: string;
    travelCafeHashtagContentList:string[];
    travelLocation: string;
    travelCafePhotoList: string[];
    travelCafeCategoryList: string[];
    travelCafeContent: string;
}