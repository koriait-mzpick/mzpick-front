import { ResponseDto } from "src/apis/dto/response";
import { TravelVote } from "src/types";


export default interface GetTravelVoteListResponseDto extends ResponseDto{
    travelVotes : TravelVote[]
}