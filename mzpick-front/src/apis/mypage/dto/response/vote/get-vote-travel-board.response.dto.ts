import { ResponseDto } from "src/apis/dto/response";
import { TravelVoteBoard } from "src/types/mypage/vote";

export default interface GetMyPageTravelVoteResponseDto extends ResponseDto{
    VoteTravles : TravelVoteBoard[];
}