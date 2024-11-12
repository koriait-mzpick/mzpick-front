// interface: 여행지 카페 게시글 수정 Request Body Dto //
export default interface PatchTravelCafeRequestDto {
    travelCafeTitle: string;
    travelCafeHashtagContentList:string[];
    travelLocation: string;
    travelCafePhotoList: string[];
    travelCafeCategoryList: string[];
    travelCafeContent: string;
}