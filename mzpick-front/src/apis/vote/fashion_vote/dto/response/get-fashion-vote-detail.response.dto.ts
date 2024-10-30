import { ResponseDto } from "src/apis/dto/response";

export default interface GetFashionVoteDetailResponseDto extends ResponseDto{
    fashionVoteNumber: number;
    userId: string;
    fashionVoteTitle: string;
    fashionVotePhoto1: string;
    fashionVotePhoto2: string;
    fashionVoteChoice1: string;
    fashionVoteChoice2: string;
    fashionVoteChoiceUserList: string[];
    fashionVoteChoiceContentList: string[];
    fashionVoteDate: string;
}