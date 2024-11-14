// interface: 여행 관련 투표 작성 Request Body Dto //
export default interface PostFashionVoteRequestDto {
    fashionVoteTitle: string;
    fashionVotePhoto1: string | null;
    fashionVotePhoto2: string | null;
    fashionVoteChoice1: string;
    fashionVoteChoice2: string;
}