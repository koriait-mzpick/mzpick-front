import { ResponseDto } from "src/apis/dto/response";
import { TravelVoteTotal } from "src/types";

export default interface GetTravelVoteTotalResponseDto extends ResponseDto{
    voteResults : TravelVoteTotal[]
}