// interface: 여행 게시글 작성 Request Body Dto //
export default interface PostTravelRequestDto {
    travelTitle: string;
    travelHashtagContentList: string[];
    travelLocation: string;
    travelPhotoList: string[];
    travelContent: string;
}