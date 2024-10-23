// interface: 여행지 숙박 게시글 수정 Request Body Dto //
export default interface PatchTravelStayRequestDto {
    travelStayTitle: string;
    travelStayHashtagContentList:string[];
    travelStayLocation: string;
    travelStayPhotoList: string[];
    travelStayCategoryList: string[];
    travelStayContent: string;
}