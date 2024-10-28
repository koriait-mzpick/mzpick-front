// interface: 여행 게시글 수정 Request Body Dto //
export default interface PatchTravelRequestDto {
    travelTitle: string;
    travelHashtagContentList: string[];
    travelLocation: string;
    travelPhotoList: string[];
    travelContent: string;
}