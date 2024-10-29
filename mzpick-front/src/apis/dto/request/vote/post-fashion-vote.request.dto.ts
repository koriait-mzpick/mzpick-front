// interface: 여행 관련 투표 작성 Request Body Dto //
export default interface PostFashionVoteRequestDto {
    FashionVoteTitle: string;
    FashionVotePhoto1: string | null;
    FashionVotePhoto2: string | null;
    FashionVoteChoice1: string;
    FashionVoteChoice2: string;
}