import { ResponseDto } from "src/apis/dto/response";
import myPageVoteFashions from "src/types/mypage/vote/fashion-vote-board.interface";
export default interface GetMyPageFashionVoteResponseDto extends ResponseDto{
    myPageVoteFashions : myPageVoteFashions[];
}