// interface: 여행지 숙박 게시글 작성 Request Body Dto //
export default interface PostTravelStayRequestDto {
    travelStayTitle: string;
    travelStayHashtagContentList:string[];
    travelLocation: string;
    travelStayPhotoList: string[];
    travelStayCategoryList: string[];
    travelStayContent: string;
}