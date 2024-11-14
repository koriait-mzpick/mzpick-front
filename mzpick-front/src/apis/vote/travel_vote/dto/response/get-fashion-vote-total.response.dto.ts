import { ResponseDto } from "src/apis/dto/response";
import { TravelVoteTotal } from "src/types";
import FashionVoteTotal from "src/types/vote/fashion-vote-total.interface";

export default interface GetFashionVoteTotalResponseDto extends ResponseDto{
    voteResults : FashionVoteTotal[]
}