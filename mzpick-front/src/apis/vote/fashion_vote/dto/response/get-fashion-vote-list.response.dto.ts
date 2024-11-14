import { ResponseDto } from "src/apis/dto/response";
import { FashionVote } from "src/types";

export default interface GetFashionVoteListResponseDto extends ResponseDto {
    fashionVotes : FashionVote[]
}