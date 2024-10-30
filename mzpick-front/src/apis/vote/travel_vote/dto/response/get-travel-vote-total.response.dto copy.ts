import { ResponseDto } from "src/apis/dto/response";

export default interface GetTravelVoteTotalResponseDto extends ResponseDto{
    choice : string ;
    count : number
}