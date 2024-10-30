// interface: 여행 관련 투표 작성 Request Body Dto //
export default interface PostTravelVoteRequestDto {
    travelVoteTitle: string;
    travelVotePhoto1: string | null;
    travelVotePhoto2: string | null;
    travelVoteChoice1: string;
    travelVoteChoice2: string;
}