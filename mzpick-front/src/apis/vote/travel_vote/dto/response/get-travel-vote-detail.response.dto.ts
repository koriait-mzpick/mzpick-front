import { ResponseDto } from "src/apis/dto/response";

export default interface GetTravelVoteDetailResponseDto extends ResponseDto{
    travelVoteNumber: number;
    userId: string;
    travelVoteTitle: string;
    travelVotePhoto1: string;
    travelVotePhoto2: string;
    travelVoteChoice1: string;
    travelVoteChoice2: string;
    travelVoteChoiceUserList: string[];
    travelVoteChoiceContentList: string[];
    travelVoteDate: string;
}